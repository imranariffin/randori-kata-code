const LOG_LEVELS = {
  FATAL: 'FATAL',
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG',
}

const _log = (logLevel, ...args) => {
  const timestamp = `[${new Date().toISOString()}]`
  console.log(timestamp, `[${logLevel}]`, ...args)
}

const _logger = {
  fatal: (...args) => _log(LOG_LEVELS.FATAL, ...args),
  error: (...args) => _log(LOG_LEVELS.ERROR, ...args),
  warn: (...args) => _log(LOG_LEVELS.WARN, ...args),
  info: (...args) => _log(LOG_LEVELS.INFO, ...args),
  debug: (...args) => _log(LOG_LEVELS.DEBUG, ...args),
}

const getLogger = (namespace) => {
  const namespacePattern = `[${namespace}]`
  return {
    fatal: (...args) => _logger.fatal(namespacePattern, ...args),
    error: (...args) => _logger.error(namespacePattern, ...args),
    warn: (...args) => _logger.warn(namespacePattern, ...args),
    info: (...args) => _logger.info(namespacePattern, ...args),
    debug: (...args) => _logger.debug(namespacePattern, ...args),
  }
}

module.exports = {
  LOG_LEVELS,
  ..._logger,
  getLogger,
}
