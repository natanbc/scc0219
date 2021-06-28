import {User} from '../model/User.js'

export const USERS_STORE = "users";
export class Users {
    static _users = [
        new User("admin", "admin", "Fulano Admin",
            "+00 00 00000-0000", true),
        new User("user1@example.com", "123", "Fulano",
            "+00 00 00000-0001", "Rua Exemplo, 1001 - São Carlos, SP"),
        new User("user2@example.com", "123", "Fulano",
            "+00 00 00000-0002", "Rua Exemplo, 1002 - São Carlos, SP"),
        new User("user3@example.com", "123", "Fulano",
            "+00 00 00000-0003", "Rua Exemplo, 1003 - São Carlos, SP"),
    ];

    constructor(idbDatabase) {
        this._idbDatabase = idbDatabase;
    }

    async createUser(user) {
        return new Promise((resolve, reject) => {
            const idbTransaction = this._idbDatabase.transaction(USERS_STORE, "readwrite");
            
            const usersStore = idbTransaction.objectStore(USERS_STORE);
            const idbRequest = usersStore.add(user);
            idbRequest.onsuccess = event => {
                user.id = event.target.result;
                resolve(user);
            };
            idbRequest.onerror = event => reject(event.target.error);
        });
    }

    async getByEmail(email) {
        return new Promise((resolve, reject) => {
            const idbTransaction = this._idbDatabase.transaction(USERS_STORE, "readonly");
            
            const usersStore = idbTransaction.objectStore(USERS_STORE);
            const emailIndex = usersStore.index("email");
            const idbRequest = emailIndex.get(email);
            idbRequest.onsuccess = event => resolve(event.target.result);
            idbRequest.onerror = event => reject(event.target.error);
        });
    }

    async getUser(id) {
        return new Promise((resolve, reject) => {
            const idbTransaction = this._idbDatabase.transaction(USERS_STORE, "readonly");
            
            const usersStore = idbTransaction.objectStore(USERS_STORE);
            const idbRequest = usersStore.get(id);
            idbRequest.onsuccess = event => resolve(event.target.result);
            idbRequest.onerror = event => reject(event.target.error);
        });
    }

    async getUsers(startId, count = 20) {
        return new Promise((resolve, reject) => {
            const idbTransaction = this._idbDatabase.transaction(USERS_STORE, "readwrite");
            
            const usersStore = idbTransaction.objectStore(USERS_STORE);
            const idbRequest = usersStore.openCursor(IDBKeyRange.lowerBound(startId));

            let i = 0; 
            const users = [];
            idbRequest.onsuccess = event => {
                const idbCursorWithValue = event.target.result;

                if (i === count || idbCursorWithValue === null) {
                    resolve(users);
                    return;
                }

                users.push(idbCursorWithValue.value);
                i += 1;

                // IMPORTANT: Normal iterators would be too normal for JavaScript.
                // So that's why cursors work in the following completely bizarre way:
                // When you advance the cursor, the original cursor request's
                // success or error events will be called.
                // So this function is called count times or till the cursor ends (ie: null),
                // whichever happens first.
                idbCursorWithValue.continue();
            }

            idbRequest.onerror = event => reject(event.target.error);
        });
    }

    async updateUser(user) {
        return new Promise((resolve, reject) => {
            const idbTransaction = this._idbDatabase.transaction(USERS_STORE, "readwrite");
            const usersStore = idbTransaction.objectStore(USERS_STORE);
            const idbRequest = usersStore.openCursor(IDBKeyRange.only(user.id));

            idbRequest.onsuccess = event => {
                const idbCursorWithValue = event.target.result;
        
                const idbRequest = idbCursorWithValue.update(user)
                idbRequest.onsuccess = event => resolve();
                idbRequest.onerror = event => reject(event.target.error);
            };
            
            idbRequest.onerror = event => reject(event.target.error);
        });
    }

    async deleteUser(id) {
        return new Promise((resolve, reject) => {
            const idbTransaction = this._idbDatabase.transaction(USERS_STORE, "readwrite");
            
            const usersStore = idbTransaction.objectStore(USERS_STORE);
            const idbRequest = usersStore.openCursor(IDBKeyRange.only(id));

            idbRequest.onsuccess = event => {
                const idbCursorWithValue = event.target.result;

                const idbRequest = idbCursorWithValue.delete()
                idbRequest.onsuccess = event => resolve();
                idbRequest.onerror = event => reject(event.target.error);
            };
            
            idbRequest.onerror = event => reject(event.target.error);
        });
    }
}
