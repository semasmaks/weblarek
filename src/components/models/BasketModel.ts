import {IProduct} from '../../types';
import {EventEmitter} from '../base/Events.ts';

export class BasketModel {
    private items: IProduct[] = []

    constructor(private events: EventEmitter) {}

    getItems(): IProduct[] {
        return this.items;
    }

    addItem(item: IProduct | null): void {
        if (item) this.items.push(item);
        this.events.emit('basket:update');
    }

    removeItem(item: IProduct | null): void {
        if (item) {
            const index = this.items.indexOf(item);
            if (index !== -1) this.items.splice(index, 1);
        }
        this.events.emit('basket:update')
    }

    clear(): void {
        this.items = [];
        this.events.emit('basket:update')
    }

    getTotalPrice(): number {
        return this.items.reduce((acc: number, item: IProduct): number => {
            if (item.price) {
                acc += +item.price
            }
            return acc
        }, 0)
    }

    getItemsLength(): number {
        return this.items.length;
    }

    hasItem(id: string): boolean {
        return this.items.some(item => item.id === id)
    }
}