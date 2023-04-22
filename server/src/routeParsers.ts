import { NextFunction, Request, Response } from "express";
import { isValidCode } from "./currencyRepository";

export const currencyParser = async (req: Request, res: Response, next: NextFunction) => {
	if(req.params.hasOwnProperty("currency")){
		let currency = req.params.currency.toLowerCase()
		if(isValidCode(currency)){
			req.currency = req.params.currency;
			next();
		} else {
			res.status(404);
			res.send("Wrong currency code")
		}
	} else {
		res.status(400);
		res.send("No currency supplied")
	}
}
