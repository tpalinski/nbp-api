import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { router } from './routing/router';
import { isUpToDate } from './currencyRepository';

dotenv.config();
const PORT =  process.env.PORT || "8080";
export const app = express();

app.use("/", router);

app.get("/", (req: Request, res: Response) => {
	res.status(200);
	res.send("Please refer to documentation at https://github.com/tpalinski/nbp-api for api-routes");
})

isUpToDate().then((res) => {
	res ? console.log("Up to date") : console.log("Updating")
})

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
