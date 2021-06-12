import './UsersPage.scss'
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

// TODO: Add users.
export function UsersPage({usersRepo}) {
    // State
    const [userToEdit, setUserToEdit] = React.useState(null);

    // Generate user list.
    const [userItems, setUserItems] = React.useState([]);

    async function loadUsers() {
        // TODO: Paging
        // TODO: Handle errors
        const users = await usersRepo.getUsers(0);

        const userItems = [];
        for (const user of users) {
            userItems.push(
                <UserListItem
                    key={user.id}
                    user={user}
                    onClick={() => { setUserToEdit(user); }}
                />);
        }

        setUserItems(userItems);
    }

    React.useEffect(() => {
        loadUsers();
    }, [usersRepo, userToEdit]);

    return <div className="container">
        { userToEdit != null
            && <UserEditModal usersRepo={usersRepo} user={{...userToEdit}}
                onClose={() => setUserToEdit(null) }/>
        }
        <div className="card-panel collection with-header col s6">
            <div className="collection-header"><h4>Users</h4></div>
            { userItems } 
        </div>
    </div>;
}