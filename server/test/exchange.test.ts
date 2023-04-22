const dotenv = require('dotenv')
const supertest = require('supertest')

dotenv.config();

const PORT = process.env.PORT || "8080";
const REQUEST_URL = `localhost:${PORT}`

const req = supertest(REQUEST_URL);

describe("GET /exchange/:currency/:date", () => {
	test("Should return proper data with correct parameters", (done) => {
		req.get('/exchange/usd/2016-04-04')
		.expect(200)
		.expect((res) => {
				res.body = "{\"currency\":\"dolar amerykański\",\"code\":\"USD\",\"date\":\"2016-04-04\",\"averageRate\":3.7254}"
		})
		.end((err, res) => {
			if (err) return done(err);
			return done();
	      });
	})
	test("Should return status 405 with a malformed date", (done) => {
		req.get('/exchange/usd/01-01-2016')
		.expect(405)
		.expect((res) => {
				res.body = "Invalid date";
		})
		.end((err, res) => {
			if (err) return done(err);
			return done();
	      });

	})
	test("Should return status 405 with invalid date", (done) => {
		req.get('/exchange/usd/2016-04-45')
		.expect(405)
		.expect((res) => {
				res.body = "Invalid date";
		})
		.end((err, res) => {
				return err ? done(err) : done()
		})
	})
	test("Should return status 405 with a date which is too old", (done) => {
		req.get('/exchange/usd/1995-01-01')
		.expect(405)
		.expect((res) => {
				res.body = "Invalid date";
		})
		.end((err, res) => {
				return err ? done(err) : done()
		})

	})
	test("Should return status 405 with a future date", (done) => {
		req.get('/exchange/usd/2075-04-27')
		.expect(405)
		.expect((res) => {
				res.body = "Invalid date";
		})
		.end((err, res) => {
				return err ? done(err) : done()
		})
	})
	test("Should return status 404 for currency which is not supported by the server", (done) => {
		req.get('/exchange/us/2020-04-27')
		.expect(404)
		.expect((res) => {
				res.body = "No data satisfying the parameters";
		})
		.end((err, res) => {
				return err ? done(err) : done()
		})


	})
})

