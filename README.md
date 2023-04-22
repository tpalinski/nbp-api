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
