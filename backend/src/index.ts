import express from 'express';
import { MongoClient } from 'mongodb';
import process from 'process';

import * as controllers from './controllers.js'; 
import * as routes from './routes.js';
import Server from './server.js';

const port = process.env['API_LISTEN_PORT'];

const mongoHosts = process.env['MONGO_HOSTS'];
const mongoPassword = process.env['MONGO_PASSWORD'];
const mongoUser = process.env['MONGO_USER'];
const mongoParams = 'retryWrites=true&writeConcern=majority';

const mongoUrl =
	`mongodb://${mongoUser}:${mongoPassword}@${mongoHosts}?${mongoParams}`;

const app = express();
const client = new MongoClient(mongoUrl);
async function run() {
	try {
		console.log(`Connecting to Mongo at: ${mongoUrl}`);
		await client.connect();

		const database = client.db('ramranch');

		const server = new Server(database);
		app.set('server', server);

		app.get('/', (_req: express.Request, res: express.Response) => {
			res.send('Hello World!');
		});

		app.use('/users', routes.users);
		app.get('/products', controllers.products.get);

		app.listen(port, () => {
			console.log(`RAM Ranch API listening at http://localhost:${port}`);
		});
	} finally {
		await client.close();
	}
}

run().catch(console.dir);
