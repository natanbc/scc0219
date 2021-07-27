import { models } from 'ramranch-lib';


export * as cartEditTable from './cart/cartEditTable';
export { CartEditTable } from './cart/cartEditTable';

export * as cartPage from './cart/cartPage';
export { CartPage } from './cart/cartPage';

export * as cartViewTable from './cart/cartViewTable';
export { CartViewTable } from './cart/cartViewTable';

export * as paymentCardForm from './cart/paymentCardForm';
export { PaymentCardForm } from './cart/paymentCardForm';


export interface CartItem {
    product: models.Product,
    amount: number,
}

export class Card {
    number: string = '';
    brand: string = '';
    holderName: string = '';
    holderId: string = '';
    securityCode: string = '';
    month: number = 1;
    year: number = 2021;
}

