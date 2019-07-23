'use strict'

const database = require('../../database/database')
const db = database.db
const Review = database.models.Review

module.exports = (fastify, opts, next) => {
  // Get all reviews
  fastify.get('/', { schema: opts.schemas.list }, async (req, reply) => {
    Review.find({}, (err, reviews) => {
      let reviewMap = {}

      reviews.forEach((review) => {
        if (!reviewMap[review.videoUrl]) reviewMap[review.videoUrl] = []
        reviewMap[review.videoUrl].push(review)
      })

      reply.send(reviewMap)
    })
  })

  // Get all reviews for a video
  // fastify.get('/', { schema: opts.schemas.list }, async (req, reply) => {
  //   Review.find({}, (err, reviews) => {
  //     let reviewMap = {}
  //
  //     reviews.forEach((review) => {
  //       if (!reviewMap[review.videoUrl]) reviewMap[review.videoUrl] = []
  //       reviewMap[review.videoUrl].push(review)
  //     })
  //
  //     reply.send(reviewMap)
  //   })
  // })


  // Get  reviews by videoUrl
  fastify.get('/:videoUrl', { schema: opts.schemas.get }, async (req, reply) => {
    if (!req.params.videoUrl) {
      req.log.info('redirect on reviews')
      reply.redirect(opts.prefix ? opts.prefix : '/')
      return
    }

    req.log.info('request for video : ' + req.params.videoUrl)

    Review.find({videoUrl: req.params.videoUrl}, (err, reviews) => {
      let reviewMap = {}

      reviews.forEach((review) => {
        reviewMap[review._id] = review
      })

      reply.send(reviewMap)
    })
  })

  // Get a review by reviewId
  fastify.get('/reviews/:reviewId', { schema: opts.schemas.get }, async (req, reply) => {
    if (!req.params.reviewId) {
      req.log.info('redirect on reviews')
      reply.redirect(opts.prefix ? opts.prefix : '/')
      return
    }

    req.log.info('request for a reiview : ' + req.params.reviewId)

    Review.find({reviewId: req.params._id}, (err, reviews) => {
      let reviewMap = {}

      reviews.forEach((review) => {
        reviewMap[review._id] = review
      })

      reply.send(reviewMap)
    })
  })

  // Create new review
  fastify.post('/:videoUrl', { schema: opts.schemas.add }, async (req, reply) => {
    let review = new Review(req.body.review)
    review.save((err) => {
      reply.send({ err: !!err })
    })
  })

  // // Increment vote of a review
  // fastify.post('/:reviewId', { schema: opts.schemas.add }, async (req, reply) => {
  //   let review = new Review(req.body.review)
  //   review.save((err) => {
  //     reply.send({ err: !!err })
  //   })
  // })

  next()
}
