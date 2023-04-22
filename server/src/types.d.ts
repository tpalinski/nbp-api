
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

// Response object received from NBP aPI
interface TableAverageResult {
	table: String,
	no: String,
	effectiveDate: String,
	rates: {
		currency: String,
		code: String,
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
		avg: number, // Min or max average exchange rate since the newest date
		day: String // First day, when maxAvg was noted
	}
}

// Object used to store info about average rates of a currency
interface CurrencyAverageInfo {
	[currency: String]: {
		newestIndex: String,
		maxValues: RepositoryRatesIndex[]
		minValues: RepositoryRatesIndex[]
	}
}
module exports {};
