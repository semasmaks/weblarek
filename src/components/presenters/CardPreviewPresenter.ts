import {Products} from '../models/Products.ts';
import {Basket} from '../models/Basket.ts';
import {CardPreview} from '../view/CardPreview.ts';
import {TEmitProduct} from '../../types';

export class CardPreviewPresenter {
    constructor(private model: Products,
                private basket: Basket,
                private view: CardPreview) {
    }

    openPreview(res: TEmitProduct): void {
        const item = res.data;
        this.model.setSelectedItems(item);
        const isInBasket = this.basket.hasItem(item.id);
        this.view.setActiveCard(item, isInBasket);
        this.view.showModal();
    }

    onActionBtnClick(res: TEmitProduct): void {
        const item = res.data;
        const isInBasket = this.basket.hasItem(item.id);
        this.view.actionBtnEdit(!isInBasket)
        isInBasket ? this.basket.removeItem(item) : this.basket.addItem(item)
    }

    onClose(): void {
        this.model.setSelectedItems(null)
    }
}