import {Component} from '../base/Component.ts';
import {IProduct} from '../../types';
import {categoryMap, CDN_URL} from '../../utils/constants.ts';
import {EventEmitter} from '../base/Events.ts';
import {ensureElement} from '../../utils/utils.ts';

export class CatalogView extends Component<IProduct[]> {
    private cardTemplate: HTMLElement;
    private events: EventEmitter;

    constructor(container: HTMLElement,
                events: EventEmitter,
                cardTemplate: HTMLTemplateElement) {
        super(container);
        this.cardTemplate = cardTemplate;
        this.events = events;
    }

    addCards(products: IProduct | IProduct[]) {
        const items = Array.isArray(products) ? products : [products]
        items.forEach((product) => {
                const element = this.cardTemplate.cloneNode(true) as HTMLElement;

                const buttonElement = element as HTMLButtonElement
                const categoryElement = ensureElement('.card__category', element)
                const titleElement = ensureElement('.card__title', element)
                const imgItemElement = ensureElement('.card__image', element) as HTMLImageElement;
                const priceElement = ensureElement('.card__price', element)

                buttonElement.addEventListener('click', (e) => {
                    e.stopPropagation()
                    this.events.emit('catalogCard:click', {
                        data: product,
                    })
                })

                titleElement.textContent = product.title
                categoryElement.textContent = product.category
                const categoryClass = categoryMap[product.category as keyof typeof categoryMap];
                categoryElement.className = `${categoryClass} card__category`;
                priceElement.textContent = product.price ? `${product.price} синапсов` : 'Бесценно'
                this.setImage(imgItemElement, `${CDN_URL}${product.image}`, product.title);

                this.container.append(element)
            },
        )
    }
}