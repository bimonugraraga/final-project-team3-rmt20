const express = require('express')
const app = express()
const port = 3000

const routes = require('./routers')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.get('/', (req, res) => {
  res.status(200).json({message: 'Hello World'})
})

app.use('/', routes)

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })


module.exports = app
