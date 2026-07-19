import './scss/styles.scss';
import {CatalogModel} from './components/models/CatalogModel.ts';
import {cloneTemplate, ensureElement} from './utils/utils.ts';
import {AppApi} from './components/api/AppApi.ts';
import {Api} from './components/base/Api.ts';
import {API_URL, CDN_URL} from './utils/constants.ts';
import {EventEmitter} from './components/base/Events.ts';
import {BasketModel} from './components/models/BasketModel.ts';
import {CustomerModel} from './components/models/CustomerModel.ts';
import {ModalView} from './components/view/ModalView.ts';
import {BasketView} from './components/view/BasketView.ts';
import {CardPreview} from './components/view/cards/CardPreview.ts';
import {CatalogView} from './components/view/CatalogView.ts';
import {CatalogCard} from './components/view/cards/CatalogCard.ts';
import {HeaderView} from './components/view/HeaderView.ts';
import {ICustomer, IProduct} from './types';
import {BasketCard} from './components/view/cards/BasketCard.ts';
import {OrderView} from './components/view/forms/OrderView.ts';
import {ContactsView} from './components/view/forms/ContactsView.ts';
import {SuccessView} from './components/view/SuccessView.ts';

// События
const events = new EventEmitter()

// Темплеты
const basketContainerTemplate = cloneTemplate<HTMLElement>('#basket')
const orderTemplate = cloneTemplate<HTMLFormElement>('#order')
const contactsTemplate = cloneTemplate<HTMLFormElement>('#contacts')
const successTemplate = cloneTemplate<HTMLElement>('#success')
const previewTemplate = cloneTemplate<HTMLElement>('#card-preview')

// Элементы
const headerElement = ensureElement<HTMLElement>('.header')
const catalogElement = ensureElement<HTMLElement>('.gallery')
const modalElement = ensureElement<HTMLElement>('#modal-container')

// Модели
const catalogModel = new CatalogModel(events)
const basketModel = new BasketModel(events)
const customerModel = new CustomerModel(events)

// API
const api = new Api(API_URL);
const appApi = new AppApi(api)

// Представления
const catalogView = new CatalogView(catalogElement)
const headerView = new HeaderView(headerElement, events)
const modalView = new ModalView(modalElement, events)
const cardPreview = new CardPreview(previewTemplate, events)
const basketView = new BasketView(basketContainerTemplate, events)
const orderView = new OrderView(orderTemplate, events)
const contactsView = new ContactsView(contactsTemplate, events)
const successView = new SuccessView(successTemplate, events)

function resetAll() {
    customerModel.resetData()
    basketModel.clear()
}

async function fillCatalog(): Promise<void> {
    resetAll()
    try {
        const fetchedItems = await appApi.getProducts()
        catalogModel.setItems(fetchedItems.items)
    } catch (e) {
        console.log(e)
    }
}

events.on('catalog:changed', () => {
    const cards = catalogModel.getAllItems().map(item => {
        return new CatalogCard(cloneTemplate<HTMLElement>('#card-catalog'),
            () => events.emit<Pick<IProduct, 'id'>>('catalogCard:click', {id: item.id})).render({
            ...item,
            image: CDN_URL + item.image,
        })
    })
    catalogView.render({items: cards})
})
events.on('catalogCard:click', (res: Pick<IProduct, 'id'>) => {
    catalogModel.setSelectedItems(catalogModel.getItemById(res.id))
})
events.on('catalog:activeItemSet', () => {
    const card = catalogModel.getSelectedItem()
    if (card) {
        const isInBasket = basketModel.hasItem(card.id)
        const buttonIsDisabled = card.price === null
        const buttonText = buttonIsDisabled ? 'Недоступно' : (isInBasket
                                                              ? 'Удалить из корзины'
                                                              : 'Купить');
        modalView.render({
            content: cardPreview.render({
                ...card,
                buttonIsDisabled: buttonIsDisabled,
                buttonText: buttonText,
                image: CDN_URL + card.image,
            }),
        })
        modalView.showModal()
    }
})
events.on('basketBtn:click', () => {
    modalView.render({content: basketView.render()})
    modalView.showModal()
})
events.on('modal:close', () => {
    modalView.closeModal()
    catalogModel.setSelectedItems(null)
})
events.on('previewActionBtn:click', () => {
    const item = catalogModel.getSelectedItem()
    if (item) {
        basketModel.hasItem(item.id) ? basketModel.removeItem(item)
                                     : basketModel.addItem(item)
    }
    modalView.closeModal()
})
events.on('basket:update', () => {
    const cards = basketModel.getItems().map((item, index) => {
        return new BasketCard(cloneTemplate<HTMLElement>('#card-basket'), () => events.emit<Pick<IProduct, 'id'>>('basketDeleteBtn:click', {id: item.id})).render({
            ...item,
            index: index + 1,
        })
    })
    basketView.render({
        items: cards,
        totalPrice: basketModel.getTotalPrice(),
        buttonIsDisabled: !basketModel.getItemsLength(),
    })
    headerView.render({basketCounter: basketModel.getItemsLength()})
})
events.on('basketDeleteBtn:click', (res: Pick<IProduct, 'id'>) => {
    basketModel.removeItem(catalogModel.getItemById(res.id))
})
events.on('basketSuccessBtn:click', () => {
    modalView.render({content: orderView.render()})
})
events.on('form:input', (res: Partial<ICustomer>) => {
    if (res.payment !== undefined) customerModel.setPayment(res.payment === customerModel.getData().payment
                                                            ? null
                                                            : res.payment)
    if (res.address !== undefined) customerModel.setAddress(res.address)
    if (res.phone !== undefined) customerModel.setPhone(res.phone)
    if (res.email !== undefined) customerModel.setEmail(res.email)
})
events.on('customer:updated', () => {
    const errors = customerModel.validate()
    const orderMsg = ['address', 'payment']
        .map(field => errors[field])
        .find(error => error !== undefined) || ''
    orderView.render({
        payment: customerModel.getData().payment,
        error: orderMsg,
        buttonIsDisabled: !!orderMsg,
    })
    const contactsMsg = ['email', 'phone']
        .map(field => errors[field])
        .find(error => error !== undefined) || ''
    contactsView.render({
        error: contactsMsg,
        buttonIsDisabled: !!contactsMsg,
    })
})
events.on('orderForm:submit', () => {
    modalView.render({content: contactsView.render()})
})
events.on('contactsForm:submit', async () => {
    const order = {
        ...customerModel.getData(),
        items: basketModel.getItems().map(item => item.id),
        total: basketModel.getTotalPrice(),
    }
    contactsView.render({
        error: 'Данные отправляются на сервер',
        buttonIsDisabled: true,
    })
    try {
        const postOrderResponse = await appApi.postOrder(order)
        modalView.render({content: successView.render(postOrderResponse)})
        resetAll()
    } catch (e) {
        console.log(e)
    }
})
events.on('success:close', () => {
    modalView.closeModal()
})
events.on('customer:reset', () => {
    const customerData = customerModel.getData()
    contactsView.render({
        ...customerData,
        buttonIsDisabled: true,
        error: '',
    })
    orderView.render({
        ...customerData,
        buttonIsDisabled: true,
        error: '',
    })
})

// Старт работы приложения
await fillCatalog()

