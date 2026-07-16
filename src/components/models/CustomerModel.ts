import {ICustomer, TErrorsValidate, TPayment} from '../../types';
import {EventEmitter} from '../base/Events.ts';

export class CustomerModel {
    private payment: TPayment = null;
    private email: string = '';
    private phone: string = '';
    private address: string = '';

    constructor(private events: EventEmitter) {}

    setPayment(payment: TPayment): void {
        this.payment = payment;
        this.events.emit('userData:setPayment');
        this.events.emit('order:updated')
    }

    setEmail(email: string): void {
        this.email = email;
        this.events.emit('userData:setEmail');
        this.events.emit('contacts:updated')
    }

    setPhone(phone: string): void {
        this.phone = phone;
        this.events.emit('userData:setPhone');
        this.events.emit('contacts:updated')
    }

    setAddress(address: string): void {
        this.address = address;
        this.events.emit('userData:setAddress');
        this.events.emit('order:updated')
    }

    getData(): ICustomer {
        return {
            payment: this.payment,
            email: this.email,
            phone: this.phone,
            address: this.address,
        }
    }

    resetData(): void {
        this.payment = null
        this.email = ''
        this.phone = ''
        this.address = ''
        this.events.emit('userData:reset');
    }

    validate(): TErrorsValidate {
        const errors: Record<string, string> = {};
        if (!this.payment) {
            errors.payment = 'Не выбран способ оплаты';
        }
        if (!this.address || this.address.trim() === '') {
            errors.address = 'Укажите адрес доставки';
        }
        if (!this.email || this.email.trim() === '') {
            errors.email = 'Укажите email';
        }
        if (!this.phone || this.phone.trim() === '') {
            errors.phone = 'Укажите телефон';
        }
        return errors
    }
}
