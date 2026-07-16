import {Component} from '../base/Component.ts';
import {EventEmitter} from '../base/Events.ts';
import {ensureElement} from '../../utils/utils.ts';
import {IHeaderRender} from '../../types';

export class HeaderView extends Component<IHeaderRender> {
    private basketCounterElement: HTMLElement;
    private basketButtonElement: HTMLButtonElement

    constructor(container: HTMLElement,
                private events: EventEmitter) {
        super(container);
        this.basketCounterElement = ensureElement<HTMLElement>('.header__basket-counter', this.container)
        this.basketButtonElement = ensureElement<HTMLButtonElement>('.header__basket', this.container)

        this.basketButtonElement.addEventListener('click', () => {
            this.events.emit('basketOpenBtn:click')
        })
    }

    set basketCounter(value: number) {
        this.basketCounterElement.textContent = String(value);
    }
}