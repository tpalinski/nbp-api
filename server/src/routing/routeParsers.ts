import { NextFunction, Request, Response } from "express";
import moment from 'moment';

const API_START_DATE = "2002-01-02"; // Date of first data from available from NBP api


export const currencyParser = async (req: Request, res: Response, next: NextFunction) => {
	if(req.params.hasOwnProperty("currency")){
		req.currency = req.params.currency;
		next();
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
