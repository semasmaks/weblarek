import {EventEmitter} from '../base/Events.ts';
import {ensureElement} from '../../utils/utils.ts';
import {Card} from './cards/Card.ts';

export class CardPreview extends Card {
    private descriptionElement: HTMLElement;
    private buttonElement: HTMLButtonElement;

    constructor(container: HTMLElement,
                private events: EventEmitter) {
        super(container);
        this.descriptionElement = ensureElement<HTMLElement>('.card__text', this.container)
        this.buttonElement = ensureElement<HTMLButtonElement>('.card__button', this.container)
        this.buttonElement.addEventListener('click', () => {
            this.events.emit('previewActinBtn:click', {id: this.container.dataset.id})
            this.events.emit('modal:close')
        })
    }

    set description(description: string) {
        this.descriptionElement.textContent = description
    }

    set price(price: number | null) {
        super.price = price;
        this.buttonElement.disabled = !price;
        if (!price) this.buttonElement.textContent = 'Недоступно'
    }

    set isInBasket(isInBasket: boolean) {
        if (!this.buttonElement.disabled) this.buttonElement.textContent = isInBasket
                                                                          ? 'Удалить из корзины'
                                                                          : 'Купить'
    }
}