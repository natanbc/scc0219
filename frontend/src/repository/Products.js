import {ProductBuilder} from '../model/Product.js';

export const PRODUCTS_STORE = "products";

/**
 * Products repository.
 */
export class Products {
    static _products = [
        new ProductBuilder("Produto 1", "R$ 100,00", 100)
            .withDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum")
            .withPhoto("ddr2-sodimm.jpg")
            .build(),
        new ProductBuilder("Produto 1", "R$ 100,00", 100)
            .withDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum")
            .withPhoto("ddr2-sodimm.jpg")
            .build(),
        new ProductBuilder("Produto 1", "R$ 100,00", 100)
            .withDescription("This is a product")
            .withPhoto("ddr2-sodimm.jpg")
            .build(),
        new ProductBuilder("Produto 1", "R$ 100,00", 100)
            .withDescription("This is a product")
            .withPhoto("ddr2-sodimm.jpg")
            .build(),
        new ProductBuilder("Produto 1", "R$ 100,00", 100)
            .withDescription("This is a product")
            .withPhoto("ddr2-sodimm.jpg")
            .build(),
        new ProductBuilder("Produto 1", "R$ 100,00", 100)
            .withDescription("This is a product")
            .withPhoto("ddr2-sodimm.jpg")
            .build(),
        new ProductBuilder("Produto 1", "R$ 100,00", 100)
            .withDescription("This is a product")
            .withPhoto("ddr2-sodimm.jpg")
            .build(),
        new ProductBuilder("Produto 1", "R$ 100,00", 100)
            .withDescription("This is a product")
            .withPhoto("ddr2-sodimm.jpg")
            .build(),
        new ProductBuilder("Produto 1", "R$ 100,00", 100)
            .withDescription("This is a product")
            .withPhoto("ddr2-sodimm.jpg")
            .build(),
    ];

    constructor(idbDatabase) {
        this._idbDatabase = idbDatabase;
    }

    async create(product) {
        return new Promise((resolve, reject) => {
            const idbTransaction = this._idbDatabase.transaction(PRODUCTS_STORE, "readwrite");
            
            const productStore = idbTransaction.objectStore(PRODUCTS_STORE);
            const idbRequest = productStore.add(product);
            idbRequest.onsuccess = event => {
                product.id = event.target.result;
                resolve(product);
            };
            idbRequest.onerror = event => reject(event.target.error);
        });
    }

    async findById(id) {
        return new Promise((resolve, reject) => {
            const idbTransaction = this._idbDatabase.transaction(PRODUCTS_STORE, "readonly");
            
            const productStore = idbTransaction.objectStore(PRODUCTS_STORE);
            const idbRequest = productStore.get(id);
            idbRequest.onsuccess = event => resolve(event.target.result);
            idbRequest.onerror = event => reject(event.target.error);
        });
    }

    async findByIdRange(startId, count = 20) {
        return new Promise((resolve, reject) => {
            const idbTransaction = this._idbDatabase.transaction(PRODUCTS_STORE, "readwrite");
            
            const productStore = idbTransaction.objectStore(PRODUCTS_STORE);
            const idbRequest = productStore.openCursor(IDBKeyRange.lowerBound(startId));

            let i = 0; 
            const products = [];
            idbRequest.onsuccess = event => {
                const idbCursorWithValue = event.target.result;

                if (i === count || idbCursorWithValue === null) {
                    resolve(products);
                    return;
                }

                products.push(idbCursorWithValue.value);
                i += 1;

                // IMPORTANT: Normal iterators would be too normal for JavaScript.
                // So that's why cursors work in the following completely bizarre way:
                // When you advance the cursor, the original cursor request's
                // success or error events will be called.
                // So this function is called count times or till the cursor ends (ie: null),
                // whichever happens first.
                idbCursorWithValue.continue();
            }

            idbRequest.onerror = event => reject(event.target.error);
        });
    }

    async update(product) {
        return new Promise((resolve, reject) => {
            const idbTransaction = this._idbDatabase.transaction(PRODUCTS_STORE, "readwrite");
            const productStore = idbTransaction.objectStore(PRODUCTS_STORE);
            const idbRequest = productStore.openCursor(IDBKeyRange.only(product.id));

            idbRequest.onsuccess = event => {
                const idbCursorWithValue = event.target.result;
        
                const idbRequest = idbCursorWithValue.update(product)
                idbRequest.onsuccess = event => resolve();
                idbRequest.onerror = event => reject(event.target.error);
            };
            
            idbRequest.onerror = event => reject(event.target.error);
        });
    }

    async delete(id) {
        return new Promise((resolve, reject) => {
            const idbTransaction = this._idbDatabase.transaction(PRODUCTS_STORE, "readwrite");
            
            const productStore = idbTransaction.objectStore(PRODUCTS_STORE);
            const idbRequest = productStore.openCursor(IDBKeyRange.only(id));

            idbRequest.onsuccess = event => {
                const idbCursorWithValue = event.target.result;

                const idbRequest = idbCursorWithValue.delete()
                idbRequest.onsuccess = event => resolve();
                idbRequest.onerror = event => reject(event.target.error);
            };
            
            idbRequest.onerror = event => reject(event.target.error);
        });
    }
}
