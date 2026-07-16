import {Component} from '../../base/Component.ts';
import {ensureElement} from '../../../utils/utils.ts';
import {categoryMap, CDN_URL} from '../../../utils/constants.ts';
import {ICardDataRender} from '../../../types';

export class Card extends Component<ICardDataRender> {
    private titleElement: HTMLElement;
    private priceElement: HTMLElement;

    private categoryElement: HTMLElement;
    private readonly imgElement: HTMLImageElement;


    constructor(container: HTMLElement) {
        super(container);
        this.titleElement = ensureElement<HTMLElement>('.card__title', this.container)
        this.priceElement = ensureElement<HTMLElement>('.card__price', this.container)

        this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container)
        this.imgElement = ensureElement<HTMLImageElement>('.card__image', this.container)
    }

    set id(value: string) {
        this.container.dataset.id = value;
    }

    set category(category: string) {
        this.categoryElement.textContent = category;
        const categoryClass = categoryMap[category as keyof typeof categoryMap];
        this.categoryElement.className = `${categoryClass} card__category`;
    }

    set price(price: number | null) {
        this.priceElement.textContent = price ? `${price} синапсов`
                                              : 'Бесценно'
    }

    set image(src: string) {
        this.setImage(this.imgElement, `${CDN_URL}${src}`)
    }

    set title(title: string) {
        this.titleElement.textContent = title;
    }
}