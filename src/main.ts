import './scss/styles.scss';
import {Products} from './components/models/Products.ts';
import {cloneTemplate, ensureElement} from './utils/utils.ts';
import {ModalView} from './components/view/ModalView.ts';
import {CatalogView} from './components/view/CatalogView.ts';
import {CardPreview} from './components/view/CardPreview.ts';
import {AppApi} from './components/models/AppApi.ts';
import {Api} from './components/base/Api.ts';
import {API_URL} from './utils/constants.ts';
import {EventEmitter} from './components/base/Events.ts';
import {Basket} from './components/models/Basket.ts';
import {Customer} from './components/models/Customer.ts';
import {HeaderView} from './components/view/HeaderView.ts';
import {BasketModalView} from './components/view/BasketModalView.ts';
import {
    IEmitDefault,
    IFetchItemsResponse,
    IPostOrderResponse,
    TEmitProduct,
    TEmitPartialUserData, TEmitUserData,
} from './types';
import {CatalogPresenter} from './components/presenters/CatalogPresenter.ts';
import {
    CardPreviewPresenter,
} from './components/presenters/CardPreviewPresenter.ts';
import {BasketPresenter} from './components/presenters/BasketPresenter.ts';
import {HeaderPresenter} from './components/presenters/HeaderPresenter.ts';
import {OrderModalView} from './components/view/OrderModalView.ts';
import {OrderPresenter} from './components/presenters/OrderPresenter.ts';
import {ContactsView} from './components/view/ContactsView.ts';
import {ContactsPresenter} from './components/presenters/ContactsPresenter.ts';
import {ApiPresenter} from './components/presenters/ApiPresenter.ts';
import {SuccessView} from './components/view/SuccesView.ts';
import {SuccessPresenter} from './components/presenters/SuccessPresenter.ts';

// События
const events = new EventEmitter()

// Темплеты
const basketContainerTemplate = cloneTemplate('#basket') as HTMLTemplateElement
const basketItemTemplate = cloneTemplate('#card-basket') as HTMLTemplateElement
const catalogItemTemplate = cloneTemplate('#card-catalog') as HTMLTemplateElement
const cardPreviewTemplate = cloneTemplate('#card-preview') as HTMLTemplateElement
const orderTemplate = cloneTemplate('#order') as HTMLTemplateElement
const contactsTemplate = cloneTemplate('#contacts') as HTMLTemplateElement
const successTemplate = cloneTemplate('#success') as HTMLTemplateElement

// Элементы
const headerElement = ensureElement('.header')
const catalogElement = ensureElement('.gallery')
const modalElement = ensureElement('#modal-container')

// Модели
const catalog = new Products()
const basket = new Basket()
const customer = new Customer()

// API
const api = new Api(API_URL);
const appApi = new AppApi(api)
const apiPresenter = new ApiPresenter(appApi, events, basket, customer)

// Представления
const catalogView = new CatalogView(catalogElement, events, catalogItemTemplate)
const headerView = new HeaderView(headerElement, events)

// Модалки
const modalView = new ModalView(modalElement, events) // Создаём чтобы повесить обработчик закрытия на 1 элемент, а не на 3
const basketModalView = new BasketModalView(modalElement, events, basketContainerTemplate, basketItemTemplate)
const itemPreviewModal = new CardPreview(modalElement, events, cardPreviewTemplate)
const orderModal = new OrderModalView(modalElement, events, orderTemplate)
const contactsModal = new ContactsView(modalElement, events, contactsTemplate)
const successModal = new SuccessView(modalElement, events, successTemplate)

// Презентеры
const catalogPresenter = new CatalogPresenter(catalog, catalogView);
const cardPreviewPresenter = new CardPreviewPresenter(catalog, basket, itemPreviewModal)
const basketPresenter = new BasketPresenter(basket, basketModalView)
const headerPresenter = new HeaderPresenter(basket, headerView)
const orderPresenter = new OrderPresenter(customer, orderModal)
const contactsPresenter = new ContactsPresenter(customer, contactsModal)
const successPresenter = new SuccessPresenter(basket, events, successModal)

// Слушатели
// При успешном получении продуктов
events.on('appApi:getItems', (res: IFetchItemsResponse) => {
    catalogPresenter.renderCatalog(res.items)
})
// При клике на карточку
events.on('catalogCard:click', (res: TEmitProduct) => {
    cardPreviewPresenter.openPreview(res)
})
// Закрытие всех модальных окон и сброс выбранной карточки
events.on('modal:close', () => {
    modalView.hideModal();
    cardPreviewPresenter.onClose()
})
// При нажатии на кнопку "Купить"/"Удалить из корзины" в модальном окне
events.on('addToCardBtn:click', (res: TEmitProduct) => {
    cardPreviewPresenter.onActionBtnClick(res);
    basketPresenter.updateBasket()
    headerPresenter.updateBasketCounter()
})
// При очистке корзины
events.on('basket:clear', () => {
    headerPresenter.updateBasketCounter()
})
// При нажатии на открытие корзины
events.on('basketModal:open', () => {
    basketPresenter.showBasket()
})
// При нажатии на "Удалить" в корзине
events.on('basketDellBtn:click', (res: TEmitProduct) => {
    basketPresenter.deleteItem(res)
    headerPresenter.updateBasketCounter()
})
// При вводе адреса в поле заказа или выборе способа оплаты
events.on('order:input', (res: TEmitPartialUserData) => {
    orderPresenter.onInput(res)
})
// При нажатии на "Оформить" в корзине
events.on('order:open', () => {
    orderPresenter.showModal()
})
// При нажатии на "Далее" в форме заказа
events.on('order:submit', () => {
    contactsPresenter.showModal()
})
// При вводе в любое поле в форме контактов
events.on('contacts:input', (res: TEmitUserData) => {
    contactsPresenter.onInput(res)
})
// При нажатии на "Оформить" в форме контактов
events.on('contacts:submit', () => {
    apiPresenter.postOrder()
})
// При Успешном ответе от сервера
events.on('appApi:orderPosted', (res: IEmitDefault<IPostOrderResponse>) => {
    successPresenter.showSuccessWindow(res)
})

// Старт работы приложения
document.addEventListener('DOMContentLoaded', async () => {
    apiPresenter.getItems()
});
