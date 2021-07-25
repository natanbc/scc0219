import { Db } from 'mongodb'

export default class Server {
	public readonly database: Db;

	public constructor(database: Db) {
		this.database = database;
	}
}
