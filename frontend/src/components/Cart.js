import CartedProduct from "./CartedProduct";


export function Cart() {
    return <div>
        <div className="row">
            <CartedProduct photo="ddr2-sodimm.jpg" name="Produto 1" price="R$ 100,00" amount="1" />
        </div>
    </div>;
}