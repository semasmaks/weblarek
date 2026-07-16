import {EventEmitter} from '../../base/Events.ts';
import {Component} from '../../base/Component.ts';
import {ensureElement} from '../../../utils/utils.ts';
import {ICardDataRender} from '../../../types';

export class BasketCardNew extends Component<any> { // Не наследует Card т.к. имеет только 2 общих поля
    private titleElement: HTMLElement;
    private priceElement: HTMLElement;
    private buttonElement: HTMLButtonElement
    private indexElement: HTMLElement;

    constructor(container: HTMLElement,
                private events: EventEmitter) {
        super(container);
        this.titleElement = ensureElement<HTMLElement>('.card__title', this.container)
        this.priceElement = ensureElement<HTMLElement>('.card__price', this.container)
        this.buttonElement = ensureElement<HTMLButtonElement>('.card__button', this.container)
        this.indexElement = ensureElement<HTMLElement>('.basket__item-index', this.container)
        this.buttonElement.addEventListener('click', () => {
            this.events.emit('basketItem:delete', {id: this.container.dataset.id});
        })
    }

    set title(title: string) {
        this.titleElement.textContent = title;
    }

    set price(price: number | null) {
        this.priceElement.textContent = `${price} синапсов`
    }

    set id(value: string) {
        this.container.dataset.id = value;
    }

    set index(value: number) {
        this.indexElement.textContent = String(value + 1)
    }

    render(data?: Partial<ICardDataRender>): HTMLElement {
        const card = super.render(data).cloneNode(true) as HTMLElement
        const delBtn = ensureElement<HTMLButtonElement>('.card__button', card)
        delBtn.addEventListener('click', () => {
            this.events.emit('basketItem:delete', {id: card.dataset.id});
        })
        return card
    }
}