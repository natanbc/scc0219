import React from "react";
import * as api from "../util/backend";
import {AuthUserContext} from "../Context";


function CartItem(props: any) {

    const [amount, setAmount] = React.useState<number>(props.amount);

    const changeAmount = async function (event: React.ChangeEvent<HTMLInputElement>) {

        const newAmount: number = event.target.valueAsNumber;
        const amountDifference: number = newAmount - amount;

        try {

            if (amountDifference > 0) {
                for(let i = 0; i < amountDifference; i++) {
                    await api.increaseCartAmount(props.id);
                }
            } else if (amountDifference < 0) {
                for(let i = 0; i < Math.abs(amountDifference); i++) {
                    await api.decreaseCartAmount(props.id);
                }
            }
        } catch (e) {
            window.alert(`Failed to update item amount, due to ${e.name}: ${e.message}`);
        }

        setAmount(newAmount);
    };

    return <tr key={props.id}>
        <td>
            <img src={props.photo} style={{ maxWidth: 50 }} alt=""/>
        </td>
        <td>{props.name}</td>
        <td>{'R$ ' + props.price.toFixed(2)}</td>
        <td className="input-field">
            <input type="number" value={amount} style={{ maxWidth: 50 }}
                onChange={changeAmount}/>
        </td>
        <td>{'R$ ' + (props.price * amount).toFixed(2)}</td>
        <td>
            <button className="btn-flat fillh waves-effect waves-effect-light"
                onClick={() => props.onRemove(props.id)}>
                <i className="material-icons center">remove_shopping_cart</i>
            </button>
        </td>
    </tr>;
}

export default function CartPage() {
    const [productCards, setProductCards] = React.useState<Object[]>([]);

    const authUserCtx = React.useContext(AuthUserContext);


    const fetchProducts = React.useCallback(async () => {
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

    return <div className="container">
        <div className="card">
            <table>
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
                    { productCards }
                </tbody>
            </table>
        </div>

    </div>;
}
