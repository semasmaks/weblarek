import {IBuyer, TPayment} from "../../types";

export class Customer {
    private _payment: TPayment = '';
    private _email: string = '';
    private _phone: string = '';
    private _address: string = '';

    setPayment(payment: TPayment): void {
        this._payment = payment;
    }
    setEmail(email: string): void {
        this._email = email;
    }
    setPhone(phone: string): void {
        this._phone = phone;
    }
    setAddress(address: string): void {
        this._address = address;
    }

    getPayment(): TPayment {
        return this._payment;
    }
    getEmail(): string {
        return this._email;
    }
    getPhone(): string {
        return this._phone;
    }
    getAddress(): string {
        return this._address;
    }
    getFullData(): IBuyer {
        return {
            payment: this._payment,
            email: this._email,
            phone: this._phone,
            address: this._address
        }
    }

    resetData(): void {
        this._payment = ''
        this._email = ''
        this._phone = ''
        this._address = ''
    }

    validate(): Record<string, string> | null {
        const errors: Record<string, string> = {};
        if (!this._payment) {
            errors.payment = 'Не выбран способ оплаты';
        }
        if (!this._address || this._address.trim() === '') {
            errors.address = 'Укажите адрес доставки';
        }
        if (!this._email || this._email.trim() === '') {
            errors.email = 'Укажите email';
        }
        if (!this._phone || this._phone.trim() === '') {
            errors.phone = 'Укажите телефон';
        }

        // Если есть ошибки, возвращаем объект, иначе null
        return Object.keys(errors).length > 0 ? errors : null;
    }
}
