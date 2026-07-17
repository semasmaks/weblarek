import {EventEmitter} from '../../base/Events.ts';
import {ensureElement} from '../../../utils/utils.ts';
import {Card} from './Card.ts';

export class BasketCardNew extends Card {
    private buttonElement: HTMLButtonElement
    private indexElement: HTMLElement;

    constructor(container: HTMLElement,
                private events: EventEmitter) {
        super(container);
        this.buttonElement = ensureElement<HTMLButtonElement>('.card__button', this.container)
        this.indexElement = ensureElement<HTMLElement>('.basket__item-index', this.container)
    }

    set id(id: string) {
        this.buttonElement.addEventListener('click', () => {
            this.events.emit('basketItem:delete', {id: id})
        })
    }

    set index(value: number) {
        this.indexElement.textContent = String(value)
    }
}