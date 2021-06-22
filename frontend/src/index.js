import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Users, USERS_STORE } from './repository/Users';
import { Products, PRODUCTS_STORE } from './repository/Products';

function startApp(idbDatabase) {
	let users = new Users(idbDatabase);
	let products = new Products(idbDatabase);

	ReactDOM.render(
		<React.StrictMode>
			<App usersRepo={users}
				productsRepo={products}/>
		</React.StrictMode>,
		document.getElementById('root')
	);

	// If you want to start measuring performance in your app, pass a function
	// to log results (for example: reportWebVitals(console.log))
	// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
	reportWebVitals();
}

const DB_VERSION = 2;

// TODO: Better error handling.
console.log("Opening db");
const openRequest = indexedDB.open("RamRanch", DB_VERSION);

openRequest.onsuccess = event => {
	console.log("Db opened sucessfully.");
	const idbDatabase = event.target.result;

	startApp(idbDatabase);
};

openRequest.onerror = event => {
	console.log(`Error while opening db: ${event.target.error}`);
};

openRequest.onupgradeneeded = event => {
	const db = event.target.result;
	console.log(`Upgrading from version ${event.oldVersion} to ${event.newVersion}!`);

	if (event.oldVersion === 0) {
		const usersStore = db.createObjectStore(
			USERS_STORE, { keyPath: 'id', autoIncrement: true });

		usersStore.createIndex('name', 'name', { unique: false });

		for (const user of Users._users) {
			usersStore.put(user);
		}
	}

	if (event.oldVersion <= 1) {
		const productsStore = db.createObjectStore(
			PRODUCTS_STORE, { keyPath: 'id', autoIncrement: true });
		
		productsStore.createIndex('name', 'name', { unique: false });
		productsStore.createIndex('price', 'price', { unique: false });

		for (const product of Products._products) {
			productsStore.put(product);
		}
	}
};

openRequest.onblocked = event => {
	console.log(`Blocked while opening db: ${event.target.error}`);
}
