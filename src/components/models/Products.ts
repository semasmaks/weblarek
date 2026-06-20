import {IProduct} from "../../types";

export class Products {
    private items: IProduct[] = [];
    private selectedItems: IProduct | null = null;

    setItems(items: IProduct[]): void {
        this.items = items;
    }

    setSelectedItems(item: IProduct | null): void {
        this.selectedItems = item;
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