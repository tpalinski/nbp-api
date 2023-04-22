import { NextFunction, Request, Response } from "express";
import moment from 'moment';
import { isValidCode } from "../currencyRepository";

const API_START_DATE = "2002-01-02"; // Date of first data from available from NBP api


export const currencyParser = async (req: Request, res: Response, next: NextFunction) => {
	if(req.params.hasOwnProperty("currency")){
		let currency = req.params.currency.toLowerCase();
		if(isValidCode(currency)){
			req.currency = currency;
			next();
		} else {
			res.status(404)
			res.send("No such currency")
		}
	} else {
		res.status(400);
		res.send("No currency supplied")
	}
}

export const dateParser = async (req: Request, res: Response, next: NextFunction) => {
	if(req.params.hasOwnProperty("date")){
		let parsedDate = moment(req.params.date, "YYYY-MM-DD");
		if(parsedDate.isValid() && parsedDate.isBetween(API_START_DATE, moment.now())){
			req.date = req.params.date;	
			next();
		} else {
			res.status(405);
			res.send("Invalid date");
		}
	} else {
		res.status(400);
		res.send("No date supplied")
	}
}

export const nParser = async (req: Request, res: Response, next: NextFunction) => {
	if(req.params.hasOwnProperty("n")) {
		let n = parseInt(req.params.n);
		if(isNaN(n)) {
			res.status(400)
			res.send("Wrong number format")
			return;
		}
		if(n > 0 && n <= 255){
			req.n = n
			next();
		} else {
			res.status(404)
			res.send("Invalid number")
		}
	}
}
