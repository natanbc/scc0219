import React from 'react';

import { CartItem } from '../cart';

import * as api from '../../util/backend';

interface CartRowProps {
    cartItem: CartItem,
    onRemove: (id: string) => void,
}

function CartRow(props: CartRowProps): JSX.Element {

    const product = props.cartItem.product;

    const [amount, setAmount] = React.useState<number>(props.cartItem.amount);

    const changeAmount = async function (event: React.ChangeEvent<HTMLInputElement>) {

        if (product.id == null) return;

        const newAmount: number = event.target.valueAsNumber;
        const amountDifference: number = newAmount - amount;

        try {

            if (amountDifference > 0) {
                for(let i = 0; i < amountDifference; i++) {
                    await api.increaseCartAmount(product.id);
                }
            } else if (amountDifference < 0) {
                for(let i = 0; i < Math.abs(amountDifference); i++) {
                    await api.decreaseCartAmount(product.id);
                }
            }
        } catch (e) {
            window.alert(`Failed to update item amount, due to ${e.name}: ${e.message}`);
        }

        setAmount(newAmount);
    };


    return <tr key={product.id}>
        <td>
            <img src={product.photo ?? undefined} style={{ maxWidth: 50 }} alt=""/>
        </td>
        <td>{product.name}</td>
        <td>{'R$ ' + product.price.toFixed(2)}</td>
        <td className="input-field">
            <input type="number" value={amount} style={{ maxWidth: 50 }}
                onChange={changeAmount}/>
        </td>
        <td>{'R$ ' + (product.price * amount).toFixed(2)}</td>
        <td>
            <button className="btn-flat fillh waves-effect waves-effect-light"
                onClick={() => product.id && props.onRemove(product.id)}>
                <i className="material-icons center">remove_shopping_cart</i>
            </button>
        </td>
    </tr>;
}

export interface Props {
    cartItems: CartItem[],
    onRemove: (id: string) => void,
}

export function CartEditTable(props: Props): JSX.Element {

    return <table>
            <thead>
                <tr>
                    <th></th>
                    <th>Product</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                { props.cartItems.map((product: CartItem) =>
                    <CartRow
                        cartItem={product}
                        onRemove={props.onRemove}
                    />)
                }
            </tbody>
        </table>;
}
