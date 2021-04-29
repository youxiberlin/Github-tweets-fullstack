const supertest = require('supertest');
const app = require('../../dist/app');
const request = supertest(app);
const dbHandler = require('../db-handler');
const { createPush, findPushes } = require('../../dist/services/push');
const { makeNewPushMessage, postTweet } = require('../../dist/services/twitter');
const testData = require('../fixtures/testData.json');
const webhookPayload = require('../fixtures/payload.json');

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

describe('Initial check', () => {
  it('returns "Hello World"', async done => {
    const res = await request.get('/test');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('hello world');
    done()
  })
});

describe('Database service tests', () => {
  it('should sccessfully create a new push', () => {
    const newPush = {
      pushed_at: 1619551400,
      compare: "https://github.com/youxiberlin/Github-tweets-fullstack/compare/46c31f1e294c...0d1f024aeded",
      commits: [{
        message : "Updated hook controller",
        url : "https://github.com/youxiberlin/Github-tweets-fullstack/commit/e331c4b2ae78b72fba0bec86f8b727d6bb01c790",
        committer : "youxiberlin"
      }]
    };
    expect(async () => await createPush(newPush))
      .not
      .toThrow()
  });

  it('should sccessfully find the stored pushes', () => {
    expect(async () => await findPushes())
      .not
      .toThrow()
  });
});

describe.skip('Twitter service tests', () => {
  it('should sccessfully create a new push message', () => {
    const newMessage = makeNewPushMessage({
      repo_name: 'test_repo',
      commit_msg: 'commit message',
      username: 'tester',
      url: 'https://github.com/youxiberlin/Github-tweets-fullstack'
    });

    expect(async () => await postTweet(newMessage))
      .not
      .toThrow()
  });
});

describe('findPushes tests', () => {
  beforeEach(async () => {
    testData.forEach(async data => {
      await createPush(data);
    });
  });

  it('should return all pushes', async () => {
    const res = await request.get('/api/pushes');
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(3);
    res.body.data.forEach(item => {
      expect(item).toHaveProperty('pushed_at', 'compare', 'commits');
      item.commits.forEach(commit => {
        expect(commit).toHaveProperty('message', 'url', 'committer');
      })
    });
  });
});

describe('Hook functional tests', () => {
  it('returns 200 when webhook payload is posted', async () => {
    const res = await request
      .post('/api/hook')
      .send(webhookPayload)

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Success');
  });

  it('returns 500 when webhook payload couldn not store to DB', async () => {
    const res = await request
      .post('/api/hook')
      .send({})

    expect(res.status).toBe(500);
    expect(res.body.message).toBe('Internal server error');
  });
});
