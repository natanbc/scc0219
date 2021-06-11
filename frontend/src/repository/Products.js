import {ProductBuilder} from '../model/Product.js';

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

    getProducts() {
        return Products._products;
    }
}