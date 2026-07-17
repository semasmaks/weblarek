import {Card} from './Card.ts';
import {EventEmitter} from '../../base/Events.ts';
import {ensureElement} from '../../../utils/utils.ts';
import {categoryMap, CDN_URL} from '../../../utils/constants.ts';

export class CatalogCard extends Card {
    private categoryElement: HTMLElement;
    private readonly imgElement: HTMLImageElement;

    constructor(container: HTMLElement,
                private events: EventEmitter) {
        super(container);
        this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container)
        this.imgElement = ensureElement<HTMLImageElement>('.card__image', this.container)
    }

    set id(id: string) {
        this.container.addEventListener('click', () => {
            this.events.emit('catalogCard:click', {id: id})
        })
    }

    set category(category: string) {
        this.categoryElement.textContent = category;
        const categoryClass = categoryMap[category as keyof typeof categoryMap];
        this.categoryElement.className = `${categoryClass} card__category`;
    }

    set image(src: string) {
        this.setImage(this.imgElement, `${CDN_URL}${src}`)
    }
}