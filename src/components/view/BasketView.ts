import {Component} from '../base/Component.ts';
import {EventEmitter} from '../base/Events.ts';
import {ensureElement} from '../../utils/utils.ts';
import {IBasketRender} from '../../types';

export class BasketView extends Component<IBasketRender> {
    private basketList: HTMLElement;
    private totalPriceElement: HTMLElement;
    private orderButton: HTMLButtonElement;

    constructor(container: HTMLElement,
                private events: EventEmitter,) {
        super(container);
        this.basketList = ensureElement<HTMLElement>('.basket__list', this.container)
        this.totalPriceElement = ensureElement<HTMLElement>('.basket__price', this.container)
        this.orderButton = ensureElement<HTMLButtonElement>('.basket__button', this.container)
        this.orderButton.addEventListener('click', () => {
            this.events.emit('basketSuccessBtn:click')
        })
    }

    set items(items: HTMLElement[]) {
        this.basketList.replaceChildren(...items);
    }
    set totalPrice(value: number) {
        this.totalPriceElement.textContent = `${value} синапсов`;
    }
    set buttonIsDisabled(isDisabled: boolean) {
        this.orderButton.disabled = isDisabled;
    }
}