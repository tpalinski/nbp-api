import express, { Request, Response } from 'express'
import { currencyParser, nParser } from '../routing/routeParsers';
import { getAverage } from '../currencyRepository';

export const averageRouter = express();

averageRouter.get("/:currency/:n", currencyParser, nParser, async (req: Request, res: Response) => {
	if(req.n == null || req.currency == null) throw new Error("Error: bad route params parse")
	let result = await getAverage(req.currency, req.n - 1);
	if(result==null) { // Every input is parsed by now, should never reach this point
		res.status(500)
		res.send("Internal server error");
	} else {
		res.status(200)
		res.send(result)
	}
})
