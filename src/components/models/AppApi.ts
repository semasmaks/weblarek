import {IApi, IOrderData, IOrderResponse, IProductsResponse} from '../../types';

export class AppApi {
    private api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    getProducts(): Promise<IProductsResponse> {
        return this.api.get<IProductsResponse>('/product/');
    }

    postOrder(order: IOrderData): Promise<IOrderResponse> {
        return this.api.post<IOrderResponse>('/order/', order)
    }
}