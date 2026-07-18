import {ensureElement} from '../../../utils/utils.ts';
import {Card} from './Card.ts';

export class BasketCard extends Card {
    private buttonElement: HTMLButtonElement
    private indexElement: HTMLElement;

    constructor(container: HTMLElement,
                onClick: () => void) {
        super(container);
        this.buttonElement = ensureElement<HTMLButtonElement>('.card__button', this.container)
        this.indexElement = ensureElement<HTMLElement>('.basket__item-index', this.container)
        this.buttonElement.addEventListener('click', onClick)
    }

    set index(value: number) {
        this.indexElement.textContent = String(value)
    }
}