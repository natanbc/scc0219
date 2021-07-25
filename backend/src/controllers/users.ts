import express from 'express';
import { ObjectId } from 'mongodb';

import Server from '../server.js'; 

export function get(req: express.Request, res: express.Response): void {
	const server = Server.fromApp(req.app);
	if (server == null) {
		res.sendStatus(500);
		return;
	}

	const userIdParam = req.params['userId'];
	if (userIdParam == undefined) {
		console.log('userId param was undefined');
		console.trace();
		res.sendStatus(500);
		return;
	}

	const userId = new ObjectId(userIdParam);
	
	server.usersRepository.findById(userId)
		.map(user => user != null
			 ? res.send(user)
			 : res.sendStatus(403))
		.mapErr(error => {
			console.log(error.name + ':' + error.message);
			res.sendStatus(500);
		});
}
