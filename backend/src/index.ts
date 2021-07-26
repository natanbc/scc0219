import express from 'express';
import cors from 'cors'
import bodyParser from "body-parser";
import { MongoClient } from 'mongodb';

import Server from './server.js';
import apiRouter from './routes/api.js'

import {port, mongoHost, mongoUser, mongoPassword, development} from './env.js'
import {clearDevelopmentData, insertDevelopmentData} from "./development_data.js";
const mongoParams = 'retryWrites=true&writeConcern=majority';

const mongoUrl =
	`mongodb://${mongoUser}:${mongoPassword}@${mongoHost}?${mongoParams}`;

const app = express();
const client = new MongoClient(mongoUrl);
async function run() {
	try {
		console.log(`Connecting to Mongo at: ${mongoUrl}`);
		await client.connect();

		const database = client.db('ramranch');

		if(development) {
			await clearDevelopmentData(database);
		}

		//ensure proper indexes exist, regardless of development or production usage
		await database.collection("users").createIndex({ email: 1 }, { unique: true });
		await database.collection("users").createIndex({ id: 1 }, { unique: true });
		await database.collection("products").createIndex({ id: 1 }, { unique: true });
		await database.collection("carts").createIndex({ owner_email: 1 }, { unique: true });

		if(development) {
			await insertDevelopmentData(database);
		}

		const server = new Server(database);
		app.set('server', server);

		if(development) {
			app.use(cors())
		}

		app.use(bodyParser.json())

		app.get('/', (_req: express.Request, res: express.Response) => {
			res.send('Hello World!');
		});

		app.use('/api', apiRouter)

		app.listen(port, () => {
			console.log(`RAM Ranch API listening at http://localhost:${port}`);
		});
	} finally {
		//await client.close();
	}
}

run().catch(console.dir);
