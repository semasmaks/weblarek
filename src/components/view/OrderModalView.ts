import {ModalView} from './ModalView.ts';
import {EventEmitter} from '../base/Events.ts';
import {ensureElement} from '../../utils/utils.ts';
import {IEmitResponse, IResponseDataOrder, TPayment} from '../../types';

export class OrderModalView extends ModalView {
    private readonly content: HTMLFormElement

    private readonly orderButtonsContainer: HTMLElement;
    private cardPaymentButton: HTMLButtonElement
    private cashPaymentButton: HTMLButtonElement

    private errorsElement: HTMLElement;
    private addressInputElement: HTMLInputElement;
    private submitButton: HTMLButtonElement;

    constructor(container: HTMLElement,
                events: EventEmitter,
                orderTemplate: HTMLElement) {
        super(container, events)
        this.content = orderTemplate as HTMLFormElement

        this.submitButton = ensureElement('.order__button', this.content) as HTMLButtonElement;
        this.errorsElement = ensureElement('.form__errors', this.content) as HTMLElement;
        this.addressInputElement = ensureElement('input[name="address"]', this.content) as HTMLInputElement;
        this.orderButtonsContainer = ensureElement('.order__buttons', this.content);
        this.cardPaymentButton = ensureElement('.button_alt[name="card"]', this.orderButtonsContainer) as HTMLButtonElement;
        this.cashPaymentButton = ensureElement('.button_alt[name="cash"]', this.orderButtonsContainer) as HTMLButtonElement

        this.cardPaymentButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.events.emit<IEmitResponse<IResponseDataOrder<TPayment>>>('order:input', {
                e: e,
                data: {
                    address: this.addressInputElement.value,
                    payment: 'online',
                },
            });
        })
        this.cashPaymentButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.events.emit('order:input', {
                e: e,
                data: {
                    address: this.addressInputElement.value,
                    payment: 'cash',
                },
            })
        })
        this.addressInputElement.addEventListener('input', (e) => {
            e.preventDefault();
            this.events.emit<IEmitResponse<IResponseDataOrder<TPayment>>>('order:input', {
                e: e,
                data: {
                    address: this.addressInputElement.value,

                },
            })
        })
        this.content.addEventListener('submit', (e) => {
            e.preventDefault()
            this.events.emit('order:submit')
        })
    }

    showModal(): void {
        super.showModal(this.content)

    }

    setPayment(payment: TPayment): void {
        switch (payment) {
            case '':
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

    showError(message: string): void {
        this.submitButton.disabled = !!message;
        this.errorsElement.textContent = message;
    }
}
