import express from 'express'
import { Request, Response } from "express";
import { currencyParser, dateParser } from '../routing/routeParsers'

export const exchangeRouter = express()

// Fetch average value of a currency
const fetchCurrencyInfo = async (currencyCode: String, date: String): Promise<SingleAverageResponse | null> => {
	const URLstring = `https://api.nbp.pl/api/exchangerates/rates/a/${currencyCode}/${date}` 
	let response = await fetch(new URL(URLstring));
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

exchangeRouter.get("/:currency/:date", currencyParser, dateParser, async (req: Request, res: Response) => {
	if(req.currency !== null && req.date !== null){
		const responseBody = await fetchCurrencyInfo(req.currency, req.date)
		if(responseBody !== null) res.status(200).send(responseBody)
		else res.status(401).send("No data satisfying the parameters")
	} else { // Should never happen, unless middleware is broken
		res.status(500).send();
	} 
})
