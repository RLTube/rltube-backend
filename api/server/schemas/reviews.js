'use strict'

const addSchema = {
  body: {
    type: 'object',
    properties: {
      review: {
        type: 'object',
        properties: {
          videoUrl: { type: 'string' },
          link: { type: 'string' },
          title: { type: 'string' },
          text: { type: 'string' },
          vote: { type: 'number' }
        },
        required: ['videoUrl', 'vote']
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
            _id: { type: 'string' },
            videoUrl: { type: 'string' },
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
              _id: { type: 'string' },
              videoUrl: { type: 'string' },
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
