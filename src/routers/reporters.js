const express = require('express')
const Reporters  = require('../models/reporters')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/reporters', async (req, res) => {
    const reporters  = new reporters (req.body)

    try {
        await reporters.save()
        const token = await reporters.generateAuthToken()
        res.status(201).send({ reporters, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/reporters/login', async (req, res) => {
    try {
        const reporters = await Reporters.findByCredentials(req.body.email, req.body.password)
        const token = await reporters.generateAuthToken()
        res.send({ reporters, token })
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/reporters/logout', auth, async (req, res) => {
    try {
        req.reporters.tokens = req.reporters.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.reporters.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/reporters/logoutAll', auth, async (req, res) => {
    try {
        req.reporters.tokens = []
        await req.reporters.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/reporters', auth, async (req, res) => {
    res.send(req.reporters)
})

router.patch('/profile', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    try {
        updates.forEach((update) => req.reporters[update] = req.body[update])
        await req.reporters.save()
        res.send(req.reporters)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/profile', auth, async (req, res) => {
    try {
        await req.reporters.remove()
        res.send(req.reporters)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router