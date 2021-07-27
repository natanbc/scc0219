import React from 'react';

import { CartItem } from '../cart';

import * as api from '../../util/backend';

interface CartRowProps {
    cartItem: CartItem,
}

function CartRow(props: CartRowProps): JSX.Element {

    const product = props.cartItem.product;
    const amount = props.cartItem.amount;

    return <tr key={product.id}>
        <td>
            { product.photo != null &&
                <img src={product.photo} style={{ maxWidth: 50 }} alt=""/>
            }
        </td>
        <td>{product.name}</td>
        <td>{'R$ ' + product.price.toFixed(2)}</td>
        <td>{amount}</td>
        <td>{'R$ ' + (product.price * amount).toFixed(2)}</td>
    </tr>;
}

export interface CartViewTableProps {
    cartItems: CartItem[],
}

export function CartViewTable(props: CartViewTableProps): JSX.Element {

    return <table>
            <thead>
                <tr>
                    <th></th>
                    <th>Product</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                </tr>
            </thead>
            <tbody>
                { props.cartItems.map((product: CartItem) =>
                    <CartRow cartItem={product}/>)
                }
            </tbody>
        </table>;
}
