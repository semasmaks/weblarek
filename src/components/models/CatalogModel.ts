import {IProduct} from '../../types';
import {EventEmitter} from '../base/Events.ts';

export class CatalogModel {
    private items: IProduct[] = [];
    private selectedItems: IProduct | null = null;

    constructor(private events: EventEmitter) {
    }

    setItems(items: IProduct[]): void {
        this.items = items;
    }

    setSelectedItems(item: IProduct | null): void {
        this.selectedItems = item;
        item ? this.events.emit('catalog:activeItemSet')
             : this.events.emit('catalog:activeItemRemove')
    }

    getItemById(id: string): IProduct | null {
        return this.items.find((item: IProduct) => item.id === id) ?? null;
    }

    getSelectedItem(): IProduct | null {
        return this.selectedItems;
    }

    getAllItems(): IProduct[] {
        return this.items;
    }
}