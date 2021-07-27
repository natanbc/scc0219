import React from 'react';

import { models } from 'ramranch-lib';

import { Card, CartEditTable, CartItem, CartViewTable, PaymentCardForm } from '../cart';

import * as api from '../../util/backend';
import { AuthUserContext } from '../../Context';
import { Collapsible, CollapsibleItem, FormInput } from '../materialize';
import { ConfirmPanel } from './confirmPanel';

export function CartPage() {
    const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
    const [card, setCard] = React.useState<Card>(new Card());

    const authUserCtx = React.useContext(AuthUserContext);

    const fetchProducts = React.useCallback(async () => {
        const cart = await api.getCart();
        const products = Object.getOwnPropertyNames(cart);

        const productsTmp = await Promise.all(products.map(async (id: any) => {
            const product: models.Product = await api.getProduct(id);

            return { product: product, amount: cart[id] as number };
        }));

        setCartItems(productsTmp);
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

    return <div className="container">
        <Collapsible>
            <CollapsibleItem header="Cart" active={true}>
                <CartEditTable cartItems={cartItems} onRemove={removeProduct}/>
            </CollapsibleItem>
            <CollapsibleItem header="Payment">
                <PaymentCardForm card={card} setCard={setCard}/>
            </CollapsibleItem>
            <CollapsibleItem header="Confirmation">
                <ConfirmPanel address={authUserCtx?.user?.['address'] ?? ''}
                    card={card}
                    cartItems={cartItems}/>
            </CollapsibleItem>
        </Collapsible>
    </div>;
}