const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

// enable form inputs by post
app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'njk')

app.get('/', (req, res) => {
  res.render('form')
})

app.post('/check', (req, res) => {
  if (req.body.age >= 18) {
    res.redirect('/major?age=' + req.body.age)
  } else {
    res.redirect('/minor?age=' + req.body.age)
  }
})

// TODO: /major : render a page with text "Greather than 18: age"
// TODO: /minor : render a page with text "Less than 18: age"

app.listen(3000)
