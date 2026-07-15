import {IProduct} from '../../types';
import {categoryMap, CDN_URL} from '../../utils/constants.ts';
import {ModalView} from './ModalView.ts';
import {EventEmitter} from '../base/Events.ts';
import {ensureElement} from '../../utils/utils.ts';

export class CardPreview extends ModalView {
    private readonly content: HTMLElement;
    private readonly imgElement: HTMLImageElement;
    private readonly categoryElement: HTMLElement;
    private readonly titleElement: HTMLElement;
    private readonly descriptionElement: HTMLElement;
    private actionButton: HTMLButtonElement;
    private readonly priceElement: HTMLElement;

    constructor(container: HTMLElement,
                events: EventEmitter,
                itemPreviewTemplate: HTMLTemplateElement) {
        super(container, events);
        this.content = itemPreviewTemplate as HTMLElement;
        this.imgElement = ensureElement('.card__image', this.content) as HTMLImageElement;
        this.categoryElement = ensureElement('.card__category', this.content)
        this.titleElement = ensureElement('.card__title', this.content)
        this.descriptionElement = ensureElement('.card__text', this.content)
        this.actionButton = ensureElement('.card__button', this.content) as HTMLButtonElement;
        this.priceElement = ensureElement('.card__price', this.content)

    }

    setActiveCard(product: IProduct, isInBasket: boolean): void {
        this.setImage(this.imgElement, `${CDN_URL}${product.image}`, product.title);
        this.categoryElement.textContent = product.category
        for (const key in categoryMap) {
            if (key === product.category) {
                this.categoryElement.classList.add(categoryMap[key as keyof typeof categoryMap]);
            }
        }
        this.titleElement.textContent = product.title;
        this.descriptionElement.textContent = product.description;
        this.priceElement.textContent = product.price ? `${product.price} синапсов` : 'Бесценно'

        const newButton = this.actionButton.cloneNode(true) as HTMLButtonElement;
        this.actionButton.replaceWith(newButton);
        this.actionButton = newButton;
        this.actionButton.addEventListener('click', () => {
            this.events.emit('addToCardBtn:click', {
                data: product,
            })
        })
        if (!product.price) {
            this.actionButton.textContent = 'Недоступно'
            this.actionButton.disabled = true
        } else {
            this.actionBtnEdit(isInBasket)
            this.actionButton.disabled = false
        }
    }

    actionBtnEdit(isInBasket: boolean): void {
        this.actionButton.textContent = isInBasket ? 'Удалить из корзины' : 'Купить'
    }

    showModal(): void {
        super.showModal(this.content);
    }
}