import React from "react";
import * as api from "../util/backend";
import {AuthUserContext, RouteContext} from "../Context";
import { Collapsible, CollapsibleItem, FormInput } from "./Materialize";

function CartItem(props: any) {

    const [amount, setAmount] = React.useState<number>(props.amount);

    const changeAmount = async function (event: React.ChangeEvent<HTMLInputElement>) {

        const newAmount: number = event.target.valueAsNumber;
        const amountDifference: number = newAmount - amount;

        try {
            let result;
            if (amountDifference > 0) {
                result = await api.increaseCartAmount(props.id, amountDifference);
            } else if (amountDifference < 0) {
                result = await api.decreaseCartAmount(props.id, Math.abs(amountDifference));
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

    return <div key={props.id} className="row center-align">
        <div className="col s12 m1">
            <img src={props.photo} style={{ maxWidth: 50 }} alt=""/>
        </div>
        <div className="col s12 m4 flow-text">{props.name}</div>
        <div className="col s12 m2 flow-text">{'Price: R$ ' + props.price.toFixed(2)}</div>
        <div className="col s12 m2 input-field">
            <input type="number" value={amount} style={{ maxWidth: 50 }}
                onChange={changeAmount}/>
        </div>
        <div className="col s12 m2 flow-text">{'Total:\n R$ ' + (props.price * amount).toFixed(2)}</div>
        <div className="col s12 m1">
            <button className="btn-flat fillh waves-effect waves-effect-light"
                onClick={() => props.onRemove(props.id)}>
                <i className="material-icons center">remove_shopping_cart</i>
            </button>
        </div>
    </div>;
}

class Card {
    number: string = '';
    brand: string = '';
    holderName: string = '';
    holderId: string = '';
    securityCode: string = '';
    month: number = 1;
    year: number = 2021;
}

export default function CartPage() {
    const [productCards, setProductCards] = React.useState<Object[]>([]);
    const [card, setCard] = React.useState<Card>(new Card());

    const authUserCtx = React.useContext(AuthUserContext);
    const routeCtx = React.useContext(RouteContext);

    const fetchProducts = React.useCallback(async () => {
        if(!api.isLoggedIn()) {
            window.history.pushState({}, "RAM Ranch", "/signin");
            routeCtx.setLocation({...window.location});
            return;
        }
        const cart = await api.getCart();
        const products = Object.getOwnPropertyNames(cart);

        const productCardsTmp = await Promise.all(products.map(async (id: any) => {
            const product: any = await api.getProduct(id);

            return <CartItem
                    id={product['id']}
                    photo={product['photo']}
                    name={product['name']}
                    price={product['price']}
                    amount={cart[id]}
                    onRemove={removeProduct}
                />;
        }));

        setProductCards(productCardsTmp);
    }, [authUserCtx.user]);

    const removeProduct = async function(id: any) {
        try
        {
            await api.removeFromCart(id);
            await fetchProducts();
        }
        catch(e)
        {
            window.alert(`Failed to remove from cart, due to ${e.name}: ${e.message}`);
        }
    };

    React.useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const cartItemTable = <div>{ productCards }</div>

    const paymentForm =
        <form>
            <div className="row">
                <FormInput name="cardNumber" type="text" value={card.number}
                    wrapperClass="col s10"
                    onChange={e => setCard({...card, number: e.target.value})}>
                    Card Number
                </FormInput>
                <FormInput name="cardBrand" type="text" value={card.brand}
                    wrapperClass="col s2"
                    onChange={e => setCard({...card, brand: e.target.value})}>
                    Card Brand
                </FormInput>
            </div>
            <div className="row">
                <FormInput name="cardHolderName" type="text" value={card.holderName}
                    wrapperClass="col s12"
                    onChange={e => setCard({...card, holderName: e.target.value})}>
                    Card Holder Full Name
                </FormInput>
            </div>
            <div className="row">
                <FormInput name="cardHolderId" type="text" value={card.holderId}
                    wrapperClass="col s10"
                    onChange={e => setCard({...card, holderId: e.target.value})}>
                    Card Holder CPF/CNPJ
                </FormInput>
                <FormInput name="securityCode" type="text" value={card.securityCode}
                    wrapperClass="col s2"
                    onChange={e => setCard({...card, securityCode: e.target.value})}>
                    Security Code
                </FormInput>
            </div>
            <div className="row">
                <FormInput name="expirationMonth" type="number" value={card.month}
                    min="1" max="12" wrapperClass="col s2"
                    onChange={e => setCard({...card, month: e.target.valueAsNumber})}>
                    Expiration Month
                </FormInput>
                <FormInput name="expirationYear" type="number" value={card.year}
                    min="2021" wrapperClass="col s2"
                    onChange={e => setCard({...card, year: e.target.valueAsNumber})}>
                    Expiration Year
                </FormInput>
            </div>
        </form>;

    const confirmation =
        <>
            <div className="row">
                {cartItemTable}
            </div>
            <div className="row">
                <div className="col">
                    <div className="card">
                        <div className="card-content">
                        <span className="card-title">Pay with Credit Card</span>
                        {card.number}
                        <span className="right">{card.brand}</span>
                        <br/>
                        {card.holderName}
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <div className="card-content">
                        <span className="card-title">Shipped by Correios</span>
                        {authUserCtx?.user?.['address']}
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


    return <div className="container">
        <Collapsible>
            <CollapsibleItem header="Cart" active={true}>
                {cartItemTable}
            </CollapsibleItem>
            <CollapsibleItem header="Payment">
                {paymentForm}
            </CollapsibleItem>
            <CollapsibleItem header="Confirmation">
                {confirmation}
            </CollapsibleItem>
        </Collapsible>
    </div>;
}
