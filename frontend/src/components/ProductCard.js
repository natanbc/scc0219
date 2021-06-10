function CardImage(props) {
    return <div className="card-image">
        <img src={props.imageSrc}/>
        <a className="btn-floating halfway-fab waves-effect waves-light red">
            <i className="material-icons">add_shopping_cart</i>
        </a>
    </div>;
}

export function ProductCard(props) {
    return <div className="card">
        <CardImage imageSrc={props.photo}></CardImage> 
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
        </div>
    </div>;
}