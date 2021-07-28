import express from 'express';
import mongo from 'mongodb'

export default class Server {
	public readonly database: mongo.Db;

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
	}
}
