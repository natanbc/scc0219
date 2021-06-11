import React from "react";
import M from 'materialize-css';

function FormInput({name, type, children, value, onChange}) {
    if (value != null) {
        return <div className="input-field">
            <input id={name} name={name} type={type}
                value={value} onChange={onChange}/>
            <label for="name" className="active">{children}</label>
        </div>;
    } else {
        return <div className="input-field">
            <input id={name} name={name} type={type}/>
            <label for="name">{children}</label>
        </div>;
    }
}

export function UserEditModal(props) {
    const [modal, setModal] = React.useState(null);
    const [user, setUser] = React.useState(props.user);

    const ref = React.createRef();
    React.useEffect(() => {
        if (modal === null) {
            const modal = new M.Modal(ref.current, {});
            const baseClose = modal.close;
            modal.close = function(trigger) {
                baseClose.apply(this, trigger);
                props.onClose();
            }
            modal.open();
            setModal(modal);
        }
    });

    const close = () => {
        modal.close();
        props.onClose();
    };

    return <form ref={ref} id="edit-user-modal" className="modal">
        <div className="modal-content">
            <p>{user.name}
                <div className="switch right">
                    <label>
                        Client
                        { user.isAdmin
                            ? <input type="checkbox" checked
                                onChange={(event) =>
                                    setUser({...user, isAdmin: event.target.checked})}/>
                            : <input type="checkbox"
                                onChange={(event) =>
                                    setUser({...user, isAdmin: event.target.checked})}/>
                        }
                        <span className="lever"></span>
                        Administrator
                    </label>
                </div>
            </p>
            <FormInput name="name" type="text"
                value={user.name} onChange={(event) =>
                    setUser({...user, name: event.target.value})
                }>
                Name
            </FormInput>
            <FormInput name="email" type="email"
                value={user.email} onChange={(event) =>
                    setUser({...user, email: event.target.value})
                }>
                Email</FormInput>
            <FormInput name="password" type="password"
                value={user.password} onChange={(event) =>
                    setUser({...user, password: event.target.value})
                }>
                Password</FormInput>
            <FormInput name="confirm-password" type="password"
                value={user.password} onChange={(event) =>
                    setUser({...user, password: event.target.value})
                }>
                Confirm Password</FormInput>
            <FormInput name="address" type="text"
                value={user.address} onChange={(event) =>
                    setUser({...user, address: event.target.value})
                }>
                Endereço</FormInput>
            <FormInput name="phone" type="tel"
                value={user.phone} onChange={(event) =>
                    setUser({...user, phone: event.target.value})
                }>
                Telefone</FormInput>
        </div>
        <div className="modal-footer">
            <a href="#!"
                className="btn-flat orange-text text-darken-4 waves-effect waves-orange"
                onClick={close}>
                Cancel
            </a>
            <input type="submit" value="Create Account"
                className="btn-flat orange-text text-darken-4 waves-effect waves-orange"
                onClick={close}/>
        </div>
    </form>;
}