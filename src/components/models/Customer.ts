import {IBuyer, TPayment} from "../../types";

export class Customer {
    private payment: TPayment = '';
    private email: string = '';
    private phone: string = '';
    private address: string = '';

    setPayment(payment: TPayment): void {
        this.payment = payment;
    }

    setEmail(email: string): void {
        this.email = email;
    }

    setPhone(phone: string): void {
        this.phone = phone;
    }

    setAddress(address: string): void {
        this.address = address;
    }

    getData(): IBuyer {
        return {
            payment: this.payment,
            email: this.email,
            phone: this.phone,
            address: this.address
        }
    }

    resetData(): void {
        this.payment = ''
        this.email = ''
        this.phone = ''
        this.address = ''
    }

    validate(): Record<string, string> | null {
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
