
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

module exports {}
