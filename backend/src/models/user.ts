import { ok, err, Result } from 'neverthrow';
import { Document } from 'mongodb';
import { MappingError, requireField } from '../models.js';

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

	public static fromDocument(document: Document): Result<User, MappingError> {

		return requireField<string>(document, 'email', 'string')
			.andThen(email => requireField<string>(document, 'password', 'string')
				.map(value => ({
					email: email,
					password: value
				})))
			.andThen(tmp => requireField<string>(document, 'name', 'string')
				.map(value => ({
					...tmp,
					name: value
				})))
			.andThen(tmp => requireField<string>(document, 'phone', 'string')
				.map(value => ({
					...tmp,
					phone: value
				})))
			.andThen(tmp => requireField<string>(document, 'isAdmin', 'boolean')
				.map(value => ({
					...tmp,
					isAdmin: value
				})))
			.andThen(tmp => {
				if (tmp.isAdmin) {
					return ok(User.createAdmin(
						tmp.email,
						tmp.password,
						tmp.name,
						tmp.phone));
				} else {
					return requireField<string>(document, 'address', 'string')
						.map(address => User.createClient(
							tmp.email,
							tmp.password,
							tmp.name,
							tmp.phone,
							address));
				}
			});
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
