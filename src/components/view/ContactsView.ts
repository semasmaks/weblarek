import {Component} from '../base/Component.ts';
import {EventEmitter} from '../base/Events.ts';
import {ensureElement} from '../../utils/utils.ts';
import {IContactsRender, TEmitCustomerData} from '../../types';

export class ContactsView extends Component<IContactsRender> {
    private emailInput: HTMLInputElement;
    private phoneInput: HTMLInputElement;
    private errorElement: HTMLElement;
    private submitButton: HTMLButtonElement;

    constructor(container: HTMLElement,
                private events: EventEmitter) {
        super(container);
        this.emailInput = ensureElement<HTMLInputElement>('input[name="email"]', this.container);
        this.phoneInput = ensureElement<HTMLInputElement>('input[name="phone"]', this.container);
        this.errorElement = ensureElement<HTMLElement>('.form__errors', this.container);
        this.submitButton = ensureElement<HTMLButtonElement>('.button[type="submit"]', this.container);

        this.container.addEventListener('input', () => {
            this.events.emit<TEmitCustomerData<'email' | 'phone'>>('contacts:input', {
                email: this.emailInput.value,
                phone: this.phoneInput.value,
            })
        })
        this.container.addEventListener('submit', (e) => {
            e.preventDefault();
            this.events.emit('contacts:submit')
        })
    }

    set error(msg: string) {
        this.errorElement.textContent = msg;
        this.submitButton.disabled = !!msg
    }

    resetForm() {
        this.emailInput.value = '';
        this.phoneInput.value = '';
        this.errorElement.textContent = '';
    }
}