const app = require('../../dist/app')
const supertest = require('supertest')
const request = supertest(app)

it('Testing to see if Jest works', () => {
  expect(2).toBe(2)
});

it('Gets the test endpoint', async done => {
  const res = await request.get('/test');
  expect(res.status).toBe(200);
  expect(res.body.message).toBe('hello world');
  done()
})