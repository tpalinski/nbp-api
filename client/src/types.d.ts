
interface AverageResponse {
    max: {
	date: String, // Date of Nth entry
	value: {
	    avg: number, // maximum average price
	    day: String // First day when max average occured
	}
    },
    min: {
	date: String // Date of Nth entry
	value: {
	    avg: number,// minimum average price
	    day: String // First day when min average occured
	}
    }
}


interface DiffResponse {
	date: String // Day of Nth entry
	value: {
		maxDiff: number // Maximum difference between buy and sell
		day: String // First day when maxdiff occured
	}
}

interface ExchangeResponse {
	currency: String, // Full name of the currency
	code: String, // Currency code, e.g. gbp for British Pound
	date: String, // Supplied date
	averageRate: number // Average exchange rate
}

module exports {}
