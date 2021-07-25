import * as models from './models.js'

export { default as Users } from './repositories/users.js';
export * as users from './repositories/users.js';

export class DbError extends Error {
	public cause: any; 

	public constructor(message: string, cause: any) {
		super(message);
		Object.setPrototypeOf(this, new.target.prototype);

		this.name = 'DbError';
		this.cause = cause;
	}
}

export class NotFoundError extends Error {
	public constructor(message: string) {
		super(message);
		Object.setPrototypeOf(this, new.target.prototype);

		this.name = 'NotFoundError';
	}
}


export type RepositoryError = DbError | models.MappingError;

