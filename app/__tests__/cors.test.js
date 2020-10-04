// eslint-env jest
const request = require('supertest')

const app = require('..')

jest.mock('../envs', () => ({
  Env: {
    CORS_ORIGIN_WHITELIST: [new RegExp('^http(s)?://localhost:.*$')]
  }
}))

describe('cors', () => {
  test('DO NOT allow cross origin if origin not in whitelist', (done) => {
    request(app)
      .options('/ping')
      .set('Origin', 'http://not-in-whitelist:80')
      .end((error, response) => {
        if (error) {
          return done(error)
        }
        expect(response.headers['Access-Control-Allow-Origin']).toBeUndefined()
        done()
      })
  })

  ;[
    'http://localhost:8080',
    'https://localhost:8080',
    'http://localhost:8081',
    'http://localhost:9999',
    'http://localhost:1',
  ].forEach(origin => {
    test(`Allow cross origin if origin in whitelist [origin=${origin}]`, (done) => {
      request(app)
        .options('/ping')
        .set('Origin', origin)
        .expect('Access-Control-Allow-Origin', origin, done)
    })
  })
})
