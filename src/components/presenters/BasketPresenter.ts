import {Basket} from '../models/Basket.ts';
import {BasketModalView} from '../view/BasketModalView.ts';
import {TEmitProduct} from '../../types';

export class BasketPresenter {
    constructor(
        private basket: Basket,
        private view: BasketModalView,
    ) {
    }

    showBasket(): void {
        this.view.updateBasket(this.basket.getItems(), this.basket.getTotalPrice());
        this.view.showModal()
    }

    updateBasket(): void {
        this.view.updateBasket(this.basket.getItems(), this.basket.getTotalPrice());
    }

    deleteItem(res: TEmitProduct): void {
        this.basket.removeItem(res.data);
        this.view.updateBasket(this.basket.getItems(), this.basket.getTotalPrice());
    }
}