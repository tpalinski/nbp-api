
const dotenv = require('dotenv')
const supertest = require('supertest')

dotenv.config();

const PORT = process.env.PORT || "8080";
const REQUEST_URL = `localhost:${PORT}`

const req = supertest(REQUEST_URL);
describe("GET /average", () => {
	test("Should return proper data with correct parameters", (done) => {
		req.get('/average/dkk/35')
		.expect(200)
		.end((err, res) => {
			if (err) return done(err);
			return done();
	      });
	})
	test("Should return 404 with wrong currency", (done) => {
		req.get('/average/donkey_kong/35')
		.expect(404)
		.end((err, res) => {
			if (err) return done(err);
			return done();
	      });
	})
	
	test("Should return 404 with a number which is too large", (done) => {
		req.get('/average/dkk/256')
		.expect(404)
		.end((err, res) => {
			if (err) return done(err);
			return done();
	      });
	})
	test("Should return 404 with a number which is too small", (done) => {
		req.get('/average/dkk/0')
		.expect(404)
		.end((err, res) => {
			if (err) return done(err);
			return done();
	      });
	})
	test("Should return 404 with a malformed number", (done) => {
		req.get('/average/dkk/twenty-one')
		.expect(400)
		.end((err, res) => {
			if (err) return done(err);
			return done();
	      });
	})

})
