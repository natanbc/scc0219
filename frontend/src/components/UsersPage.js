import './UsersPage.scss'
import { Users } from '../repository/Users.js';
import { UserEditModal } from './UserEditModal.js'
import React from "react";

export function UserListItem({ user, onClick }) {
    return <a href="#edit-user-modal" onClick={onClick}
        className="collection-item avatar modal-trigger waves-effect waves-light">
        <i className="material-icons circle">person</i>
        <span className="title">
            <strong>{user.name}</strong>
        </span>
        <p>
            {user.email}
            <br/>
            {user.phone}
            <br/>
            {user.address}
        </p>
    </a>;
}

export function UsersPage() {
    // State
    const [userToEdit, setUserToEdit] = React.useState(null);

    const users = new Users();

    // Generate user list.
    const userItems = [];
    for (const user of users.getUsers(0, 50)) {
        userItems.push(
            <UserListItem
                user={user}
                onClick={() => { setUserToEdit(user); }}
            />);
    }

    return <div className="container">
        { userToEdit != null
            && <UserEditModal user={{...userToEdit}}
                onClose={() => setUserToEdit(null)}/>
        }
        <div className="card-panel collection with-header col s6">
            <div className="collection-header"><h4>Users</h4></div>
            { userItems } 
        </div>
    </div>;
}