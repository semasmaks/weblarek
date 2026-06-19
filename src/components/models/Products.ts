import {IProduct} from "../../types";

export class Products {
    private _products: IProduct[] = [];
    private _selectedProduct: IProduct | null | undefined;

    setProducts(products: IProduct[]): void {
        this._products = products;
    }

    setSelectedProduct(selectedProduct: IProduct): void {
        this._selectedProduct = selectedProduct;
    }

    getProductById(id: string): IProduct {
        const product = this._products.find((product: IProduct) => product.id === id);
        if (!product) {
            throw new Error('Product not found');
        }
        return product
    }

    getSelectedProduct(): IProduct {
        const product = this._selectedProduct;
        if (!product) {
            throw new Error('Product was not selected');
        }
        return product
    }

    getAllProducts(): IProduct[] {
        return this._products;
    }
}