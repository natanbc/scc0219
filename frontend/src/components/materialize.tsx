import React from "react";
import M from 'materialize-css';

export interface FormInputProps {
    name?: string,
    type?: string,
    icon?: string,
    value?: string | number,
    wrapperClass?: string,
    children: React.ReactNode,
}

export function FormInput({name, type, children, icon, value, wrapperClass, ...props}
    : FormInputProps
    & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
): JSX.Element {

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

export interface TextAreaProps {
    name?: string,
    value?: string | number,
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>,
    children: React.ReactNode,
}

export function TextArea({ name, children, value, onChange }: TextAreaProps) {
    const ref = React.useCallback((elem: HTMLTextAreaElement | null) => {
            if (elem !== null) {
                M.textareaAutoResize(elem)
            }
        }, []);

    return <div className="input-field">
        <textarea ref={ref} id={name} className="materialize-textarea"
            value={value} onChange={onChange} />
        <label htmlFor={name} className="active">{children}</label>
    </div>;
}


export interface SelectProps {
    name?: string,
    onChange?: React.ChangeEventHandler<HTMLSelectElement>,
    value?: string | number,
    values: Array<string | number | undefined>,
    children: React.ReactNode,
}

export function Select(props: SelectProps): JSX.Element {
    const selectRef = React.useCallback((elem: HTMLSelectElement | null) => {
            if (elem !== null) {
                new M.FormSelect(elem);
            }
        }, []);

    return <div className="input-field">
        <select id={props.name} ref={selectRef} value={props.value} onChange={props.onChange}>
            { props.values.map(value => <option key={value} value={value}>{value}</option>) }
        </select>
        <label htmlFor={props.name}>{props.children}</label>
    </div>;
}

export interface CollapsibleProps {
    children: React.ReactNode,
}

export function Collapsible(props: CollapsibleProps): JSX.Element {

    const ref = React.useCallback((elem: HTMLUListElement | null) => {
            if (elem !== null) {
                new M.Collapsible(elem);
            }
        }, []);

    return <ul ref={ref} className="collapsible">
            {props.children}
        </ul>;
}

export interface CollapsibleItemProps {
    active?: boolean,
    header: React.ReactNode,
    children: React.ReactNode,
}

export function CollapsibleItem(props: CollapsibleItemProps): JSX.Element {
    return <li className={props.active ? "active" : ""}>
            <div className="collapsible-header">{props.header}</div>
            <div className="collapsible-body">{props.children}</div>
        </li>;
}
