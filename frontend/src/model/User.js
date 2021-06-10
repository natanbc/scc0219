export class User {
    static nextId = 0;

    constructor(email, password, name, phone, address = null) {
        this._id = nextId;
        this.email = email;
        this.password = password;
        this.name = name;
        this.phone = phone;
        this.address = address;

        nextId++;
    }

    get id() {
        return this._id;
    }
}