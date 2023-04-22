import express from 'express';
import { exchangeRouter } from '../exchange/exchangeRouter';
import { averageRouter } from '../average/averageRouter';
import { diffRouter } from '../diff/diffRouter';

export const router = express();

router.use("/exchange", exchangeRouter)
router.use("/average", averageRouter)
router.use("/difference", diffRouter)
