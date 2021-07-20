import express from 'express';

export function get(_req: express.Request, res: express.Response): void {
	res.send("Hue br");
}
