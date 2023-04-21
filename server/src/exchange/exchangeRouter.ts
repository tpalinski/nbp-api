import express from 'express'
import { NextFunction, Request, Response } from "express";
import { currencyParser } from '../routing/routeParsers'

export const exchangeRouter = express()

// Fetch average value of a currency
const fetchCurrencyInfo = async (currencyCode: String): Promise<SingleAverageResponse | null> => {
	const URLstring = "https://api.nbp.pl/api/exchangerates/rates/a/" 
	let response = await fetch(new URL(URLstring + currencyCode));
	if(response.ok){
		let data = await response.json() as SingleAverageResult;
		const parsedData: SingleAverageResponse = {
			currency: data.currency,
			code: data.code,
			date: data.rates[0].effectiveDate,
			averageRate: data.rates[0].mid	
		};
		return parsedData
	} else {
		return null;
	}
}

exchangeRouter.get("/:currency", currencyParser, async (req: Request, res: Response) => {
	if(req.currency !== null){
		const responseBody = await fetchCurrencyInfo(req.currency)
		res.status(200).send(responseBody)
	} else {
		res.status(500).send();
	} 
})
