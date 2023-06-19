const express = require('express')
const path = require('path')

const friendsRouter = require('./routes/friends.router')
const messagesRouter = require('./routes/messages.router')

const app = express()

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

const PORT = 3000

//* MIDDLEWARE
app.use((req, res, next) => {
    const start = Date.now()
    console.log(`${req.method} ${req.url}`)
    next() // go to the next middleware
    const delta = Date.now() - start
    console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`)
})

//* STATIC FILES
app.use('/site', express.static(path.join(__dirname, 'public')))

//* JSON PARSING MIDDLEWARE
app.use(express.json())

//* ROUTES
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Hello, World!',
        caption: 'This is a sample picture',
    })
})
app.use('/friends', friendsRouter)
app.use('/messages', messagesRouter)

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}... `)
})
