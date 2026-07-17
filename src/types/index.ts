export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export type TPayment = 'online' | 'cash' | null

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
export interface IHeaderRender {
    basketCounter: number;
}

export interface ICatalogRender {
    items: HTMLElement[];
}

export interface ICardDataRender extends IProduct{
    index: number;
    buttonIsDisabled: boolean;
    buttonText: string;
}

export interface IModalRender {
    content: HTMLElement;
}

export interface IBasketRender {
    items: HTMLElement[];
    totalPrice: number;
    buttonIsDisabled: boolean;
}

export interface IFormRender {
    payment: TPayment;
    address: string;
    email: string;
    phone: string;
    error: string;
    buttonIsDisabled: boolean;
}

export interface ISuccessRender {
    total: number;
}

export interface IEmitID {
    id: string;
    event?: Event;
}

export type TEmitCustomerData<T extends keyof ICustomer = never> =
   T extends never
    ? Partial<ICustomer>
    : Partial<ICustomer> & Required<Pick<ICustomer, T>>

