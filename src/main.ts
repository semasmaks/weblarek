import './scss/styles.scss';
import {Cart} from "./components/models/Cart.ts";
import {Products} from "./components/models/Products.ts";
import {Customer} from "./components/models/Customer.ts";
import {Api} from "./components/base/Api.ts";
import {API_URL} from "./utils/constants.ts";
import {AppApi} from "./components/models/AppApi.ts";
import {apiProducts} from "./utils/data.ts"; // Mock data


{
    // Checking for work
// Initialisation
    const catalogApi = new Products();
    const catalogMock = new Products();
    const cart = new Cart();
    const customer = new Customer();
    const api = new AppApi(new Api(API_URL)); //🤯

    api.getProducts().then(res => {
        catalogApi.setProducts(res.items)
        console.log('---Api data---');
        console.log(catalogApi.getAllProducts());
        const searchedProduct = catalogApi.getProductById('412bcf81-7e75-4e70-bdb9-d3c73c9803b7')
        console.log('Searched product');
        console.log(searchedProduct);
        catalogApi.setSelectedProduct(searchedProduct)
        console.log('Selected product');
        console.log(catalogApi.getSelectedProduct())
    })

// Mock data
    catalogMock.setProducts(apiProducts.items)
    console.log('---Mock data---');
    console.log(catalogMock.getAllProducts());
    const searchedProductMok = catalogMock.getProductById('854cef69-976d-4c2a-a18c-2aa45046c390')
    console.log('Searched product');
    console.log(searchedProductMok);
// console.log(catalogMock.getSelectedProduct()) // ERROR
    catalogMock.setSelectedProduct(searchedProductMok)
    console.log('Selected product');
    console.log(catalogMock.getSelectedProduct())

// Cart
    console.log('---Cart---')
    cart.addItem(catalogMock.getProductById('854cef69-976d-4c2a-a18c-2aa45046c390'))
    cart.addItem(catalogMock.getProductById('412bcf81-7e75-4e70-bdb9-d3c73c9803b7'))
    console.log('Selected products');
    console.log(cart.getItems())
    console.log('Quantity of items in cart: ' + cart.getItemsLength())
    console.log('Total price: ' + cart.getTotalPrice())
    console.log(('Has item: ' + cart.hasItem('412bcf81-7e75-4e70-bdb9-d3c73c9803b7')))
    cart.removeItem(catalogMock.getProductById('412bcf81-7e75-4e70-bdb9-d3c73c9803b7'))
    console.log(('Has item: ' + cart.hasItem('412bcf81-7e75-4e70-bdb9-d3c73c9803b7')))
    cart.clear()
    console.log('Empty cart');
    console.log(cart.getItems());

// Customer
    customer.setAddress('ул.Пушкина')
    customer.setEmail('example@gmail.com')
    customer.setPhone('0123456789');
    customer.setPayment('cash')
    console.log('Customer Data');
    console.log(customer.getFullData());
    console.log(customer.validate());
    customer.resetData()
    console.log(customer.getFullData());
    console.log(customer.validate());
}