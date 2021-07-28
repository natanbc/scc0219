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

        let result;
        try {

            if (amountDifference > 0) {
                result = await api.increaseCartAmount(product.id, amountDifference);
            } else if (amountDifference < 0) {
                result = await api.decreaseCartAmount(product.id, Math.abs(amountDifference));
            } else {
                setAmount(newAmount);
                return;
            }

            if(result.ok) {
                setAmount(newAmount);
                return;
            }

            const cart = await api.getCart();
            // @ts-ignore
            setAmount(cart[props.id]);
        } catch (e) {
            window.alert(`Failed to update item amount, due to ${e.name}: ${e.message}`);
        }
    };

    return <div key={product.id} className="row center-align">
        <div className="col s12 m1">
            <img src={product.photo ?? undefined} style={{ maxWidth: 50 }} alt=""/>
        </div>
        <div className="col s12 m4 flow-text">{product.name}</div>
        <div className="col s12 m2 flow-text">{'Price: R$ ' + product.price.toFixed(2)}</div>
        <div className="col s12 m2 input-field">
            <input type="number" value={amount} style={{ maxWidth: 50 }}
                onChange={changeAmount}/>
        </div>
        <div className="col s12 m2 flow-text">{'Total:\n R$ ' + (product.price * amount).toFixed(2)}</div>
        <div className="col s12 m1">
            <button className="btn-flat fillh waves-effect waves-effect-light"
                onClick={() => product.id && props.onRemove(product.id)}>
                <i className="material-icons center">remove_shopping_cart</i>
            </button>
        </div>
    </div>;
}

export interface Props {
    cartItems: CartItem[],
    onRemove: (id: string) => void,
}

export function CartEditTable(props: Props): JSX.Element {

    return <div>
            { props.cartItems.map((product: CartItem) =>
                <CartRow
                    cartItem={product}
                    onRemove={props.onRemove}
                />)
            }
        </div>;
}
