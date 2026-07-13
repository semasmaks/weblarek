import {Basket} from '../models/Basket.ts';
import {HeaderView} from '../view/HeaderView.ts';

export class HeaderPresenter {
    constructor(
        private basket: Basket,
        private view: HeaderView,
    ) {
    }

    updateBasketCounter() {
        const num = this.basket.getItemsLength()
        this.view.setBasketCounter(num)
    }
}