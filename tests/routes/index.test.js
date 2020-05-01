const request = require('supertest')

const routes = require('app/routes')

describe('routes index', () => {
  test('root endpoint response', async () => {
    const response =  await request(routes)
      .get('/')
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({})
  })
})

