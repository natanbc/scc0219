import React from "react";
import M from 'materialize-css';

import { RouteContext } from '../Context';
import { FormInput } from './materialize';
import {createUser, updateUser} from "../util/backend";

export default function UserEditModal(props) {
    const [modal, setModal] = React.useState(null);
    const [user, setUser] = React.useState(props.user);

    const routeCtx = React.useContext(RouteContext);

    const ref = React.createRef();
    React.useEffect(() => {
        if (modal === null) {
            const modal = new M.Modal(ref.current, {});
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
    }, [modal, ref, props]);

    const submit = async (event) => {
        event.preventDefault();
        if(user.password !== user.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            if (props.isNew) {
                await createUser(user);
            } else {
                await updateUser(user.id, user);
            }
        } catch(e) {
            console.error("Error submitting", e);
            alert("Unable to save user");
        }
        modal.close();
    };

    return <form ref={ref} id={props.id} className="modal">
        <div className="modal-content">
            <div className="switch right">
                <label>
                    Client
                    <input type="checkbox" checked={user.isAdmin}
                        onChange={(event) =>
                            setUser({...user, isAdmin: event.target.checked})}/>
                    <span className="lever"/>
                    Administrator
                </label>
            </div>
            <FormInput name="name" type="text"
                value={user.name} onChange={(event) =>
                    setUser({...user, name: event.target.value})
                }>
                Name</FormInput>
            <FormInput name="email" type="email"
                value={user.email} onChange={(event) =>
                    setUser({...user, email: event.target.value})
                }>
                Email</FormInput>
            <FormInput name="password" type="password"
                className={user.password === user.confirmPassword ? "" : "invalid"}
                value={user.password} onInput={(event) =>
                    setUser({...user, password: event.target.value})
                }>
                Password</FormInput>
            <FormInput name="confirm-password" type="password"
                className={user.password === user.confirmPassword ? "" : "invalid"}
                value={user.confirmPassword} onChange={(event) =>
                    setUser({...user, confirmPassword: event.target.value})
                }>
                Confirm Password</FormInput>
            { !user.isAdmin &&
                <FormInput name="address" type="text"
                    value={user.address} onChange={(event) =>
                        setUser({...user, address: event.target.value})
                    }>
                    Endereço</FormInput>
            }
            <FormInput name="phone" type="tel"
                value={user.phone} onChange={(event) =>
                    setUser({...user, phone: event.target.value})
                }>
                Telefone</FormInput>
        </div>
        <div className="modal-footer">
            <button onClick={(event) => { modal.close(); event.preventDefault() }}
                className="btn-outlined orange-text text-darken-4 waves-effect waves-orange">
                Cancel
            </button>
            <input type="submit" value={ props.isNew ? "Create Account" : "Save Account" }
                className="btn white-text text-darken-4 waves-effect waves-orange"
                onClick={submit}/>
        </div>
    </form>;
}
