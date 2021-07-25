import { Collection, Db, ObjectId } from 'mongodb';
import * as models from '../models.js'
import { DbError, RepositoryError } from '../repositories.js'

import { ok, ResultAsync } from 'neverthrow';

export default class Users {
	private readonly users: Collection;

	public constructor(db: Db) {
		this.users = db.collection('users');
	}

	public findById(id: ObjectId): ResultAsync<models.User | null, RepositoryError> {
		return ResultAsync.fromPromise(
				this.users.findOne({ _id: id }),
				error => new DbError(
					`Database failed while finding user by _id: ${id}`, error))
			.andThen(document => document == undefined
				? ok(null) : models.User.fromDocument(document));
	}
}
