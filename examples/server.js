const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')

const app = express()
const compiler = webpack(WebpackConfig)
const router = express.Router()

router.get('/simple/get', function(req, res) {
    res.json({
        msg: `hello world`
    })
})

router.get('/base/get', function(req, res) {
    res.json({
        msg: `hello world`
    })
})

router.post('/base/post', function(req, res) {
    res.json(req.body)
})

router.post('/base/buffer', function(req, res) {
    let msg = []
    req.on('data', (chunk) => {
        if (chunk) {
            msg.push(chunk)
        }
    })
    req.on('end', () => {
        let buf = Buffer.concat(msg)
        res.json(buf.toJSON())
    })
})

router.post('/extend/post', function(req, res) {
    res.json(req.body)
})

router.get('/extend/get', function(req, res) {
    res.json({
        msg: `extend get`
    })
})

router.options('/extend/options', function(req, res) {
    res.json({
        msg: `extend options`
    })
})

router.get('/interceptor/get', function(req, res) {
    res.json(4)
})

router.delete('/extend/delete', function(req, res) {
    res.json({
        msg: `extend delete`
    })
})

router.head('/extend/head', function(req, res) {
    res.json({
        msg: `extend head`
    })
})

router.put('/extend/put', function(req, res) {
    res.json(req.body)
})

router.post('/extend/post', function(req, res) {
    res.json(req.body)
})

router.patch('/extend/patch', function(req, res) {
    res.json(req.body)
})

app.use(webpackDevMiddleware(compiler, {
    publicPath: '/__build__/',
    stats: {
        colors: true,
        chunks: false
    }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(router)

const port = process.env.PORT || 8084
module.exports = app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})