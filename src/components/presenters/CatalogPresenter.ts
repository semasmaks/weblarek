import {Products} from '../models/Products.ts';
import {CatalogView} from '../view/CatalogView.ts';
import {IProduct} from '../../types';

export class CatalogPresenter {
    constructor(private model: Products,
                private view: CatalogView) {
    }

    renderCatalog(items: IProduct[]) {
        this.model.setItems(items)
        this.view.addCards(this.model.getAllItems());
    }


}