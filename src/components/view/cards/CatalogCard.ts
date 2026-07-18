import {Card} from './Card.ts';
import {ensureElement} from '../../../utils/utils.ts';
import {categoryMap} from '../../../utils/constants.ts';

export class CatalogCard extends Card {
    private categoryElement: HTMLElement;
    private readonly imgElement: HTMLImageElement;

    constructor(container: HTMLElement,
                onClick: () => void,) {
        super(container);
        this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container)
        this.imgElement = ensureElement<HTMLImageElement>('.card__image', this.container)
        this.container.addEventListener('click', onClick)
    }

    set category(category: string) {
        this.categoryElement.textContent = category;
        const categoryClass = categoryMap[category as keyof typeof categoryMap];
        this.categoryElement.className = `${categoryClass} card__category`;
    }

    set image(src: string) {
        this.setImage(this.imgElement, src)
    }
}