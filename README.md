# Nbp API

A RESTful API enabling users to check information regarding currencies and their prices

## Usage

**GET localhost:8080/exchange/{currency}/{date}**

Returns average exchange price of a currency for a day as:

```ts
{
	currency: String, // Full name of the currency
	code: String, // Currency code, e.g. gbp for British Pound
	date: String, // Supplied date
	averageRate: number // Average exchange rate
}

```

Example use:
```
GET http://localhost:8080/exchange/usd/2016-04-01
```

which should output the following response:

```
{
    "currency":"dolar amerykański",
    "code":"USD",
    "date":"2016-04-01",
    "averageRate":3.7193
}
```

Possible errors:
    * 405 - Invalid date - wrong date format, date before the first date supported by the api, date in the future, nonexistent date
    * 406 - Invalid currency - API does not support this currency
    * 401 - No data for parameters - Api does not have data satisfying the parameters (usually as a result of the date being valid but not covered by NBP api)

**GET localhost:8080/difference/{currency}/{N}**

Returns maximum difference between bid and ask price for the last N entries:

```ts
{
	date: String // Day of Nth entry
	value: {
		maxDiff: number // Maximum difference between buy and sell
		day: String // First day when maxdiff occured
	}
}

```

Example use:
```
GET http://localhost:8080/difference/gbp/43
```

Sample response:
```
{
    "date":"2023-02-21",
    "value": {
	"maxDiff":0.10780000000000012,
	"day":"2023-02-23"
    }
}
```

Possible errors:
    * 404 - N is invalid - N not in range if (0, 255>
    * 400 - Malformed N - n is not a number
    * 406 - Invalid currency - API does not support this currency

**GET localhost:8080/average/{currency}/{N}**

Returns maximum and minimum average price for the last N entries:

```ts
{
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
	    avg: // minimum average price
	    day: String // First day when min average occured
	}
    }
}

```

Example use:
```
GET http://localhost:8080/average/gbp/43
```

Sample response:
```
{
    "max": {
	"date":"2023-02-21",
	"value": {
	    "avg":5.3984,
	    "day":"2023-02-23"
	}
    },
    "min": {
	"date":"2023-02-21",
	"value": {
	    "avg":5.2086,
	    "day":"2023-04-21"
	}
    }
}
```

Possible errors:
    * 404 - N is invalid - N not in range if (0, 255>
    * 400 - Malformed N - n is not a number
    * 406 - Invalid currency - API does not support this currency
