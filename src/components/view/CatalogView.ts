import {Component} from '../base/Component.ts';
import {IProduct} from '../../types';
import {categoryMap, CDN_URL} from '../../utils/constants.ts';
import {EventEmitter} from '../base/Events.ts';

export class CatalogView extends Component<IProduct[]> {
    private cardTemplate: HTMLElement;
    private events: EventEmitter;

    constructor(container: HTMLElement, events: EventEmitter, cardTemplate: HTMLTemplateElement) {
        super(container);
        this.cardTemplate = cardTemplate;
        this.events = events;
    }

    addCards(products: IProduct | IProduct[]) {
        const items = Array.isArray(products) ? products : [products]
        items.forEach((product) => {
                const element = this.cardTemplate.cloneNode(true) as HTMLElement;

                const buttonElement = element as HTMLButtonElement
                const categoryElement = element.querySelector('.card__category')
                const titleElement = element.querySelector('.card__title')
                const imgItemElement = element.querySelector('.card__image') as HTMLImageElement;
                const priceElement = element.querySelector('.card__price')

                buttonElement.dataset.id = product.id;
                buttonElement.addEventListener('click', (e) => {
                    e.stopPropagation()
                    this.events.emit('catalog:click', {
                        e: e,
                        data: {id: product.id},
                    })
                })

                if (titleElement) titleElement.textContent = product.title
                if (categoryElement) {
                    categoryElement.textContent = product.category
                    const categoryClass = categoryMap[product.category as keyof typeof categoryMap];
                    if (categoryClass) {
                        categoryElement.className = `${categoryClass} card__category`;
                    }
                }
                if (priceElement) {
                    if (product.price === null) {
                        priceElement.textContent = 'Бесценно';
                    } else {
                        priceElement.textContent = `${product.price} синапсов`;
                    }
                }
                if (imgItemElement) this.setImage(imgItemElement, `${CDN_URL}${product.image}`, product.title);

                element.dataset.productId = product.id;
                this.container.append(element)

            },
        )
    }
}