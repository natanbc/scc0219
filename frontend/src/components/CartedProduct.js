function CartedProductImage(props) {
    return <div style={{ marginTop: '0.75rem', maxWidth: '22rem' }}>
        <img src={props.imageSrc} style={{ maxWidth: '100%' }} alt=""/>
    </div>;
}

export default function CartedProduct(props) {
    return <div className="card col">
        <CartedProductImage imageSrc={props.photo}/>

        <div className="card-content">
            <span className="card-title">
                {props.name}
                <span className="right">{props.price}</span>
            </span>
            <div className="card-title">
                Quantidade: {props.amount}
            </div>
        </div>
    </div>;
}
