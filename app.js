const path = require('path')
const express = require('express')
//const expressHandlebars = require('express-handlebars')
//const hbs = require('hbs')
const workings = require('./workings')

const app = express()
const port = process.env.PORT || 3000

//define path for express config
//console.log(__dirname)
const assetsDirectoryPath = path.join(__dirname, 'views/public')
//app.use(express.static(__dirname + 'views/public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json()) 
app.set('view engine','hbs')

// setup static directory to serve
app.use(express.static(assetsDirectoryPath))

app.get('/', (req, res) => { 
    //res.type('text/plain')
    res.render('layouts/main')
})
 
app.post('/', (req, res) => {
    const body = req.body
    const wordsToDisplay = workings.totalWords(body)
    const charsToDisplay = workings.totalCharacters(body)
    const sentenceToDisplay = workings.totalSentences(body)
    const paraToDisplay = workings.totalParagraphs(body)
    const keywordsToDisplay = workings.frequencyCounter(body)
    
    //console.log(req.headers['content-type'])
    res.render('layouts/main', {
        char: charsToDisplay,
        wor: wordsToDisplay,
        sen: sentenceToDisplay,
        para: paraToDisplay,
        keywords: keywordsToDisplay
    })
})

// custom 500 page
app.use((err, req, res, next) => {
    console.error(err.message)
    res.type('text/plain')
    res.status(500)
    res.send('500 - Server Error')
})

// custom 404 page
app.get('*', (req, res) => {
    res.send('Page not found')
})

app.listen (port, () => console.log(
    `Express started on http://localhost:${port} ` +
    `press Ctrl-C to terminate.`
))
