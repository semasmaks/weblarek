import './scss/styles.scss';
import {CatalogModel} from './components/models/CatalogModel.ts';
import {cloneTemplate, ensureElement} from './utils/utils.ts';
import {AppApi} from './components/api/AppApi.ts';
import {Api} from './components/base/Api.ts';
import {API_URL} from './utils/constants.ts';
import {EventEmitter} from './components/base/Events.ts';
import {BasketModel} from './components/models/BasketModel.ts';
import {CustomerModel} from './components/models/CustomerModel.ts';
import {ModalView} from './components/view/ModalView.ts';
import {BasketView} from './components/view/BasketView.ts';
import {CardPreview} from './components/view/CardPreview.ts';
import {CatalogView} from './components/view/CatalogView.ts';
import {CatalogCardNew} from './components/view/cards/CatalogCardNew.ts';
import {HeaderView} from './components/view/HeaderView.ts';
import {IEmitID, IPostOrderResponse, TEmitCustomerData} from './types';
import {BasketCardNew} from './components/view/cards/BasketCard.ts';
import {OrderView} from './components/view/OrderView.ts';
import {ContactsView} from './components/view/ContactsView.ts';
import {SuccessView} from './components/view/SuccessView.ts';

// События
const events = new EventEmitter()

// Темплеты
const basketContainerTemplate = <HTMLTemplateElement>cloneTemplate('#basket')
const basketItemTemplate = <HTMLTemplateElement>cloneTemplate('#card-basket')
const catalogItemTemplate = <HTMLTemplateElement>cloneTemplate('#card-catalog')
const cardPreviewTemplate = <HTMLTemplateElement>cloneTemplate('#card-preview')
const orderTemplate = <HTMLTemplateElement>cloneTemplate('#order')
const contactsTemplate = <HTMLTemplateElement>cloneTemplate('#contacts')
const successTemplate = <HTMLTemplateElement>cloneTemplate('#success')

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
const cardPreview = new CardPreview(cardPreviewTemplate, events)
const basketView = new BasketView(basketContainerTemplate, events)
const orderView = new OrderView(orderTemplate, events)
const contactsView = new ContactsView(contactsTemplate, events)
const successView = new SuccessView(successTemplate, events)

function resetAll() {
    customerModel.resetData()
    basketModel.clear()
    orderView.render({resetForm: true})
    contactsView.render({resetForm: true})
}

async function fillCatalog(): Promise<void> {
    try {
        const fetchedItems = await appApi.getProducts()
        catalogModel.setItems(fetchedItems.items)
        const cards = catalogModel.getAllItems().map(item => {
            return new CatalogCardNew(catalogItemTemplate, events).render(item)
        })
        catalogView.render({items: cards})
    } catch (e) {
        console.log(e)
    }
}

events.on('catalogCard:click', (res: IEmitID) => {
    // console.log(`клик по карточке: ${res.id}`)
    catalogModel.setSelectedItems(catalogModel.getItemById(res.id))
})
events.on('catalog:activeItemSet', () => {
    // console.log('выбрана карточка')
    const card = catalogModel.getSelectedItem()
    if (card) {
        const isInBasket = basketModel.hasItem(card.id)
        modalView.render({content: cardPreview.render({...card, isInBasket})})
    }
})
events.on('basketOpenBtn:click', () => {
    // console.log('открытие корзины')
    modalView.render({content: basketView.render()})
})
events.on('modal:close', () => {
    // console.log('закрытие модалки')
    modalView.closeModal()
    catalogModel.setSelectedItems(null)
})
events.on('previewActinBtn:click', (res: IEmitID) => {
    // console.log('нажатие на кнопку покупки')
    const item = catalogModel.getItemById(res.id)
    basketModel.hasItem(res.id) ? basketModel.removeItem(item)
                                : basketModel.addItem(item)
})
events.on('basket:update', () => {
    // console.log('содержимое корзины изменилось')
    const cards = basketModel.getItems().map((item, index) => {
        return new BasketCardNew(basketItemTemplate, events).render({
            ...item,
            index,
        })
    })
    basketView.render({
        items: cards,
        totalPrice: basketModel.getTotalPrice(),
        buttonIsDisabled: !basketModel.getItemsLength(),
    })
    headerView.render({basketCounter: basketModel.getItemsLength()})
})
events.on('basketItem:delete', (res: IEmitID) => {
    // console.log(`удаление товара: ${res.id}`)
    basketModel.removeItem(catalogModel.getItemById(res.id))
})
events.on('basket:goToOrder', () => {
    // console.log('открытие окна оформления(шаг 1)')
    modalView.render({content: orderView.render()})
})
events.on('order:input', (res: TEmitCustomerData<'address'>) => {
    customerModel.setAddress(res.address)
})
events.on('order:setPayment', (res: TEmitCustomerData<'payment'>) => {
    customerModel.setPayment(res.payment === customerModel.getData().payment
                             ? null
                             : res.payment)
})
events.on('order:updated', () => {
    const errors = customerModel.validate()
    const msg = ['address', 'payment']
        .map(field => errors[field])
        .find(error => error !== undefined) || ''
    orderView.render({
        payment: customerModel.getData().payment,
        error: msg,
    })
})
events.on('order:submit', () => {
    // console.log('открытие окна оформления(шаг 2)')
    modalView.render({content: contactsView.render()})
})
events.on('contacts:input', (res: TEmitCustomerData<'email' | 'phone'>) => {
    customerModel.setEmail(res.email ?? '')
    customerModel.setPhone(res.phone ?? '')
})
events.on('contacts:updated', () => {
    const errors = customerModel.validate()
    const msg = ['email', 'phone']
        .map(field => errors[field])
        .find(error => error !== undefined) || ''
    contactsView.render({error: msg})
})
events.on('contacts:submit', async () => {
    const order = {
        ...customerModel.getData(),
        items: basketModel.getItems().map(item => item.id),
        total: basketModel.getTotalPrice(),
    }
    contactsView.render({error: 'Данные отправляются на сервер'})
    try {
        const postOrderResponse = await appApi.postOrder(order)
        events.emit<IPostOrderResponse>('order:posted', postOrderResponse)
    } catch (e) {
        console.log(e)
    }
})
events.on('order:posted', (res: IPostOrderResponse) => {
    modalView.render({content: successView.render(res)})
    resetAll()
})

// Старт работы приложения
document.addEventListener('DOMContentLoaded', async () => {
    await fillCatalog()
});
