export class User {
    static nextId = 0;

    /// Last parameter is "overloaded".
    constructor(email, password, name, phone, addressOrAdmin = undefined) {
        this._id = User.nextId;
        this.email = email;
        this.password = password;
        this.name = name;
        this.phone = phone;

        // Overload resolution
        if (addressOrAdmin === true || addressOrAdmin === false) {
            this.isAdmin = addressOrAdmin;
            this.address = null;
        } else {
            this.address = addressOrAdmin;
            this.isAdmin = false;
        }

        User.nextId++;
    }

    get id() {
        return User._id;
    }
}