import {Basket} from '../models/Basket.ts';
import {IOrderResponse} from '../../types';
import {SuccessView} from '../view/SuccesView.ts';
import {EventEmitter} from '../base/Events.ts';

export class SuccessPresenter {
    constructor(private basket: Basket,
                private events: EventEmitter,
                private view: SuccessView) {
    }

    onResponseOK(res: IOrderResponse) {
        this.view.setStatus(res)
        this.view.showModal()
        this.basket.clear()
        this.events.emit('basket:clear')
    }
}