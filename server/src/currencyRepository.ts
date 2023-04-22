import moment from "moment";

// This module serves as a lazy loaded cache for N-type requests
// It synchronizes the indexes with NBP API whenever a request asking for data which is not cached comes:
//	- it fetches relevant currency data (last 255 values)
//	- it calculates all the min and max average or difference values for all 255 days for this currency
//	- it stores it in averageData or differenceData
// Result - first request is slower, however each subsequent one needs only to make one fetch request (check for update) and access already calculated data,
// which makes it run in O(1) instead of O(n) (which is technically still O(1) as n = 255, it is still faster though)
//	

// Cached info about currency average exchange rate
let averageData: CurrencyAverageInfo = {}

let diffData: CurrencyDifferenceInfo = {}

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

enum CurrencyDataType {
	AVERAGE,
	DIFFERENCE
}

// Check if repository contains the same data that nbp api would have
export const isUpToDate = async (currencyCode: String, repository: CurrencyDataType): Promise<boolean> => {
	//@ts-expect-error
	if(!averageData.hasOwnProperty(currencyCode) && repository == CurrencyDataType.AVERAGE) return false
	//@ts-expect-error
	if(!diffData.hasOwnProperty(currencyCode) && repository == CurrencyDataType.DIFFERENCE) return false
	let dataType; 
	switch(repository){
		case CurrencyDataType.AVERAGE: 
			dataType = averageData
			break;
		case CurrencyDataType.DIFFERENCE:
			dataType = diffData
			break;
	}
	//@ts-expect-error
	let lastUpdated = moment(dataType[currencyCode].date)
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



const getMaxAverages = async (currencyData: SingleAverageResult): Promise<RepositoryRatesIndex[]> => {
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
	return maxIndexes
}

const getMinAverages = async (currencyData: SingleAverageResult): Promise<RepositoryRatesIndex[]> => {
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
	return minIndexes;
}

export const updateAverageIndexes = async(currencyCode: String): Promise<boolean> => {
	console.log(`Fetching indexes for currency: ${currencyCode}`)
	const requestURL = `https://api.nbp.pl/api/exchangerates/rates/a/${currencyCode}/last/255`
	let res = await fetch(new URL(requestURL));
	if(!res.ok) return false
	let currencyData = await res.json() as SingleAverageResult
	let maxIndexes = await getMaxAverages(currencyData)
	let minIndexes = await getMinAverages(currencyData)
	//@ts-expect-error
	averageData[currencyCode] = {
		newestIndex: minIndexes[0].date,
		maxValues: maxIndexes,
		minValues: minIndexes
	}
	return true;
}

const getMaxDiffs = async (currencyData: TableDiffResult) : Promise<RepositoryDiffsIndex[]> => {
	let maxDiffs: RepositoryDiffsIndex[] = []
	currencyData.rates.reduceRight((prev, curr) => {
		let currDiff = curr.ask - curr.bid
		let prevDiff = prev.ask - prev.bid
		let res: RepositoryDiffsIndex = {
			date: curr.effectiveDate,
			value: {
				maxDiff: currDiff,
				day: curr.effectiveDate
			}
		}
		if(prevDiff > currDiff) {
			res.value.maxDiff = prevDiff
			res.value.day = prev.effectiveDate
			maxDiffs.push(res)
			return prev;
		}
		maxDiffs.push(res);
		return curr;
	}, {effectiveDate: '1970-01-01', ask: 1.0, bid: 1.0, no: 'nan'})
	console.log(maxDiffs)
	return maxDiffs;
}

export const updateDiffIndexes = async(currencyCode: String): Promise<boolean> => {
	console.log(`Fetching indexes (diff) for currency: ${currencyCode}`)
	const requestURL = `https://api.nbp.pl/api/exchangerates/rates/c/${currencyCode}/last/255`
	let res = await fetch(new URL(requestURL));
	if(!res.ok) return false
	let currencyData = await res.json() as TableDiffResult
	let maxIndexes = await getMaxDiffs(currencyData)
	//@ts-expect-error
	diffData[currencyCode] = {
		maxDifferences: maxIndexes,
		newestIndex: maxIndexes[0].date// Date of the newest entry in the list
	}
	console.log(diffData)
	return true;
}

export interface GetAverageResult {
	min: RepositoryRatesIndex,
	max: RepositoryRatesIndex
}
export const getAverage = async (currencyCode: String, N: number): Promise<GetAverageResult| null> => {
	let isCached = await isUpToDate(currencyCode, CurrencyDataType.AVERAGE);
	let res = null;
	if(!isCached) {
		let updateStatus = await updateAverageIndexes(currencyCode)
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




