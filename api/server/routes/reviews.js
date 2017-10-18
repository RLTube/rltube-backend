'use strict'

const database = require('../../database/database'),
  db = database.db,
  Review = database.models.Review

module.exports = (fastify, opts, next) => {
  // Get all reviews
  fastify.get('/', { schema: opts.schemas.list }, async (req, reply) => {
    Review.find({}, (err, reviews) => {
      let reviewMap = {}

      reviews.forEach((review) => {
        if (!reviewMap[review.videoId]) reviewMap[review.videoId] = []
        reviewMap[review.videoId].push(review)
      })

      reply.send(reviewMap)
    })
  })

  // Get a review
  fastify.get('/:videoId', { schema: opts.schemas.get }, async (req, reply) => {
    if (!req.params.videoId) {
      req.log.info('redirect on reviews')
      reply.redirect(opts.prefix ? opts.prefix : '/')
      return
    }

    req.log.info('request for video : ' + req.params.videoId)

    Review.find({videoId: req.params.videoId}, (err, reviews) => {
      let reviewMap = {}

      reviews.forEach((review) => {
        reviewMap[review._id] = review
      })

      reply.send(reviewMap)
    })
  })

  // Create new review
  fastify.post('/', { schema: opts.schemas.add }, async (req, reply) => {
    let review = new Review(req.body.review)
    review.save((err) => {
      reply.send({ err: !!err })
    })
  })
  next()
}
