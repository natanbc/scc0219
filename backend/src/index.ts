import express from 'express';

const app = express();
const port = 3001;

app.get('/', (_req, res) => {
	res.send('Hello World!');
});

app.listen(port, () => {
	console.log(`RAM Ranch API listening at http://localhost:${port}`);
});
