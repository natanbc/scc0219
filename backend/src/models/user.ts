import { ok, err, Result } from 'neverthrow';

export namespace Model {

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
	
	private constructor(email: string, password: string, name: string, phone: string){
		this.email = email;
		this.password = password;
		this.name = name;
		this.phone = phone;
		this._address = null;
		this.isAdmin = false;
	}

	public get address() {
		return this._address;
	}

	public setAddress(value: string | null): Result<null, Error> {
		if (value == null && !this.isAdmin) {
			return err(Error("Address can only be set to null for admins"));	
		}

		this._address = value;

		return ok(null);
	}
}
}
