const { EnvVarInvalidBoolean } = require('../errors')

const StringToBoolean = (str) => {
  if (str === 'true') {
    return true
  } else if (str === 'false') {
    return false
  } else if (!isNaN()) {
    return Boolean(Number(str))
  }
  throw new EnvVarInvalidBoolean(str)
}

module.exports = {
  Env: {
    CODE__LOGGING_ENABLED: StringToBoolean(process.env.RANDORIKATA__CODE__LOGGING_ENABLED),
    CODE__SWITCH_PERIOD_MS: Number(process.env.RANDORIKATA__CODE__SWITCH_PERIOD_MS),
    ENV: process.env.RANDORIKATA__ENV,
    PORT: Number(process.env.RANDORIKATA__PORT),
  },
}
