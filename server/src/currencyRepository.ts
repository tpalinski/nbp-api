import moment from "moment";

let lastUpdated = moment("1970-01-01")


// Check if repository contains the same data that nbp api would have
export const isUpToDate = async (): Promise<boolean> => {
	// Data was fetched in the past, needs to be updated regardless of today's data availability
	if(lastUpdated.isBefore(moment().subtract(1, 'days'), 'day')) {
		return false;
	}
	// Data was fetched yesterday or today, with no today's data being available and needs to be checked
	else if(lastUpdated.isSame(moment().subtract(1, 'days'), 'day')) {
		const requestURL = "https://api.nbp.pl/api/exchangerates/tables/a/today"
		let res = await fetch(new URL(requestURL))
		// Api will return 200 OK if there is data for today
		if(res.ok){
			return false;
		}
	}
	// Data is up-to-date
	return true;
}
