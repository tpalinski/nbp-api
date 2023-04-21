
namespace Express {
	interface Request {
		currency: String?,
		date: String?
	}
}

// Response object received from NBP API
interface SingleAverageResult {
	table: String,
	currency: String,
	code: String,
	rates: {
		no: String,
		effectiveDate: String
		mid: number
	}[]
}

// Response sent from a server for /exchange routes
interface SingleAverageResponse {
	currency: String,
	code: String,
	date: String,
	averageRate: number
}


module exports {};
