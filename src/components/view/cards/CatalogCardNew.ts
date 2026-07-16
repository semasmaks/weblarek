import {Card} from './Card.ts';
import {EventEmitter} from '../../base/Events.ts';
import {ICardDataRender} from '../../../types';

export class CatalogCardNew extends Card {
    constructor(container: HTMLElement,
                private events: EventEmitter) {
        super(container);
    }

    render(data?: Partial<ICardDataRender>): HTMLElement {
        const card = super.render(data).cloneNode(true) as HTMLElement;
        card.addEventListener('click', () => {
            this.events.emit('catalogCard:click', {id: card.dataset.id})
        })
        return card
    }
}