'use strict'

const log = require('pino')({ level: 'info' }),
  fastify = require('fastify')({ logger: log }),
  helmet = require('fastify-helmet'),
  schemas = require('./schemas'),
  routes = require('./routes')

fastify.register(require('fastify-cors'))
fastify.register(helmet)

for (let prefix in routes) { fastify.register(routes[prefix], { prefix: prefix, schemas: schemas[prefix] }) }

module.exports = fastify
