
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

enum RequestType {
  AVERAGE = "Average Currency Value",
  DIFFERENCE = "Maximum Difference"
}

interface DiffResponse {
	date: String // Day of Nth entry
	value: {
		maxDiff: number // Maximum difference between buy and sell
		day: String // First day when maxdiff occured
	}
}

module exports {}
