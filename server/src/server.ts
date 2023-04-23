import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import { router } from './routing/router';
import { generateCurrencyCodes } from './currencyRepository';

dotenv.config();
const PORT =  process.env.PORT || "8080";
export const app = express();

generateCurrencyCodes();

app.use(cors({
	origin: "*"
}))
app.use("/", router);

app.get("/", async (req: Request, res: Response) => {
	res.status(200);
	res.send("Please refer to documentation at https://github.com/tpalinski/nbp-api for api-routes");
})


app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
