import {IApi, IProductsResponse, IOrderData, IOrderResponse} from "../../types";

export class AppApi {
    private api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    getProducts(): Promise<IProductsResponse> {
        return this.api.get('/product/');
    }

    postOrder(order: IOrderData): Promise<IOrderResponse> {
        return this.api.post('/order/', order)
    }
}