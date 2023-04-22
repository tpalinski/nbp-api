
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

// Object used to store information about maximum average rates in CurrencyRepository
interface RepositoryRatesIndex {
	date: String, // Date which will be checked
	value: {
		maxAvg: number, // Maximum average exchange rate since the newest date
		day: String // First day, when maxAvg was noted
	}
}

// Object used to store info about average rates of a currency
interface CurrencyAverageInfo {
	[currency: String]: {
		newestIndex: String,
		values: RepositoryRatesIndex[]
	}
}
module exports {};
