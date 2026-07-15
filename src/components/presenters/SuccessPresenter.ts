import {Basket} from '../models/Basket.ts';
import {IEmitDefault, IPostOrderResponse} from '../../types';
import {SuccessView} from '../view/SuccesView.ts';
import {EventEmitter} from '../base/Events.ts';

export class SuccessPresenter {
    constructor(private basket: Basket,
                private events: EventEmitter,
                private view: SuccessView) {
    }

    showSuccessWindow(res: IEmitDefault<IPostOrderResponse>) {
        this.view.setStatus(res.data)
        this.view.showModal()
        this.basket.clear()
        this.events.emit('basket:clear')
    }
}