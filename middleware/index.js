const express = require(`express`);


const middleware = {}

//-- ERROR HANDLING --//
middleware.asyncHandler = (cb) => {
    return async(req, res, next) => {
        try {
            await cb(req, res, next)
        } catch (err) {
            res.status(500).send(err);
        }
    }
}

module.exports = middleware;