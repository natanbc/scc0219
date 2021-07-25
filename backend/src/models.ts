import { ok, err, Result } from 'neverthrow';
import { Document } from 'mongodb';

export * from './models/user.js';

export class MappingError extends Error {
	public constructor(message: string) {
		super(message);
		Object.setPrototypeOf(this, new.target.prototype);

		this.name = 'MappingError';
	}
}

export function requireField<T>(document: Document, field: string, type: string)
	: Result<T, MappingError> {

	const value = document[field];
	if (typeof value !== type) {
		return err(new MappingError(`Must have an ${field} field of type ${type}`));	
	}
	
	return ok(value);
}
