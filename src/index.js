const express = require('express')
require('./db/mongoose')
const newsRouter= require('./routers/news')
const reportersRouter = require('./routers/reporters')

const app = express()
const port = 3000

app.use(express.json())
app.use(newsRouter)
app.use(reportersRouter)

app.use((req,res,next)=>{
    next()
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})