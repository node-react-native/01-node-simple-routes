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
  res.send('hello')
})

// TODO: / : render a form page with the age field
// TODO: /check : post called by form that check age - redirect to /major or /minor (age is send as a qyery param in redirect)
// TODO: /major : render a page with text "Greather than 18: age"
// TODO: /minor : render a page with text "Less than 18: age"

app.listen(3000)
