import express from 'express';
import * as controllers from '../controllers.js';

const users = express.Router();

users.get('/', controllers.users.get) 

export default users;
