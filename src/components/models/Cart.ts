import {IProduct} from "../../types";

export class Cart {
    items: IProduct[] = []

    getItems(): IProduct[] {
        return this.items;
    }

    addItem(item: IProduct): void {
        this.items.push(item);
    }

    removeItem(item: IProduct): void {
        this.items.splice(this.items.indexOf(item), 1);
    }

    clear(): void {
        this.items = [];
    }

    getTotalPrice(): number {
        return this.items.reduce((acc: number, cur: IProduct): number => {
            if (cur.price) {
                acc += +cur.price
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