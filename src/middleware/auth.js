const jwt = require('jsonwebtoken')
const Reporters = require('../models/reporters')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'node course')
        const reporters = await Reporters.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!reporters) {
            throw new Error()
        }

        req.token = token
        req.reporters = reporters
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth