import {IProduct} from '../../types';
import {ModalView} from './ModalView.ts';
import {EventEmitter} from '../base/Events.ts';
import {ensureElement} from '../../utils/utils.ts';

export class BasketModalView extends ModalView {
    private itemTemplate: HTMLTemplateElement;
    private readonly content: HTMLElement;
    private itemsList: HTMLElement;
    private basketPrice: HTMLElement;
    private orderButton: HTMLButtonElement

    constructor(container: HTMLElement,
                events: EventEmitter,
                basketTemplate: HTMLTemplateElement,
                itemTemplate: HTMLTemplateElement) {
        super(container, events);
        this.content = basketTemplate as HTMLTemplateElement;
        this.itemsList = ensureElement('.basket__list', this.content)
        this.basketPrice = ensureElement('.basket__price', this.content)
        this.itemTemplate = itemTemplate as HTMLTemplateElement;
        this.orderButton = ensureElement('.basket__button', this.content) as HTMLButtonElement;
    }

    updateBasket(products: IProduct | IProduct[], totalPrice: number): void {
        this.itemsList.replaceChildren()
        const items = Array.isArray(products) ? products : [products]
        items.forEach((product, index) => {
            const element = this.itemTemplate?.cloneNode(true) as HTMLElement;

            const indexElement = ensureElement('.basket__item-index', element);
            const titleElement = ensureElement('.card__title', element);
            const priceElement = ensureElement('.card__price', element);
            const dellButton = ensureElement('.basket__item-delete', element) as HTMLButtonElement

            this.orderButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.events.emit('order:open')
            })
            indexElement.textContent = String(index + 1);
            titleElement.textContent = product.title;

            if (product.price === null) {
                priceElement.textContent = 'Бесценно';
            } else {
                priceElement.textContent = `${product.price} синапсов`;
            }

            dellButton.dataset.action = 'basket:remove';
            dellButton.addEventListener('click', (e) => {
                this.events.emit('basket:upd', {e: e, data: {id: product.id}});
            })
            this.itemsList.append(element);
        })
        this.orderButton.disabled = items.length === 0;
        this.basketPrice.textContent = `${totalPrice} синапсов`;
    }

    showModal(): void {
        super.showModal(this.content)
    }
}