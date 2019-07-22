'use strict'

const addSchema = {
  body: {
    type: 'object',
    properties: {
      review: {
        type: 'object',
        properties: {
          videoId: { type: 'string' },
          link: { type: 'string' },
          title: { type: 'string' },
          text: { type: 'string' },
          vote: { type: 'number' }
        },
        required: ['videoId', 'vote']
      }
    },
    required: ['review']
  },
  response: {
    '2xx': {
      type: 'object',
      properties: {
        err: { type: 'number' }
      }
    }
  }
}

const getSchema = {
  response: {
    '2xx': {
      type: 'object',
      patternProperties: {
        '.*': {
          type: 'object',
          properties: {
            videoId: { type: 'string' },
            link: { type: 'string' },
            title: { type: 'string' },
            text: { type: 'string' },
            vote: { type: 'number' }
          }
        }
      }

    }
  }
}

const listSchema = {
  response: {
    '2xx': {
      type: 'object',
      patternProperties: {
        '.*': {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              videoId: { type: 'string' },
              link: { type: 'string' },
              title: { type: 'string' },
              text: { type: 'string' },
              vote: { type: 'number' }
            }
          },
          additionalItems: true,
          minItems: 0
        }
      }
    }
  }
}

module.exports = {
  add: addSchema,
  get: getSchema,
  list: listSchema
}
