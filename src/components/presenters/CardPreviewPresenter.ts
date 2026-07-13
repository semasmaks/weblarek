import {Products} from '../models/Products.ts';
import {Basket} from '../models/Basket.ts';
import {CardPreview} from '../view/CardPreview.ts';
import {IEmitResponse, IResponseDataId} from '../../types';

export class CardPreviewPresenter {
    constructor(private model: Products,
                private basket: Basket,
                private view: CardPreview) {
    }

    openPreview(res: IEmitResponse<IResponseDataId>): void {
        const productId = res.data.id
        const item = this.model.getItemById(productId);
        if (item) {
            this.model.setSelectedItems(item);
            const isInBasket = this.basket.hasItem(item.id);
            this.view.setActiveCard(item, isInBasket);
            this.view.showModal();
        }
    }

    onAction(res: IEmitResponse<IResponseDataId>): void {
        const target = res.e.target as HTMLButtonElement;
        const productId = res.data.id;
        const action = target.dataset.action;
        if (action === 'basket:add') {
            this.view.setBtnActionRemove()
            this.basket.addItem(this.model.getItemById(productId));
        }
        if (action === 'basket:remove') {
            this.view.setBtnActionAdd()
            this.basket.removeItem(this.model.getItemById(productId));
        }
    }

    onClose(): void {
        this.model.setSelectedItems(null)
    }
}