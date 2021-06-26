function CardImage(props) {
    return <div className="card-image">
        <img src={props.imageSrc}/>
        <a className="btn-floating halfway-fab waves-effect waves-light orange accent-4"
            href={props.btnHref}
            onClick={props.onClick}>
            <i className="material-icons">{props.btnIcon}</i>
        </a>
    </div>;
}

export default function ProductCard(props) {
    return <div className="card">
        <CardImage imageSrc={props.photo}
            btnIcon={ props.editable ? "edit" : "add_shopping_cart" }
            btnHref={ props.editable ? "#edit-product" : "/cart" }
            onClick={ props.editable ? props.onEdit : props.onBuy }/>

        <div className="card-content">
            <span className="card-title">
                {props.name}
                <span className="right">{props.price}</span>
            </span>
            <p>
                <span className="activator grey-text text-darken-4">
                    <i className="material-icons right">more_vert</i>
                    <span className="truncate">{props.description}</span>
                </span>
            </p>
        </div>
        <div className="card-reveal">
            <span className="card-title">
                {props.name}
                <i className="material-icons right">close</i>
            </span>
            <p>
                {props.description}
            </p>
            <a className="btn waves-effect waves-light orange accent-4 fillw"
                href={ props.editable ? "#edit-product" : "/cart" }
                onClick={ props.editable ? props.onEdit : props.onBuy }>
                { props.editable ? "Edit" : "Buy" }
            </a>
        </div>
    </div>;
}
