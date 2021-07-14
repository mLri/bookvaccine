const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const axios = require('axios')

require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors())
app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
  console.log('get /');
  const get_book_vaccine = await axios.get('http://localhost:3000/api/v1/bookvaccine?start_date=2021-07-01&end_date=2021-07-31')
  res.render('bookvaccine', { data: get_book_vaccine.data })
})

app.get('/aug', async (req, res) => {
  const get_book_vaccine = await axios.get('http://localhost:3000/api/v1/bookvaccine?start_date=2021-08-01&end_date=2021-08-31')
  res.render('bookvaccine_aug', { data: get_book_vaccine.data })
})

/* config database */
const mongo_uri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@backend-shard-00-00.hn2id.mongodb.net:27017,backend-shard-00-01.hn2id.mongodb.net:27017,backend-shard-00-02.hn2id.mongodb.net:27017/${process.env.MONGO_NAME}?ssl=true&replicaSet=atlas-z30kny-shard-0&authSource=admin&retryWrites=true&w=majority`

mongoose
  .connect(mongo_uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log('DB Connected!'))
  .catch(err => {
    console.log(err)
  });

/* use routes */
app.use('/api/v1', require('./routes'))

app.listen(process.env.PORT, () => console.log(`server is running on port ${process.env.PORT}`))

