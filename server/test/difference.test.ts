

const dotenv = require('dotenv')
const supertest = require('supertest')

dotenv.config();

const PORT = process.env.PORT || "8080";
const REQUEST_URL = `localhost:${PORT}`

const req = supertest(REQUEST_URL);
describe("GET /average", () => {
	test("Should return proper data with correct parameters", (done) => {
		req.get('/difference/gbp/35')
		.expect(200)
		.end((err, res) => {
			if (err) return done(err);
			return done();
	      });
	})
	test("Should return 406 with wrong currency", (done) => {
		req.get('/difference/donkey_kong/35')
		.expect(406)
		.end((err, res) => {
			if (err) return done(err);
			return done();
	      });
	})
	
	test("Should return 404 with a number which is too large", (done) => {
		req.get('/difference/dkk/256')
		.expect(404)
		.end((err, res) => {
			if (err) return done(err);
			return done();
	      });
	})
	test("Should return 404 with a number which is too small", (done) => {
		req.get('/difference/eur/0')
		.expect(404)
		.end((err, res) => {
			if (err) return done(err);
			return done();
	      });
	})
	test("Should return 400 with a malformed number", (done) => {
		req.get('/difference/dkk/twenty-one')
		.expect(400)
		.end((err, res) => {
			if (err) return done(err);
			return done();
	      });
	})
	test("Should return proper data with different correct parameters", (done) => {
		req.get('/difference/huf/35')
		.expect(200)
		.end((err, res) => {
			if (err) return done(err);
			return done();
	      });
	})

})
