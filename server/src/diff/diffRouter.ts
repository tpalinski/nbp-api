import express, { Request, Response } from 'express'
import { currencyParser, nParser } from '../routing/routeParsers';
import { getDiffs } from '../currencyRepository';

export const diffRouter = express();

diffRouter.get("/:currency/:n", currencyParser, nParser, async (req: Request, res: Response) => {
	if(req.n == null || req.currency == null){ // Everything should be parsed by middlewares and should never reach this point
		res.status(500)
		res.send("Internal server error")
	} else {
		let result = await getDiffs(req.currency, req.n - 1);
		if(result == null) {// error while fetching data from api
			res.status(404)
			res.send("No resource")
		} else {
			res.status(200)
			res.send(result)
		}
	}
})
