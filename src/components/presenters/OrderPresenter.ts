import {Customer} from '../models/Customer.ts';
import {OrderModalView} from '../view/OrderModalView.ts';
import {TEmitPartialUserData} from '../../types';

export class OrderPresenter {
    constructor(private customer: Customer,
                private view: OrderModalView) {
    }

    showModal() {
        this.view.showModal()
    }

    onInput(res: TEmitPartialUserData) {
        if (res.data.payment) {
            if (res.data.payment === this.customer.getData().payment) {
                this.customer.setPayment('');
                this.view.setPayment('');
            } else {
                this.customer.setPayment(res.data.payment);
                this.view.setPayment(res.data.payment);
            }
        }
        if (res.data.address) this.customer.setAddress(res.data.address)
        const errors = this.customer.validate()
        if (errors.address) {
            this.view.showError(errors.address)
        } else if (errors.payment) {
            this.view.showError(errors.payment)
        } else this.view.showError('')
    }
}