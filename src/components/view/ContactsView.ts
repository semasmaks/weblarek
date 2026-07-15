import {ModalView} from './ModalView.ts';
import {EventEmitter} from '../base/Events.ts';
import {ensureElement} from '../../utils/utils.ts';
import {TEmitPartialUserData} from '../../types';

export class ContactsView extends ModalView {
    private readonly content: HTMLElement;
    private emailInput: HTMLInputElement;
    private phoneInput: HTMLInputElement;
    private errorElement: HTMLElement;
    private submitButton: HTMLButtonElement;

    constructor(container: HTMLElement,
                events: EventEmitter,
                contactsTemplate: HTMLTemplateElement) {
        super(container, events)
        this.content = contactsTemplate as HTMLElement

        this.emailInput = ensureElement('input[name="email"]', this.content) as HTMLInputElement;
        this.phoneInput = ensureElement('input[name="phone"]', this.content) as HTMLInputElement;
        this.errorElement = ensureElement('.form__errors', this.content) as HTMLElement;
        this.submitButton = ensureElement('.button[type="submit"]', this.content) as HTMLButtonElement;

        this.phoneInput.addEventListener('input', (e: Event) => {
            e.preventDefault()
            this.events.emit<TEmitPartialUserData>('contacts:input', {
                data: {
                    phone: this.phoneInput.value,
                    email: this.emailInput.value,
                },
            })
        })
        this.emailInput.addEventListener('input', (e: Event) => {
            e.preventDefault()
            this.events.emit<TEmitPartialUserData>('contacts:input', {
                data: {
                    phone: this.phoneInput.value,
                    email: this.emailInput.value,
                },
            })
        })
        this.content.addEventListener('submit', (e: Event) => {
            e.preventDefault()
            this.events.emit('contacts:submit')
        })

    }

    showModal() {
        super.showModal(this.content);
    }

    showError(message: string) {
        this.submitButton.disabled = !!message;
        this.errorElement.textContent = message;
    }
}