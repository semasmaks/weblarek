import {Component} from './Component.ts';
import {IHeader} from '../../types';

export class HeaderView extends Component<IHeader> {
    basketCounterElement: HTMLElement | null;
    constructor(container: HTMLElement) {
        super(container);
        this.basketCounterElement = container.querySelector('.header__basket-counter');
    }

    setBasketCounter (num: number) {
        if (this.basketCounterElement) {
            this.basketCounterElement.textContent = num.toString();
        }
    }
}