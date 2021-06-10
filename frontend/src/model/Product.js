export class Product {
    static nextId = 0;

    constructor(name, price, amountAvailable) {
        this._id = Product.nextId;
        this.name = name;
        this.price = price;
        this.amountAvailable = amountAvailable;

        Product.nextId++;
    }

    get id() {
        return this._id;
    }
}

/**
 * Fluent builder because product has too many parameters.
 */
export class ProductBuilder {
    constructor(name, price, amountAvailable) {
        this._product = new Product(name, price, amountAvailable);
    }
    
    build() {
        return this._product;
    }

    withAmountAvailable(value) {
        this._product.amountAvailable = value; 
        return this;
    }

    withAmountSold(value) {
        this._product.amountSold = value;
        return this;
    }

    withDescription(value) {
        this._product.description = value;
        return this;
    }

    withPhoto(value) {
        this._product.photo = value;
        return this;
    }

    withPrice(value) {
        this._product.price = value;
        return this;
    }

    withMemoryType(value) {
        this._product.memoryType = value;
        return this;
    }

    withMemoryFormat(value) {
        this._product.memoryFormat = value;
        return this;
    }

    withMemoryCapacity(value) {
        this._product.memoryCapacity = value;
        return this;
    }

    withMemoryFrequency(value) {
        this._product.memoryFrequency = value;
        return this;
    }
}