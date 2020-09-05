'use strict'

const addSchema = {
  body: {
    type: 'object',
    properties: {
      review: {
        type: 'object',
        properties: {
          videoId: { type: 'string' },
          type: { type: 'boolean'},
          reviewedMediaUrl: { type: 'string' },
          referenceUrl: { type: 'string' },
          description: { type: 'string' },
          reviewedTimes: { type: 'number' }
        },
        required: ['videoId', 'type', 'reviewedMediaUrl', 'referenceUrl']
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
            type: { type: 'boolean'},
            reviewedMediaUrl: { type: 'string' },
            referenceUrl: { type: 'string' },
            description: { type: 'string' },
            reviewedTimes: { type: 'number' }
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
              type: { type: 'boolean'},
              reviewedMediaUrl: { type: 'string' },
              referenceUrl: { type: 'string' },
              description: { type: 'string' },
              reviewedTimes: { type: 'number' }
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
