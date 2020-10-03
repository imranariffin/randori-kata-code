const { switchWriter } = require('../background-tasks')
const { Env } = require('../../envs')

describe('background-tasks', () => {
  let connections
  let io

  beforeEach(() => {
    connections = {
      'some-connection-id-0': {
        conn: {
          id: 'some-connection-id-0'
        },
      },
    }
    io = {
      emit: jest.fn(),
    }
  })

  test('emit `writer-switch` event every `RANDORIKATA__CODE__SWITCH_PERIOD_MS` second', () => {
    jest.useFakeTimers()
    const { taskId } = switchWriter(io, connections)

    expect(io.emit).toHaveBeenCalledTimes(0)

    jest.advanceTimersByTime(Env.CODE__SWITCH_PERIOD_MS)

    expect(io.emit).toHaveBeenCalledTimes(1)

    jest.advanceTimersByTime(Env.CODE__SWITCH_PERIOD_MS)

    expect(io.emit).toHaveBeenCalledTimes(2)

    clearInterval(taskId)
  })
})
