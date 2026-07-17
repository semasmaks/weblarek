import {EventEmitter} from '../../base/Events.ts';
import {ensureElement} from '../../../utils/utils.ts';
import {Card} from './Card.ts';
import {categoryMap, CDN_URL} from '../../../utils/constants.ts';

export class CardPreview extends Card {
    private descriptionElement: HTMLElement;
    private buttonElement: HTMLButtonElement;
    private categoryElement: HTMLElement;
    private readonly imgElement: HTMLImageElement;

    constructor(container: HTMLElement,
                private events: EventEmitter) {
        super(container);
        this.descriptionElement = ensureElement<HTMLElement>('.card__text', this.container)
        this.buttonElement = ensureElement<HTMLButtonElement>('.card__button', this.container)
        this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container)
        this.imgElement = ensureElement<HTMLImageElement>('.card__image', this.container)
        this.buttonElement.addEventListener('click', () => {
            this.events.emit('previewActinBtn:click')
        })
    }

    set description(description: string) {
        this.descriptionElement.textContent = description
    }

    set buttonText (text: string) {
        this.buttonElement.textContent = text;
    }

    set buttonIsDisabled (isDisabled: boolean) {
        this.buttonElement.disabled = isDisabled;
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