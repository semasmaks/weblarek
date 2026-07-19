import {Component} from '../../base/Component.ts';
import {ensureElement} from '../../../utils/utils.ts';
import {ICardDataRender} from '../../../types';

export class Card extends Component<ICardDataRender> {
    private titleElement: HTMLElement;
    private priceElement: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);
        this.titleElement = ensureElement<HTMLElement>('.card__title', this.container)
        this.priceElement = ensureElement<HTMLElement>('.card__price', this.container)
    }

    set price(price: number | null) {
        this.priceElement.textContent = price !== null ? `${price} синапсов`
                                                       : 'Бесценно'
    }

    set title(title: string) {
        this.titleElement.textContent = title;
    }
}