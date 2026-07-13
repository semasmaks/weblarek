import {AppApi} from '../models/AppApi.ts';
import {Basket} from '../models/Basket.ts';
import {Customer} from '../models/Customer.ts';
import {EventEmitter} from '../base/Events.ts';
import {
    IBuyer,
    IOrderData,
    IOrderResponse,
    IProductsResponse,
} from '../../types';

export class ApiPresenter {
    constructor(private api: AppApi,
                private events: EventEmitter,
                private basket: Basket,
                private customer: Customer) {
    }

    async getItems(): Promise<void> {
        const response: IProductsResponse = await this.api.getProducts();
        this.events.emit<IProductsResponse>('catalog:getItems', {
            items: response.items,
            total: response.total,
        });
    }

    async postOrder(): Promise<void> {
        const customerInfo: IBuyer = this.customer.getData();
        const order: IOrderData = {
            ...customerInfo,
            items: this.basket.getItems().map(item => item.id),
            total: this.basket.getTotalPrice(),
        }
        try {
            const response: IOrderResponse = await this.api.postOrder(order)
            if (response) this.events.emit('api:responseOk', response)
        } catch (e) {
            console.log(e);
        }
    }
}