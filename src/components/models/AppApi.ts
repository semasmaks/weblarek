import {
    IApi,
    IFetchItemsResponse,
    IOrderData,
    IPostOrderResponse,
} from '../../types';

export class AppApi {
    private api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    getProducts(): Promise<IFetchItemsResponse> {
        return this.api.get<IFetchItemsResponse>('/product/');
    }

    postOrder(order: IOrderData): Promise<IPostOrderResponse> {
        return this.api.post<IPostOrderResponse>('/order/', order)
    }
}