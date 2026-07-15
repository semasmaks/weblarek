import {ModalView} from './ModalView.ts';
import {EventEmitter} from '../base/Events.ts';
import {ensureElement} from '../../utils/utils.ts';
import {IPostOrderResponse} from '../../types';

export class SuccessView extends ModalView {
    private readonly content: HTMLElement
    private description: HTMLElement
    private successButton: HTMLButtonElement

    constructor(container: HTMLElement,
                events: EventEmitter,
                successTemplate: HTMLTemplateElement) {
        super(container, events);
        this.content = successTemplate as HTMLElement
        this.description = ensureElement('.order-success__description', this.content) as HTMLElement;
        this.successButton = ensureElement('.order-success__close', this.content) as HTMLButtonElement
        this.successButton.addEventListener('click', (e) => {
            e.preventDefault()
            this.events.emit('modal:close')
        })
    }

    setStatus(res: IPostOrderResponse) {
        this.description.textContent = `Списано ${res.total.toLocaleString('ru-RU')} синапсов`

    }

    showModal(): void {
        super.showModal(this.content)
    }
}