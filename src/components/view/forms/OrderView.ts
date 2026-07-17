import {EventEmitter} from '../../base/Events.ts';
import {ensureElement} from '../../../utils/utils.ts';
import {TEmitCustomerData, TPayment} from '../../../types';
import {Form} from './Form.ts';

export class OrderView extends Form {
    private cardPaymentButton: HTMLButtonElement
    private cashPaymentButton: HTMLButtonElement
    private addressInputElement: HTMLInputElement;

    constructor(container: HTMLElement,
                private events: EventEmitter) {
        super(container);
        this.addressInputElement = ensureElement<HTMLInputElement>('input[name="address"]', this.container)
        this.cardPaymentButton = ensureElement<HTMLButtonElement>('.button_alt[name="card"]', this.container)
        this.cashPaymentButton = ensureElement<HTMLButtonElement>('.button_alt[name="cash"]', this.container)

        this.addressInputElement.addEventListener('input', (e) => {
            e.preventDefault();
            this.events.emit<TEmitCustomerData<'address'>>('order:input', {address: this.addressInputElement.value})
        })
        this.cardPaymentButton.addEventListener('click', () => {
            this.events.emit<TEmitCustomerData<'payment'>>('order:setPayment', {payment: 'online'})
        })
        this.cashPaymentButton.addEventListener('click', () => {
            this.events.emit<TEmitCustomerData<'payment'>>('order:setPayment', {payment: 'cash'})
        })

        this.container.addEventListener('submit', (e) => {
            e.preventDefault()
            this.events.emit('order:submit')
        })
    }

    set payment(payment: TPayment) {
        switch (payment) {
            case null:
                this.cardPaymentButton.classList.remove('button_alt-active');
                this.cashPaymentButton.classList.remove('button_alt-active');
                break;
            case 'cash':
                this.cardPaymentButton.classList.remove('button_alt-active');
                this.cashPaymentButton.classList.add('button_alt-active');
                break;
            case 'online':
                this.cardPaymentButton.classList.add('button_alt-active');
                this.cashPaymentButton.classList.remove('button_alt-active');
                break;
        }
    }

    set address(address: string) {
        this.addressInputElement.value = address;
    }
}