import moment from "moment";

let lastUpdated = moment("1970-01-01")
let averageData: CurrencyAverageInfo = {}
// Check if repository contains the same data that nbp api would have
export const isUpToDate = async (currencyCode: String): Promise<boolean> => {
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
	const requestURL = `https://api.nbp.pl/api/exchangerates/rates/a/${currencyCode}/last/255`
	let res = await fetch(new URL(requestURL));
	if(!res.ok) return false
	let currencyData = await res.json() as SingleAverageResult
	let indexes: RepositoryRatesIndex[] = [];
	currencyData.rates.reduceRight((prev, curr) => {
		let res: RepositoryRatesIndex = {
			date: curr.effectiveDate,
			value: {
				maxAvg: curr.mid,
				day: curr.effectiveDate
			}
		}
		if(prev.mid > curr.mid) {
			res.value.maxAvg = prev.mid
			res.value.day = prev.effectiveDate
			indexes.push(res);
			return prev;
		}
		indexes.push(res)
		return curr;
	}, {effectiveDate: '1970-01-01', mid: 0.0, no: 'nan'})
	//@ts-expect-error
	averageData[currencyCode] = {
		newestIndex: indexes[0].date,
		values: indexes
	}
	console.log(averageData)
	return true;
}
