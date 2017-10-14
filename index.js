'use strict'

const minimist = require('minimist'),
      server = require('./api/server/server'),
      port = minimist(process.argv.slice(2), {
        integer: ['port'],
        alias: { port: 'p' },
        default: { port: 8080 }
      })

server.get('/', async (req, reply) => {
  req.log.info('request on root')
  reply.send({
    msg: 'Nothing to see here dude.'
  })
})

function start(opts, callback) {
  server.listen(opts.port, function (err) {
    callback(err, server)
  })
}

// In this way you can run the server both from the CLI and as a required module.
if (require.main === module) {
  // Run the server with:
  // $ node server.js -p 8080
  start(port, (err, instance) => {
    if (err) throw err

    console.log(`server listening on ${instance.server.address().port}`)
  })
}

server.addHook('onClose', (instance, done) => {
  console.log('CLOSING SERVER')
  done()
})


/*server.listen(port, (err) => {
  if (err) throw err;
  console.log(`server listening on ${server.server.address().port}`)
})*/

module.exports = {
  start: start,
  server: server,
  port: port
}
