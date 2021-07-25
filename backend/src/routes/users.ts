import express from 'express';
import * as controllers from '../controllers.js';

const users = express.Router();

users.get('/:userId', controllers.users.get) 

export default users;
