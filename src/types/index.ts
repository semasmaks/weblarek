export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export type TPayment = 'online' | 'cash' | ''

export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

export interface ICustomer {
    payment: TPayment;
    email: string;
    phone: string;
    address: string;
}

export type TErrorsValidate = Record<string, string>

// Ответ сервера при получении списка товаров
export interface IFetchItemsResponse {
    items: IProduct[];
    total: number;
}

// Данные для отправки заказа на сервер
export interface IOrderData extends ICustomer {
    items: string[];  // массив id товаров
    total: number;
}

// Ответ сервера при успешном оформлении заказа
export interface IPostOrderResponse {
    id: string;
    total: number;
}

//Типы компонентов
export interface IHeader {
}

export interface IModal {
}

export interface IEmitDefault<T extends object> {
    data: T;
    event?: Event;
}

export type TEmitProduct = IEmitDefault<IProduct>

export type TEmitPartialUserData = IEmitDefault<Partial<ICustomer>>
export type TEmitUserData = IEmitDefault<ICustomer>
