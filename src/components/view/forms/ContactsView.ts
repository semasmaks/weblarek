import {EventEmitter} from '../../base/Events.ts';
import {ensureElement} from '../../../utils/utils.ts';
import {ICustomer} from '../../../types';
import {Form} from './Form.ts';

export class ContactsView extends Form {
    private emailInput: HTMLInputElement;
    private phoneInput: HTMLInputElement;

    constructor(container: HTMLElement,
                private events: EventEmitter) {
        super(container);
        this.emailInput = ensureElement<HTMLInputElement>('input[name="email"]', this.container);
        this.phoneInput = ensureElement<HTMLInputElement>('input[name="phone"]', this.container);

        this.container.addEventListener('input', () => {
            this.events.emit<Pick<ICustomer, 'email' | 'phone'>>('form:input', {
                email: this.emailInput.value,
                phone: this.phoneInput.value,
            })
        })
        this.container.addEventListener('submit', (e) => {
            e.preventDefault();
            this.events.emit('contactsForm:submit')
        })
    }

    set email(email: string) {
        this.emailInput.value = email;
    }

    set phone(phone: string) {
        this.phoneInput.value = phone;
    }
}