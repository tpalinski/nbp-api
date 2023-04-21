import { NextFunction, Request, Response } from "express";

export const currencyParser = async (req: Request, res: Response, next: NextFunction) => {
	if(req.params.hasOwnProperty("currency")){
		req.currency = req.params.currency;
		next();
	} else {
		res.status(400);
		res.send("No currency supplied")
	}
}
