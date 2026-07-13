import {IProduct} from '../../types';
import {categoryMap, CDN_URL} from '../../utils/constants.ts';
import {ModalView} from './ModalView.ts';
import {EventEmitter} from '../base/Events.ts';

export class CardPreview extends ModalView {
    private readonly content: HTMLElement;
    private readonly imgElement: HTMLImageElement | null;
    private readonly categoryElement: HTMLElement | null;
    private readonly titleElement: HTMLElement | null;
    private readonly descriptionElement: HTMLElement | null;
    private readonly actionButton: HTMLButtonElement | null;
    private readonly priceElement: HTMLElement | null;

    constructor(container: HTMLElement,
                events: EventEmitter,
                itemPreviewTemplate: HTMLTemplateElement) {
        super(container, events);
        this.content = itemPreviewTemplate as HTMLElement;
        this.imgElement = this.content.querySelector('.card__image') as HTMLImageElement;
        this.categoryElement = this.content.querySelector('.card__category')
        this.titleElement = this.content.querySelector('.card__title')
        this.descriptionElement = this.content.querySelector('.card__text')
        this.actionButton = this.content.querySelector('.card__button') as HTMLButtonElement;
        this.priceElement = this.content.querySelector('.card__price')
        this.actionButton.addEventListener('click', (e) => {
            this.events.emit('basket:upd', {
                e: e,
                data: {id: this.actionButton?.dataset.id},
            })
        })
    }

    setActiveCard(product: IProduct, inBasket: boolean = false): void {
        if (this.imgElement) this.setImage(this.imgElement, `${CDN_URL}${product.image}`, product.title);
        if (this.categoryElement) {
            this.categoryElement.textContent = product.category
            for (const key in categoryMap) {
                if (key === product.category) {
                    this.categoryElement.classList.add(categoryMap[key as keyof typeof categoryMap]);
                }
            }
        }
        if (this.titleElement) this.titleElement.textContent = product.title;
        if (this.descriptionElement) this.descriptionElement.textContent = product.description;
        if (this.priceElement) {
            if (!inBasket) {
                if (product.price === null) {
                    this.priceElement.textContent = 'Бесценно';

                } else {
                    this.priceElement.textContent = `${product.price} синапсов`;
                }
            }
        }
        if (this.actionButton) {

            if (product.price === null) {
                this.actionButton.textContent = 'Недоступно';
                this.actionButton.disabled = true;
                this.actionButton.dataset.avaliable = ''
                this.actionButton.dataset.productId = product.id;
            } else if (inBasket) {
                this.actionButton.textContent = 'Удалить из корзины';
                this.actionButton.disabled = false;
                this.actionButton.dataset.action = 'basket:remove';
                this.actionButton.dataset.id = product.id;
            } else {
                this.actionButton.textContent = 'Купить';
                this.actionButton.disabled = false;
                this.actionButton.dataset.action = 'basket:add'
                this.actionButton.dataset.id = product.id;
            }
        }
    }

    setBtnActionAdd() {
        if (this.actionButton) {
            this.actionButton.dataset.action = 'basket:add';
            this.actionButton.textContent = 'Купить';
        }
    }

    setBtnActionRemove() {
        if (this.actionButton) {
            this.actionButton.dataset.action = 'basket:remove';
            this.actionButton.textContent = 'Удалить из корзины';
        }
    }

    showModal()
        :
        void {
        super.showModal(this.content);

    }
}