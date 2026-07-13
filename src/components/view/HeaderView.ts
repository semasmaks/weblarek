import {Component} from '../base/Component.ts';
import {IHeader} from '../../types';
import {EventEmitter} from '../base/Events.ts';

export class HeaderView extends Component<IHeader> {
    basketCounterElement: HTMLElement | null;
    basketButtonElement: HTMLElement | null;
    events: EventEmitter

    constructor(container: HTMLElement, events: EventEmitter) {
        super(container);
        this.basketCounterElement = container.querySelector('.header__basket-counter');
        this.basketButtonElement = container.querySelector('.header__basket');
        this.events = events;

        this.basketButtonElement?.addEventListener('click', () => {
            this.events.emit('basket:open')
        })
    }

    setBasketCounter(num: number) {
        if (this.basketCounterElement) {
            this.basketCounterElement.textContent = num.toString();
        }
    }
}