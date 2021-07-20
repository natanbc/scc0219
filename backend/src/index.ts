import express from 'express';

import * as controllers from './controllers.js'; 
import * as routes from './routes.js';

const app = express();
const port = 3001;

app.get('/', (_req: express.Request, res: express.Response) => {
	res.send('Hello World!');
});

app.use('/users', routes.users);
app.get('/products', controllers.products.get);

app.listen(port, () => {
	console.log(`RAM Ranch API listening at http://localhost:${port}`);
});
