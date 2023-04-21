import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();
const PORT =  process.env.PORT || "8080";
const app = express();


app.get("/", (req: Request, res: Response) => {
	res.status(200);
	res.send("Please refer to documentation at https://github.com/tpalinski/nbp-api for api-routes");
})



app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
