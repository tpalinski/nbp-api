import express from 'express';
import { exchangeRouter } from './exchange/exchangeRouter';

export const router = express();

router.use("/exchange", exchangeRouter)
