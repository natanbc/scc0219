import {User} from '../model/User.js'

export class Users {
    static _users = [
        new User("admin@example.com", "123", "Fulano Admin",
            "+00 00 00000-0000", true),
        new User("user@example.com", "123", "Fulano",
            "+00 00 00000-0000", "Rua Exemplo, 1000 - São Carlos, SP"),
        new User("user@example.com", "123", "Fulano",
            "+00 00 00000-0000", "Rua Exemplo, 1000 - São Carlos, SP"),
        new User("user@example.com", "123", "Fulano",
            "+00 00 00000-0000", "Rua Exemplo, 1000 - São Carlos, SP"),
        new User("user@example.com", "123", "Fulano",
            "+00 00 00000-0000", "Rua Exemplo, 1000 - São Carlos, SP"),
        new User("user@example.com", "123", "Fulano",
            "+00 00 00000-0000", "Rua Exemplo, 1000 - São Carlos, SP"),
        new User("user@example.com", "123", "Fulano",
            "+00 00 00000-0000", "Rua Exemplo, 1000 - São Carlos, SP"),
        new User("user@example.com", "123", "Fulano",
            "+00 00 00000-0000", "Rua Exemplo, 1000 - São Carlos, SP"),
        new User("user@example.com", "123", "Fulano",
            "+00 00 00000-0000", "Rua Exemplo, 1000 - São Carlos, SP"),
    ];

    createUser(user) {
        Users._users[user.id] = user;
    }

    getUser(id) {
        return Users._users[id];        
    }

    getUsers(start = 0, count = 20) {
        return Users._users.slice(start, start + count); 
    }

    updateUser(user) {
        Users._users[user.id] = user;
    }

    deleteUser(id) {
        Users._users[id] = undefined;
    }
}