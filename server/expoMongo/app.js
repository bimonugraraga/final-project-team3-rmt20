const express = require('express')
const app = express()
const port = 4001
let cors = require('cors');
const {connectMongo} = require('./config/mongoConnection')
const routes = require('./routes')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/', routes)

connectMongo()
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
  })
  .catch((err) => {
    console.log(err, "<<<")
  })