import React from "react";
import M from 'materialize-css';

export function FormInput({name, type, children, icon, value, wrapperClass, ...props}) {
    wrapperClass = wrapperClass ? "input-field " + wrapperClass : "input-field";

    if (value != null) {
        return <div className={wrapperClass}>
            { icon !== undefined && <i className="material-icons prefix">{icon}</i> }
            <input id={name} name={name} type={type}
                value={value} {...props}/>
            <label htmlFor={name} className="active">{children}</label>
        </div>;
    } else {
        return <div className={wrapperClass}>
            { icon !== undefined && <i className="material-icons prefix">{icon}</i> }
            <input id={name} name={name} type={type} {...props}/>
            <label htmlFor={name}>{children}</label>
        </div>;
    }
}

export function TextArea({ name, children, value, onChange }) {
    const ref = React.createRef();
    React.useEffect(() => new M.textareaAutoResize(ref.current), [ref]);

    return <div className="input-field">
        <textarea ref={ref} id={name} className="materialize-textarea"
            value={value} onChange={onChange} />
        <label htmlFor={name} className="active">{children}</label>
    </div>;
}

export function Select({ name, children, value, values, onChange }) {
    const selectRef = React.createRef();
    React.useEffect(() => new M.FormSelect(selectRef.current, {}), [selectRef]);

    const valueOptions = [];
    for (const value in values) {
        valueOptions.push(<option key={value} value={value}>{value}</option>);
    }

    return <div className="input-field">
        <select id={name} ref={selectRef} value={value}
            onChange={onChange}>
            {valueOptions}
        </select>
        <label htmlFor={name}>{children}</label>
    </div>;
}

export function Collapsible({children}) {
    const ref = React.createRef();

    React.useEffect(() => new M.Collapsible(ref.current, {}), [ref]);

    return <ul ref={ref} className="collapsible">
            {children}
        </ul>;
}

export function CollapsibleItem({active, header, children}) {
    return <li className={active ? "active" : ""}>
            <div className="collapsible-header">{header}</div>
            <div className="collapsible-body">{children}</div>
        </li>;
}
