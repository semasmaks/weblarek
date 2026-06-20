import './scss/styles.scss';
import {Cart} from "./components/models/Cart.ts";
import {Products} from "./components/models/Products.ts";
import {Customer} from "./components/models/Customer.ts";
import {Api} from "./components/base/Api.ts";
import {API_URL} from "./utils/constants.ts";
import {AppApi} from "./components/models/AppApi.ts";
import {apiProducts} from "./utils/data.ts"; // Моковые данные


{
    // Проверка классов и их методов
// Инициализация
    const catalogApi = new Products();
    const catalogMock = new Products();
    const cart = new Cart();
    const customer = new Customer();
    const api = new Api(API_URL)
    const appApi = new AppApi(api);

    appApi.getProducts().then(res => {
        console.log('Проверка данных, полученных с сервера');
        catalogApi.setItems(res.items)
        console.log(catalogApi.getAllItems());
    }).catch(err => console.log(`произошла ошибка: ${err}`));

// Проверка класса на моковых данных
    catalogMock.setItems(apiProducts.items)
    console.log('Проверка класса на моковых данных');
    console.log(catalogMock.getAllItems());
    const searchedProductMok = catalogMock.getItemById('854cef69-976d-4c2a-a18c-2aa45046c390')
    console.log('Поиск по id:');
    console.log(searchedProductMok);
    console.log(catalogMock.getSelectedItem())
    catalogMock.setSelectedItems(searchedProductMok)
    console.log('Выбранный продукт');
    console.log(catalogMock.getSelectedItem())

// Корзина
    cart.addItem(catalogMock.getItemById('854cef69-976d-4c2a-a18c-2aa45046c390'))
    cart.addItem(catalogMock.getItemById('412bcf81-7e75-4e70-bdb9-d3c73c9803b7'))
    console.log('Товары в корзине');
    console.log(cart.getItems())
    console.log('Кол-во товаров в корзине: ' + cart.getItemsLength())
    console.log('Сумма: ' + cart.getTotalPrice())
    console.log(('Проверка наличия товара в корзине: ' + cart.hasItem('412bcf81-7e75-4e70-bdb9-d3c73c9803b7')))
    cart.removeItem(catalogMock.getItemById('412bcf81-7e75-4e70-bdb9-d3c73c9803b7'))
    console.log(('Проверка наличия товара в корзине: ' + cart.hasItem('412bcf81-7e75-4e70-bdb9-d3c73c9803b7')))
    cart.clear()
    console.log('Очистка корзины');
    console.log(cart.getItems());

// Покупатель
    customer.setAddress('ул.Пушкина')
    customer.setEmail('example@gmail.com')
    customer.setPhone('0123456789');
    customer.setPayment('cash')
    console.log('Данные покупателя');
    console.log(customer.getData());
    console.log(customer.validate());
    customer.resetData()
    console.log(customer.getData());
    console.log(customer.validate());
}