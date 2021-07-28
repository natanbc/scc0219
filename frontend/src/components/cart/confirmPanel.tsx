import React from 'react';

import { Card, CartItem, CartViewTable } from '../cart';
import {finishPurchase} from "../../util/backend";
import {RouteContext} from "../../Context";

export interface Props {
    cartItems: CartItem[],
    card: Card,
    address: string,
}

function isValidCard(card: Card): boolean {
    //card number is a 16 digit number
    if(!card.number || card.number.replace(/[^\d]/g, "").length !== 16) return false;
    //card brand not empty
    if(!card.brand || card.brand.trim().length === 0) return false;
    //holder name not empty
    if(!card.holderName || card.holderName.trim().length === 0) return false;
    //holder id is a 9 or 10 digit number
    if(!card.holderId || ![9, 10].includes(card.holderId.replace(/[^\d]/g, "").length)) return false;
    //security code is a 3 or 4 digit number
    if(!card.securityCode || ![3, 4].includes(card.securityCode.trim().length)) return false;
    //not expired
    const now = new Date();
    if(card.year < now.getFullYear()) return false;
    if(card.year === now.getFullYear() && card.month < now.getMonth()) return false;
    return true;
}

export function ConfirmPanel(props: Props): React.ReactElement {
    const buyButtonClass = "btn waves-effect right" + (
        props.cartItems.length > 0 && isValidCard(props.card) ? "" : " disabled"
    );
    const routeCtx = React.useContext(RouteContext);
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
            <button className={buyButtonClass} onClick={(event) => {
                event.preventDefault();
                finishPurchase(props.card).then(r => {
                    if(r.ok) {
                        alert("Purchase successful");
                        window.history.pushState({}, "RAM Ranch", "/products");
                        routeCtx.setLocation({...window.location});
                        return;
                    }
                    alert("Purchase failed: " + r.message);
                    window.history.pushState({}, "RAM Ranch", "/cart");
                    routeCtx.setLocation({...window.location});
                }).catch(e => {
                    console.log("req err", e);
                    alert("Purchase failed");
                    window.history.pushState({}, "RAM Ranch", "/cart");
                    routeCtx.setLocation({...window.location});
                });
            }}>Buy</button>
        </div>
    </>;
}
