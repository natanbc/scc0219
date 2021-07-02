import React from "react";
import M from 'materialize-css';
import { MemoryType, MemoryFormat, MemoryFrequency, MemoryCapacity } from '../model/MemoryInfo';

import { RouteContext } from '../Context';
import { FormInput, Select, TextArea } from './Materialize';

export default function ProductEditModal(props) {
    const [modal, setModal] = React.useState(null);
    const [product, setProduct] = React.useState(props.product);

    const routeCtx = React.useContext(RouteContext);
    const modalRef = React.createRef();
    React.useEffect(() => {
        if (modal === null) {
            const modal = new M.Modal(modalRef.current, {});
            const baseClose = modal.close;
            modal.close = function(trigger) {
                baseClose.apply(this, trigger);
                window.location.hash = "";
                routeCtx.setLocation({...window.location});
                props.onClose();
            }
            modal.open();
            setModal(modal);
        }
    }, [modal, modalRef, props]);

    const submit = () => {
        // TODO: Error handling
        if (props.isNew) {
            props.productsRepo.create(product);
        } else {
            props.productsRepo.update(product);
        }
        modal.close();
    };

    return <form ref={modalRef} id={props.id} className="modal">
        <div className="modal-content">
            <FormInput name="name" type="text"
                value={product.name} onChange={(event) =>
                    setProduct({ ...product, name: event.target.value })
                }>
                Name
            </FormInput>
            <TextArea name="description"
                value={product.description}
                onChange={(event) => setProduct({ ...product, description: event.target.value })}>
                Description</TextArea>
            <FormInput name="price" type="text"
                value={product.price} onChange={(event) =>
                    setProduct({ ...product, price: event.target.value })
                }>
                Price</FormInput>
            <FormInput name="amount-available" type="number"
                value={product.amountAvailable} onChange={(event) =>
                    setProduct({ ...product, amountAvailable: event.target.value })
                }>
                Amount Available</FormInput>
            <FormInput name="amount-sold" type="number"
                value={product.amountSold} onChange={(event) =>
                    setProduct({ ...product, amountSold: event.target.value })
                }>
                Amount Sold</FormInput>

            <Select name="memory-type" values={MemoryType}
                value={product.memoryType}
                onChange={(event) => setProduct({ ...product, memoryType: event.target.value })}>
                Memory Type</Select>

            <Select name="memory-format" values={MemoryFormat}
                value={product.memoryFormat}
                onChange={(event) => setProduct({ ...product, memoryFormat: event.target.value })}>
                Memory Format</Select>


            <Select name="memoryCapacity" values={MemoryCapacity}
                value={product.memoryCapacity} onChange={(event) =>
                    setProduct({ ...product, memoryCapacity: event.target.value })
                }>
                Memory Capacity</Select>

            <Select name="memoryFrequency" values={MemoryFrequency}
                value={product.memoryFrequency} onChange={(event) =>
                    setProduct({ ...product, memoryFrequency: event.target.value })
                }>
                Memory Frequency</Select>
        </div>
        <div className="modal-footer">
            <button onClick={() => modal.close()}
                className="btn-outlined orange-text text-darken-4 waves-effect waves-orange">
                Cancel
            </button>
            <input type="submit" value={props.isNew ? "Create Product" : "Save Product"}
                className="btn white-text text-darken-4 waves-effect waves-orange"
                onClick={submit} />
        </div>
    </form>;
}
