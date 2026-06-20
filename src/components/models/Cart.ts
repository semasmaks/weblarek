import {IProduct} from "../../types";

export class Cart {
    private items: IProduct[] = []

    getItems(): IProduct[] {
        return this.items;
    }

    addItem(item: IProduct | null): void {
        if (item) this.items.push(item);
    }

    removeItem(item: IProduct | null): void {
        if (item) {
            const index = this.items.indexOf(item);
            if (index !== -1) this.items.splice(index, 1);
        }
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