import {Component} from '../base/Component.ts';
import {IModal} from '../../types';
import {EventEmitter} from '../base/Events.ts';
import {ensureElement} from '../../utils/utils.ts';

export class ModalView extends Component<IModal> {
    protected events: EventEmitter
    private readonly contentSection: HTMLElement;
    private closeButton: HTMLButtonElement;

    constructor(container: HTMLElement,
                events: EventEmitter) {
        super(container);
        this.contentSection = ensureElement('.modal__content', this.container) as HTMLElement;
        this.closeButton = ensureElement('.modal__close', this.container) as HTMLButtonElement;
        this.events = events
        this.closeButton?.addEventListener('click', () => {
            this.events.emit('modal:close');
        })
        this.container.addEventListener('click', (e) => {
            if (e.target === this.container) {
                this.events.emit('modal:close');
            }
        })
    }

    hideModal(): void {
        this.container.classList.remove('modal_active');
        this.contentSection?.replaceChildren();
    }

    protected showModal(element?: HTMLElement | HTMLElement[]): void {
        if (element) {
            this.contentSection?.replaceChildren();
            const items = Array.isArray(element) ? element : [element];
            items.forEach(el => this.contentSection?.append(el));
        }
        this.container.classList.add('modal_active');
    }
}