const request = require('supertest')

const routes = require('app')

describe('root endpoint', () => {
  test('response', async () => {
    const response =  await request(routes)
      .get('/')
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({})
  })
})

