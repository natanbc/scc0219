function CardImage(props) {
    return <div className="card-image">
        <img src={props.imageSrc} className="responsive-img" alt=""/>
        <a className="btn-floating halfway-fab waves-effect waves-light orange accent-4"
            href={props.btnHref}
            onClick={props.onClick}>
            <i className="material-icons">{props.btnIcon}</i>
        </a>
    </div>;
}

export default function ProductCard({editable, product, onBuy, onEdit}) {
    return <div className="card">
        <CardImage imageSrc={product.photo}
            btnIcon={ editable ? "edit" : "add_shopping_cart" }
            btnHref={ editable ? "#edit-product" : "/cart" }
            onClick={ editable ? onEdit : onBuy }/>

        <div className="card-content">
            <span className="card-title">
                {product.name}
                <span className="right">{product.price}</span>
            </span>
            <p>
                <span className="activator grey-text text-darken-4">
                    <i className="material-icons right">more_vert</i>
                    <span className="truncate">{product.description}</span>
                </span>
            </p>
        </div>
        <div className="card-reveal">
            <span className="card-title">
                {product.name}
                <i className="material-icons right">close</i>
            </span>
            <ul>
                <li><b>Memory Type:</b> {product.memoryType}</li>
                <li><b>Memory Format:</b> {product.memoryFormat}</li>
                <li><b>Memory Capacity:</b> {product.memoryCapacity}</li>
                <li><b>Memory Frequency:</b> {product.memoryFrequency}</li>
            </ul>
            <p>
                {product.description}
            </p>
            <a className="btn waves-effect waves-light orange accent-4 fillw"
                href={ editable ? "#edit-product" : "/cart" }
                onClick={ editable ? onEdit : onBuy }>
                { editable ? "Edit" : "Buy" }
            </a>
        </div>
    </div>;
}
