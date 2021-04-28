const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../../dist/app');
const request = supertest(app);
const dbHandler = require('../db-handler');
const { createPush } = require('../../dist/services/createPush');

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

const pushExample = {
  pushed_at: 1619548312,
  compare: 'https://github.com/youxiberlin/Github-tweets-fullstack/compare/2c2e8e4801e7...11ae31df890d',
  commits: [
    {
      message: 'new commit',
      url: 'https://github.com/youxiberlin/Github-tweets-fullstack/commit/010afa7cef0bc9f07508cd5873a55aa06b6f198c',
      committer: { username: 'yukisato' }
    }
  ]
}

it('Gets the test endpoint', async done => {
  const res = await request.get('/test');
  expect(res.status).toBe(200);
  expect(res.body.message).toBe('hello world');
  done()
})

describe('push', () => {
  it('can be created correctly', async () => {
    expect(async () => await createPush(pushExample))
        .not
        .toThrow();
  });
});