import React from 'react';

import { Card, CartItem, CartViewTable } from '../cart';

export interface Props {
    cartItems: CartItem[],
    card: Card,
    address: string,
}

export function ConfirmPanel(props: Props): React.ReactElement {
    return <>
        <div className="row">
            <CartViewTable cartItems={props.cartItems}/>
        </div>
        <div className="row">
            <div className="col">
                <div className="card">
                    <div className="card-content">
                    <span className="card-title">Pay with Credit Card</span>
                    {props.card.number}
                    <span className="right">{props.card.brand}</span>
                    <br/>
                    {props.card.holderName}
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="card">
                    <div className="card-content">
                    <span className="card-title">Shipped by Correios</span>
                    {props.address}
                    <br/>
                    Entrega de 1 a 3 dias.
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <button className="btn waves-effect right">Buy</button>
        </div>
    </>;
}
