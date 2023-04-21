import express from 'express'
import { NextFunction, Request, Response } from "express";
import { currencyParser } from '../routeParsers'

export const exchangeRouter = express()

exchangeRouter.get("/:currency", currencyParser, (req: Request, res: Response) => {
	res.status(200).send(req.currency)
})
