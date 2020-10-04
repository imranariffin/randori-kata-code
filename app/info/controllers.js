const { exec } = require('child_process')

const info = (req, res) => {
  exec('git rev-parse --short HEAD', (error, output) => {
    if (error) {
      console.error(error)
      res.send({ error })
      return
    }
    const commit = output.replace('\n', '')
    exec('git rev-parse --abbrev-ref HEAD', (error, output) => {
      if (error) {
        console.error(error)
        res.send({ error })
        return
      }
      const branch = output.replace('\n', '')
      res.send({
        branch,
        commit,
      })
    })
  })
}

module.exports = {
  info,
}
