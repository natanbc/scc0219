export class User {
    /// Last parameter is "overloaded".
    constructor(email, password, name, phone, addressOrAdmin = undefined) {
        // Id is only set when saved to repository.
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
    }

    get id() {
        return User._id;
    }
}