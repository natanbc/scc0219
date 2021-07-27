import ow from 'ow';

export class User {
    private _address: string | null;
    public email: string;
    public password: string;
    public name: string;
    public phone: string;
    public isAdmin: boolean;

    public static createAdmin(
        email: string,
        password: string,
        name: string,
        phone: string){

        const user = new User(email, password, name, phone);
        user.isAdmin = true

        return user;
    }

    public static createClient(
        email: string,
        password: string,
        name: string,
        phone: string,
        address: string): User {

        const user = new User(email, password, name, phone);
        user._address = address;

        return user;
    }

    public static tryFrom(source: any): User {

        ow(source, ow.object.partialShape({
            email: ow.string,
            password: ow.string,
            name: ow.string,
            phone: ow.string,
            isAdmin: ow.boolean,
        }));

        if (source.isAdmin) {
            return User.createAdmin(
                source.email,
                source.password,
                source.name,
                source.phone)
        }
        else {
            ow(source, ow.object.partialShape({
                address: ow.string,
            }));

            return User.createClient(
                source.email,
                source.password,
                source.name,
                source.phone,
                source.address);
        }
    }

    private constructor(email: string, password: string, name: string, phone: string){
        this.email = email;
        this.password = password;
        this.name = name;
        this.phone = phone;
        this._address = null;
        this.isAdmin = false;
    }

    public get address(): string | null {
        return this._address;
    }

    public set address(value: string | null) {
        if (value == null && !this.isAdmin) {
            throw Error("Address can only be set to null for admins");
        }

        this._address = value;
    }
}
