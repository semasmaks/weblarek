import {Component} from '../base/Component.ts';
import {IHeader} from '../../types';
import {EventEmitter} from '../base/Events.ts';
import {ensureElement} from '../../utils/utils.ts';

export class HeaderView extends Component<IHeader> {
    private readonly basketCounterElement: HTMLElement;
    private basketButtonElement: HTMLElement;
    private events: EventEmitter

    constructor(container: HTMLElement, events: EventEmitter) {
        super(container);
        this.basketCounterElement = ensureElement('.header__basket-counter', this.container);
        this.basketButtonElement = ensureElement('.header__basket', this.container);
        this.events = events;

        this.basketButtonElement.addEventListener('click', () => {
            this.events.emit('basketModal:open')
        })
    }

    setBasketCounter(num: number) {
        if (this.basketCounterElement) {
            this.basketCounterElement.textContent = num.toString();
        }
    }
}