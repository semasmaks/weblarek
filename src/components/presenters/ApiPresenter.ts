import {AppApi} from '../models/AppApi.ts';
import {Basket} from '../models/Basket.ts';
import {Customer} from '../models/Customer.ts';
import {EventEmitter} from '../base/Events.ts';
import {
    ICustomer,
    IOrderData,
    IPostOrderResponse,
    IFetchItemsResponse, IEmitDefault,
} from '../../types';

export class ApiPresenter {
    constructor(private api: AppApi,
                private events: EventEmitter,
                private basket: Basket,
                private customer: Customer) {
    }

    async getItems(): Promise<void> {
        const response: IFetchItemsResponse = await this.api.getProducts();
        this.events.emit<IFetchItemsResponse>('appApi:getItems', {
            ...response
        });
    }

    async postOrder(): Promise<void> {
        const customerInfo: ICustomer = this.customer.getData();
        const order: IOrderData = {
            ...customerInfo,
            items: this.basket.getItems().map(item => item.id),
            total: this.basket.getTotalPrice(),
        }
        try {
            const response: IPostOrderResponse = await this.api.postOrder(order)
            if (response) this.events.emit<IEmitDefault<IPostOrderResponse>>('appApi:orderPosted', {data: response})
        } catch (err) {
            console.log(err);
        }
    }
}