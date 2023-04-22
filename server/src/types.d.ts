
namespace Express {
	interface Request {
		currency: String?,
		date: String?,
		n: number?
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

interface RepositoryDiffsIndex {
	date: String // Day, for which value is applicalble
	value: {
		maxDiff: number // Maximum difference between buy and sell
		day: String // First day, when maxdiff occured
	}
}

// Object received from NBP API 
interface TableDiffResult {
	table: String,
	currency: String,
	code: String,
	rates: {
		no: String,
		effectiveDate: String,
		bid: number,
		ask: number
	}[]
}

// Object used to store info about maximum difference of prices of a currency
interface CurrencyDifferenceInfo {
	[currency: String]: {
		newestIndex: String // Date of the newest entry in the list
		maxDiffrences: RepositoryDiffsIndex[]
	}
}


module exports {};
