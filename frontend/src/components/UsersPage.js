import './UsersPage.scss'
import UserEditModal from './UserEditModal.js'
import React from "react";
import Route from './Route';
import Link from './Link';
import { AuthUserContext } from '../Context';
import {loadUsers} from "../util/backend";

export function UserListItem({ user, onClick }) {
    return <Link href="#edit-user" onClick={onClick}
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
    </Link>;
}

export function UsersPage({usersRepo}) {
    // State
    const [userToEdit, setUserToEdit] = React.useState(null);

    // Generate user list.
    const [userItems, setUserItems] = React.useState([]);

    const authUserCtx = React.useContext(AuthUserContext);

    const fetchUsers = React.useCallback(async () => {
        const userItems = [];

        let fetchId = "0";
        while(true) {
            let users;
            try {
                users = await loadUsers(fetchId);
            } catch(e) {
                console.error(e);
                alert("Error requesting user list");
                break;
            }
            if(users.length === 0) break;
            fetchId = users[users.length - 1].id;
            for (const user of users) {
                userItems.push(
                    <UserListItem
                        key={user.id}
                        user={user}
                        onClick={() => { setUserToEdit(user); }}
                    />);
            }
        }

        setUserItems(userItems);
    }, [authUserCtx.user, userToEdit]);

    React.useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    if (authUserCtx.user == null || !authUserCtx.user.isAdmin) {
        return <h2 className="center-align">Unauthorized</h2>;
    }

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
                    <Link href="#new-user" onClick={() => setUserToEdit({}) }
                        className="btn-floating orange waves-effect">
                        <i className="material-icons large">add</i>
                    </Link>
                </div>
                { userItems } 
            </div>
        </div>
 
    </div>;
}
