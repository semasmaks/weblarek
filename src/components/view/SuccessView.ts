import {Component} from '../base/Component.ts';
import {ISuccessRender} from '../../types';
import {EventEmitter} from '../base/Events.ts';
import {ensureElement} from '../../utils/utils.ts';

export class SuccessView extends Component<ISuccessRender> {
    private description: HTMLElement
    private successButton: HTMLButtonElement

    constructor(container: HTMLElement,
                private events: EventEmitter) {
        super(container);
        this.description = ensureElement<HTMLElement>('.order-success__description', this.container);
        this.successButton = ensureElement<HTMLButtonElement>('.order-success__close', this.container)
        this.successButton.addEventListener('click', (e) => {
            e.preventDefault()
            this.events.emit('modal:close')
        })
    }

    set total(total: number) {
        this.description.textContent = `Списано ${total.toLocaleString('ru-RU')} синапсов`
    }
}