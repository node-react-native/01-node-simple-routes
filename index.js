const express = require('express')
const nunjucks = require('nunjucks')

const app = express()
app.use(express.urlencoded({ extended: false })) // enable form inputs by post
app.set('view engine', 'njk')

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

const logMiddleware = (req, res, next) => {
  console.log(
    `HOST: ${req.headers.host} | URL: ${req.url} | METHOD: ${req.method}`
  )
  return next()
}

const validationMiddleware = (req, res, next) => {
  if (req.query.age === undefined || req.query.age === null || !req.query.age) {
    res.redirect('/')
  } else {
    return next()
  }
}

app.use(logMiddleware)

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

app.get('/major', validationMiddleware, (req, res) => {
  res.render('major', { age: req.query.age })
})

app.get('/minor', validationMiddleware, (req, res) => {
  res.render('minor', { age: req.query.age })
})

app.listen(3000)
