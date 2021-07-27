import ow from 'ow';

export class Product {
    public id: string | null = null;
    public name: string;
    public price: number;
    public amountSold: number;
    public amountAvailable: number;
    public photo: string | null = null;
    public description: string | null = null;
    public memoryType: string | null = null;
    public memoryFormat: string | null = null;
    public memoryCapacity: string | null = null;
    public memoryFrequency: string | null = null;

    public static tryFrom(source: any): Product {
        ow(source, ow.object.partialShape({
            id: ow.any(ow.string, ow.nullOrUndefined),
            name: ow.string,
            price: ow.number,
            amountSold: ow.number,
            amountAvailable: ow.number,
            photo: ow.any(ow.string, ow.nullOrUndefined),
            description: ow.any(ow.string, ow.nullOrUndefined),
            memoryCapacity: ow.any(ow.string, ow.nullOrUndefined),
            memoryFormat: ow.any(ow.string, ow.nullOrUndefined),
            memoryFrequency: ow.any(ow.string, ow.nullOrUndefined),
            memoryType: ow.any(ow.string, ow.nullOrUndefined),
        }));

        return new ProductBuilder(source.name, source.price, source.amountAvailable)
            .withAmountSold(source.amountSold)
            .withDescription(source.description ?? null)
            .withMemoryCapacity(source.memoryCapacity ?? null)
            .withMemoryFormat(source.memoryFormat ?? null)
            .withMemoryFrequency(source.memoryFrequency ?? null)
            .withMemoryType(source.memoryType ?? null)
            .withPhoto(source.photo ?? null)
            .build();
    }

    public constructor(name: string, price: number, amountAvailable: number) {
        // Id is only set when saved to repository.
        this.name = name;
        this.price = price;
        this.amountAvailable = amountAvailable;
        this.amountSold = 0;
    }
}

/**
 * Fluent builder because product has too many parameters.
 */
export class ProductBuilder {
    private product: Product;

    public constructor(name: string, price: number, amountAvailable: number) {
        this.product = new Product(name, price, amountAvailable);
    }

    public build() {
        return this.product;
    }

    public withAmountSold(value: number) {
        this.product.amountSold = value;
        return this;
    }

    public withDescription(value: string | null) {
        this.product.description = value;
        return this;
    }

    public withPhoto(value: string | null) {
        this.product.photo = value;
        return this;
    }

    public withMemoryType(value: string | null) {
        this.product.memoryType = value;
        return this;
    }

    public withMemoryFormat(value: string | null) {
        this.product.memoryFormat = value;
        return this;
    }

    public withMemoryCapacity(value: string | null) {
        this.product.memoryCapacity = value;
        return this;
    }

    public withMemoryFrequency(value: string | null) {
        this.product.memoryFrequency = value;
        return this;
    }
}
