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

export interface IBuyer {
    payment: TPayment;
    email: string;
    phone: string;
    address: string;
}

export interface IErrorsValidate {
    payment?: string;
    email?: string;
    phone?: string;
    address?: string;
}


// Ответ сервера при получении списка товаров
export interface IProductsResponse {
    items: IProduct[];
    total: number;
}

// Данные для отправки заказа на сервер
export interface IOrderData extends IBuyer {
    items: string[];  // массив id товаров
    total: number;
}


// Ответ сервера при успешном оформлении заказа
export interface IOrderResponse {
    id: string;
    total: number;
}

//Типы компонентов
export interface IHeader {
}

export interface IModal {
}

export interface IEmitResponse<T extends object> {
    e: Event;
    data: T;
}

export interface IResponseDataId {
    id: string;
}


export interface IResponseDataOrder<T> {
    address: string;
    payment?: T;
}

export interface IResponseDataContacts {
    phone: string;
    email: string;
}