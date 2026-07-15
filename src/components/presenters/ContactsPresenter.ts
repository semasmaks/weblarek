import {Customer} from '../models/Customer.ts';
import {ContactsView} from '../view/ContactsView.ts';
import {TEmitUserData} from '../../types';

export class ContactsPresenter {
    constructor(private customer: Customer,
                private view: ContactsView) {
    }

    showModal(): void {
        this.view.showModal()
    }

    onInput(res: TEmitUserData) {
        this.customer.setPhone(res.data.phone)
        this.customer.setEmail(res.data.email)
        const errors = this.customer.validate()
        if (errors.email) {
            this.view.showError(errors.email)
        } else if (errors.phone) {
            this.view.showError(errors.phone)
        } else this.view.showError('')
    }
}