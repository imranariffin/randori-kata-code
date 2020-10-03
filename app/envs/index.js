const { EnvVarInvalidBoolean } = require('../errors')

const stringToBoolean = (str) => {
  if (str === 'true') {
    return true
  } else if (str === 'false') {
    return false
  } else if (!isNaN()) {
    return Boolean(Number(str))
  }
  throw new EnvVarInvalidBoolean(str)
}

const stringToRegexArray = (str) => {
  return str.split(',').map((s) => RegExp(s))
}

module.exports = {
  Env: {
    CODE__LOGGING_ENABLED: stringToBoolean(process.env.RANDORIKATA__CODE__LOGGING_ENABLED),
    CODE__SWITCH_PERIOD_MS: Number(process.env.RANDORIKATA__CODE__SWITCH_PERIOD_MS),
    CORS_ORIGIN_WHITELIST: stringToRegexArray(process.env.RANDORIKATA__CORS_ORIGIN_WHITELIST),
    ENV: process.env.RANDORIKATA__ENV,
    PORT: Number(process.env.RANDORIKATA__PORT),
  },
}
