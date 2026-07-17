import {Component} from '../base/Component.ts';
import {EventEmitter} from '../base/Events.ts';
import {ensureElement} from '../../utils/utils.ts';
import {IModalRender} from '../../types';

export class ModalView extends Component<IModalRender> {
    private contentElement: HTMLElement
    private closeBtn: HTMLButtonElement

    constructor(container: HTMLElement,
                private events: EventEmitter) {
        super(container);
        this.contentElement = ensureElement<HTMLElement>('.modal__content', this.container);
        this.closeBtn = ensureElement<HTMLButtonElement>('.modal__close', this.container);

        this.closeBtn.addEventListener('click', () => {
            this.events.emit('modal:close')
        })
        this.container.addEventListener('click', (e) => {
            if (e.target === this.container) this.events.emit('modal:close')
        })
    }

    closeModal(): void {
        this.container.classList.remove('modal_active');
        this.contentElement.replaceChildren();
    }

    showModal(): void {
        this.container.classList.add('modal_active');
    }

    set content(content: HTMLElement) {
        this.contentElement.replaceChildren(content);
    }
}