import React from "react";
import M from 'materialize-css';
import { MemoryType, MemoryFormat } from '../model/MemoryInfo';

function FormInput({ name, type, children, value, onChange }) {
    if (value != null) {
        return <div className="input-field">
            <input id={name} name={name} type={type}
                value={value} onChange={onChange} />
            <label htmlFor={name} className="active">{children}</label>
        </div>;
    } else {
        return <div className="input-field">
            <input id={name} name={name} type={type} />
            <label htmlFor={name}>{children}</label>
        </div>;
    }
}

function TextArea({ name, children, value, onChange }) {
    const ref = React.createRef();
    React.useEffect(() => new M.textareaAutoResize(ref.current), [ref]);

    return <div className="input-field">
        <textarea ref={ref} id={name} className="materialize-textarea"
            value={value} onChange={onChange} />
        <label htmlFor={name} className="active">{children}</label>
    </div>;
}

function Select({ name, children, value, values, onChange }) {
    const selectRef = React.createRef();
    React.useEffect(() => new M.FormSelect(selectRef.current, {}), [selectRef]);

    const valueOptions = [];
    for (const value in values) {
        valueOptions.push(<option key={value} value={value}>{value}</option>);
    }

    return <div class="input-field">
        <select ref={selectRef} value={value}
            onChange={onChange}>
            {valueOptions}
        </select>
        <label>{children}</label>
    </div>;
}

export default function ProductEditModal(props) {
    const [modal, setModal] = React.useState(null);
    const [product, setProduct] = React.useState(props.product);

    const modalRef = React.createRef();
    React.useEffect(() => {
        if (modal === null) {
            const modal = new M.Modal(modalRef.current, {});
            const baseClose = modal.close;
            modal.close = function(trigger) {
                baseClose.apply(this, trigger);
                window.location.hash = "";
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


            <FormInput name="memoryCapacity" type="number"
                value={product.memoryCapacity} onChange={(event) =>
                    setProduct({ ...product, memoryCapacity: event.target.value })
                }>
                Memory Capacity</FormInput>

            <FormInput name="memoryFrequency" type="number"
                value={product.memoryFrequency} onChange={(event) =>
                    setProduct({ ...product, memoryFrequency: event.target.value })
                }>
                Memory Frequency</FormInput>
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
