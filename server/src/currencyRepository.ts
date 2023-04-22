import moment from "moment";


// Cached info about currency average exchange rate
let averageData: CurrencyAverageInfo = {}

let currencyCodes: String[] = []

export const generateCurrencyCodes = async () => {
	console.log("Fetching currencies...")
	const requestURL = "https://api.nbp.pl/api/exchangerates/tables/a?format=json"
	let res = await fetch(new URL(requestURL));
	if(!res.ok) throw new Error("Error: NBP api not responding")
	let currencies = await res.json() as TableAverageResult[] 
	currencyCodes = currencies[0].rates.map((entry) => {return entry.code.toLowerCase()})
	console.log("Fetched possible currency codes:")
	console.log(currencyCodes)
}

export const isValidCode = (currencyCode: String) : boolean => {
	return currencyCodes.find((e) => e===currencyCode) !== undefined
}



// Check if repository contains the same data that nbp api would have
export const isUpToDate = async (currencyCode: String): Promise<boolean> => {
	//@ts-expect-error
	if(!averageData.hasOwnProperty(currencyCode)) return false
	//@ts-expect-error
	let lastUpdated = moment(averageData[currencyCode].date)
	// Data was fetched in the past, needs to be updated regardless of today's data availability
	if(lastUpdated.isBefore(moment().subtract(1, 'days'), 'day')) {
		return false;
	}
	// Data was fetched yesterday or today, with no today's data being available and needs to be checked
	else if(lastUpdated.isSame(moment().subtract(1, 'days'), 'day')) {
		const requestURL = `https://api.nbp.pl/api/exchangerates/rates/a/${currencyCode}/today`
		let res = await fetch(new URL(requestURL))
		// Api will return 200 OK if there is data for today
		if(res.ok){
			return false;
		}
	}
	// Data is up-to-date
	return true;
}

export const updateIndexes = async(currencyCode: String): Promise<boolean> => {
	console.log(`Fetching indexes for currency: ${currencyCode}`)
	const requestURL = `https://api.nbp.pl/api/exchangerates/rates/a/${currencyCode}/last/255`
	let res = await fetch(new URL(requestURL));
	if(!res.ok) return false
	let currencyData = await res.json() as SingleAverageResult
	let maxIndexes: RepositoryRatesIndex[] = [];
	currencyData.rates.reduceRight((prev, curr) => {
		let res: RepositoryRatesIndex = {
			date: curr.effectiveDate,
			value: {
				avg: curr.mid,
				day: curr.effectiveDate
			}
		}
		if(prev.mid > curr.mid) {
			res.value.avg = prev.mid
			res.value.day = prev.effectiveDate
			maxIndexes.push(res);
			return prev;
		}
		maxIndexes.push(res)
		return curr;
	}, {effectiveDate: '1970-01-01', mid: 0.0, no: 'nan'})
	// Calculate minimum average values
	let minIndexes: RepositoryRatesIndex[] = []
	currencyData.rates.reduceRight((prev, curr) => {
		let res: RepositoryRatesIndex = {
			date: curr.effectiveDate,
			value: {
				avg: curr.mid,
				day: curr.effectiveDate
			}
		}
		if(prev.mid < curr.mid) {
			res.value.avg = prev.mid
			res.value.day = prev.effectiveDate
			minIndexes.push(res);
			return prev;
		}
		minIndexes.push(res)
		return curr;
	}, {effectiveDate: '1970-01-01', mid: Number.MAX_VALUE, no: 'nan'})
	//@ts-expect-error
	averageData[currencyCode] = {
		newestIndex: minIndexes[0].date,
		maxValues: maxIndexes,
		minValues: minIndexes
	}
	return true;
}

export interface GetAverageResult {
	min: RepositoryRatesIndex,
	max: RepositoryRatesIndex
}
export const getAverage = async (currencyCode: String, N: number): Promise<GetAverageResult| null> => {
	let isCached = await isUpToDate(currencyCode);
	let res = null;
	if(!isCached) {
		let updateStatus = await updateIndexes(currencyCode)
		if(updateStatus) {
			res = {
				//@ts-expect-error
				max: averageData[currencyCode].maxValues[N],
				//@ts-expect-error
				min: averageData[currencyCode].minValues[N]
			}; 
		} else {
			return null;
		}
	} else {
		res = {
			//@ts-expect-error
			max: averageData[currencyCode].maxValues[N],
			//@ts-expect-error
			min: averageData[currencyCode].minValues[N]
		}; 
	}
	return res;
}




