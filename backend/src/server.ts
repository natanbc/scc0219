import express from 'express';
import mongo from 'mongodb'

import * as repositories from './repositories.js';

export default class Server {
	public readonly database: mongo.Db;
	public readonly usersRepository: repositories.Users;

	public static fromApp(app: express.Application): Server {
		const server = app.get('server');	

		if (server != undefined && server instanceof Server) {
			return server;
		}

		console.error('Server object was missing from express app!');
		console.trace();
		throw new Error();
	}

	public constructor(database: mongo.Db) {
		this.database = database;
		this.usersRepository = new repositories.Users(database);
	}
}
