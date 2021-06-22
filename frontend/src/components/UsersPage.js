import './UsersPage.scss'
import { UserEditModal } from './UserEditModal.js'
import React from "react";
import Route from './Route';

export function UserListItem({ user, onClick }) {
    return <a href="#edit-user" onClick={onClick}
        className="collection-item avatar waves-effect waves-light">
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

    React.useEffect(() => {
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

        loadUsers();
    }, [usersRepo, userToEdit]);

    return <div className="container">
        <Route hash="#edit-user">
            <UserEditModal id="edit-user" usersRepo={usersRepo}
                user={{...userToEdit}} isNew={false}
                onClose={() => setUserToEdit(null) }/>
        </Route>
        <Route hash="#new-user">
            <UserEditModal id="new-user" usersRepo={usersRepo}
                user={{...userToEdit}} isNew={true}
                onClose={() => setUserToEdit(null) }/>
        </Route>
        <div className="card">
            <div id="user-collection" className="collection with-header with-fab col s6">
                <div className="collection-header">
                    <h4>Users</h4>
                    <a href="#new-user" onClick={() => setUserToEdit({}) }
                        className="btn-floating orange waves-effect">
                        <i className="material-icons large">add</i>
                    </a>
                </div>
                { userItems } 
            </div>
        </div>
 
    </div>;
}