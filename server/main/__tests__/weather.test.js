const request = require('supertest');
const app = require('../app');
const {User, WeatherReport} = require('../models')
const {signToken} = require('../helpers/jwt')

let validToken;
let invalidToken1 = 'INVALID_TOKEN'
let invalidToken2 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJiYmJAYmJiLmNvbSIsImlhdCI6MTY0Nzg1Nzg4N30.TKkohoemVxmP0ggViVGMzR2OgJtfCh4ltxkimW3Wn0o"

const userTest = {
  email: 'test1@mail.com',
  password: '123456'
}

beforeAll((done) => {
  User.create(userTest)
    .then((result) => {
      validToken = signToken({
        id: result.id,
        email: result.email
      })

      const seedWeatherRep = [
        {
          status: 'aman',
          description: 'test',
          photoUrl: 'test',
          coordinate: 'test',
          temperature: 20,
          uvi: 20,
          pressure: 20,
          humidity: 20,
          windspeed: 20,
          weatherMain: 'test',
          weatherDesc: 'test',
          weatherIcon: 'test',
          "createdAt": new Date(),
          "updatedAt": new Date(),
          UserId: result.id
        },
        {
          status: 'aman2',
          description: 'test2',
          photoUrl: 'test2',
          coordinate: 'test2',
          temperature: 20,
          uvi: 20,
          pressure: 20,
          humidity: 20,
          windspeed: 20,
          weatherMain: 'test2',
          weatherDesc: 'test2',
          weatherIcon: 'test2',
          "createdAt": new Date(),
          "updatedAt": new Date(),
          UserId: result.id
        }
      ]

      return WeatherReport.bulkCreate(seedWeatherRep)
    })
    .then(() => {
      done()
    })
    .catch((err) => {
      done(err)
    })
})

afterAll(done => {
  User.destroy({ truncate: true, cascade: true, restartIdentity: true})
    .then(_ => {
      return WeatherReport.destroy({ truncate: true, cascade: true, restartIdentity: true})
    })
    .then(_ => {
      done();
    })
    .catch(err => {
      done(err);
    });
});

describe('GET /reports/weathers', () => {

  test('200 Success get weathers reports', (done) => {
    request(app)
      .get('/reports/weathers')
      .then((response) => {
        const {body, status} = response

        expect(status).toBe(200)
        expect(Array.isArray(body)).toBeTruthy();
        expect(body[0]).toHaveProperty('User')
        done()

      })
      .catch((err) => {
        done(err)
      })
  })

  test('200 Success get one weather report', (done) => {
    request(app)
      .get('/reports/weathers/1')
      .then((response) => {
        const {body, status} = response

        expect(status).toBe(200)
        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty('status')
        expect(body).toHaveProperty('description')
        expect(body).toHaveProperty('photoUrl')
        expect(body).toHaveProperty('coordinate')
        expect(body).toHaveProperty('temperature')
        expect(body).toHaveProperty('uvi')
        expect(body).toHaveProperty('pressure')
        expect(body).toHaveProperty('humidity')
        expect(body).toHaveProperty('windspeed')
        expect(body).toHaveProperty('weatherMain')
        expect(body).toHaveProperty('weatherDesc')
        expect(body).toHaveProperty('weatherIcon')

        done()

      })
      .catch((err) => {
        done(err)
      })
  })

  test('404 failed get one weather report', (done) => {
    request(app)
      .get('/reports/weathers/3')
      .then((response) => {
        const {body, status} = response

        expect(status).toBe(404)
        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty('message', "Weather Report Not Found!")


        done()

      })
      .catch((err) => {
        done(err)
      })
  
  })
  
})

describe('POST /reports/weathers', () => {

  test('201 Success post weather report', (done) => {
    request(app)
      .post('/reports/weathers')
      .set('access_token', validToken)
      .send({
          status: 'aman',
          description: 'test',
          photoUrl: 'test',
          coordinate: 'test',
          temperature: 20,
          uvi: 20,
          pressure: 20,
          humidity: 20,
          windspeed: 20,
          weatherMain: 'test',
          weatherDesc: 'test',
          weatherIcon: 'test'
      })
      .then((response) => {
        const {body, status} = response

        expect(status).toBe(201)
        expect(body).toHaveProperty('message', 'Laporan telah berhasil dibuat')
        
        done()

      })
      .catch((err) => {
        done(err)
      })
  })

  test('400 Invalid Input Field Status', (done) => {
    request(app)
      .post('/reports/weathers')
      .set('access_token', validToken)
      .send({
        // status: 'aman',
        description: 'test',
        photoUrl: 'test',
        coordinate: 'test',
        temperature: 20,
        uvi: 20,
        pressure: 20,
        humidity: 20,
        windspeed: 20,
        weatherMain: 'test',
        weatherDesc: 'test',
        weatherIcon: 'test',
      })
      .then((response) => {
        const {body, status} = response

        console.log(body)
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'Status Is Required!')
        done()

      })
      .catch((err) => {
        done(err)
      })
  })

  test('400 Invalid Input Field Description', (done) => {
    request(app)
      .post('/reports/weathers')
      .set('access_token', validToken)
      .send({
        status: 'aman',
        // description: 'test',
        photoUrl: 'test',
        coordinate: 'test',
        temperature: 20,
        uvi: 20,
        pressure: 20,
        humidity: 20,
        windspeed: 20,
        weatherMain: 'test',
        weatherDesc: 'test',
        weatherIcon: 'test'
      })
      .then((response) => {
        const {body, status} = response

        console.log(body)
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'Description Is Required!')
        done()

      })
      .catch((err) => {
        done(err)
      })
  })

  test('400 Invalid Input Field Coordinate', (done) => {
    request(app)
      .post('/reports/weathers')
      .set('access_token', validToken)
      .send({
        status: 'aman',
        description: 'test',
        photoUrl: 'test',
        // coordinate: 'test',
        temperature: 20,
        uvi: 20,
        pressure: 20,
        humidity: 20,
        windspeed: 20,
        weatherMain: 'test',
        weatherDesc: 'test',
        weatherIcon: 'test'
      })
      .then((response) => {
        const {body, status} = response

        console.log(body)
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'Coordinate Is Required!')
        done()

      })
      .catch((err) => {
        done(err)
      })
  })

  test('400 Invalid Input Field Temperature', (done) => {
    request(app)
      .post('/reports/weathers')
      .set('access_token', validToken)
      .send({
        status: 'aman',
        description: 'test',
        photoUrl: 'test',
        coordinate: 'test',
        // temperature: 20,
        uvi: 20,
        pressure: 20,
        humidity: 20,
        windspeed: 20,
        weatherMain: 'test',
        weatherDesc: 'test',
        weatherIcon: 'test'
      })
      .then((response) => {
        const {body, status} = response

        console.log(body)
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'Temperature Is Required!')
        done()

      })
      .catch((err) => {
        done(err)
      })
  })

  test('400 Invalid Input Field UVI', (done) => {
    request(app)
      .post('/reports/weathers')
      .set('access_token', validToken)
      .send({
        status: 'aman',
        description: 'test',
        photoUrl: 'test',
        coordinate: 'test',
        temperature: 20,
        // uvi: 20,
        pressure: 20,
        humidity: 20,
        windspeed: 20,
        weatherMain: 'test',
        weatherDesc: 'test',
        weatherIcon: 'test'
      })
      .then((response) => {
        const {body, status} = response

        console.log(body)
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'UVI Is Required!')
        done()

      })
      .catch((err) => {
        done(err)
      })
  })

  test('400 Invalid Input Field Pressure', (done) => {
    request(app)
      .post('/reports/weathers')
      .set('access_token', validToken)
      .send({
        status: 'aman',
        description: 'test',
        photoUrl: 'test',
        coordinate: 'test',
        temperature: 20,
        uvi: 20,
        // pressure: 20,
        humidity: 20,
        windspeed: 20,
        weatherMain: 'test',
        weatherDesc: 'test',
        weatherIcon: 'test'
      })
      .then((response) => {
        const {body, status} = response

        console.log(body)
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'Pressure Is Required!')
        done()

      })
      .catch((err) => {
        done(err)
      })
  })

  test('400 Invalid Input Field Humidity', (done) => {
    request(app)
      .post('/reports/weathers')
      .set('access_token', validToken)
      .send({
        status: 'aman',
        description: 'test',
        photoUrl: 'test',
        coordinate: 'test',
        temperature: 20,
        uvi: 20,
        pressure: 20,
        // humidity: 20,
        windspeed: 20,
        weatherMain: 'test',
        weatherDesc: 'test',
        weatherIcon: 'test'
      })
      .then((response) => {
        const {body, status} = response

        console.log(body)
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'Humidity Is Required!')
        done()

      })
      .catch((err) => {
        done(err)
      })
  })

  test('400 Invalid Input Field Wind Speed', (done) => {
    request(app)
      .post('/reports/weathers')
      .set('access_token', validToken)
      .send({
        status: 'aman',
        description: 'test',
        photoUrl: 'test',
        coordinate: 'test',
        temperature: 20,
        uvi: 20,
        pressure: 20,
        humidity: 20,
        // windspeed: 20,
        weatherMain: 'test',
        weatherDesc: 'test',
        weatherIcon: 'test'
      })
      .then((response) => {
        const {body, status} = response

        console.log(body)
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'Wind Speed Is Required!')
        done()

      })
      .catch((err) => {
        done(err)
      })
  })

  test('400 Invalid Input Field  Weather Main', (done) => {
    request(app)
      .post('/reports/weathers')
      .set('access_token', validToken)
      .send({
        status: 'aman',
        description: 'test',
        photoUrl: 'test',
        coordinate: 'test',
        temperature: 20,
        uvi: 20,
        pressure: 20,
        humidity: 20,
        windspeed: 20,
        // weatherMain: 'test',
        weatherDesc: 'test',
        weatherIcon: 'test'
      })
      .then((response) => {
        const {body, status} = response

        console.log(body)
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'Weather Main Is Required!')
        done()

      })
      .catch((err) => {
        done(err)
      })
  })

  test('400 Invalid Input Field  Weather Description', (done) => {
    request(app)
      .post('/reports/weathers')
      .set('access_token', validToken)
      .send({
        status: 'aman',
        description: 'test',
        photoUrl: 'test',
        coordinate: 'test',
        temperature: 20,
        uvi: 20,
        pressure: 20,
        humidity: 20,
        windspeed: 20,
        weatherMain: 'test',
        // weatherDesc: 'test',
        weatherIcon: 'test'
      })
      .then((response) => {
        const {body, status} = response

        console.log(body)
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'Weather Description Is Required!')
        done()

      })
      .catch((err) => {
        done(err)
      })
  })

  test('400 Invalid Input Field  Weather Icon', (done) => {
    request(app)
      .post('/reports/weathers')
      .set('access_token', validToken)
      .send({
        status: 'aman',
        description: 'test',
        photoUrl: 'test',
        coordinate: 'test',
        temperature: 20,
        uvi: 20,
        pressure: 20,
        humidity: 20,
        windspeed: 20,
        weatherMain: 'test',
        weatherDesc: 'test',
        // weatherIcon: 'test'
      })
      .then((response) => {
        const {body, status} = response

        console.log(body)
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'Weather Icon Is Required!')
        done()

      })
      .catch((err) => {
        done(err)
      })
  })

  test('400 Invalid Input Field  Weather Description', (done) => {
    request(app)
      .post('/reports/weathers')
      .set('access_token', invalidToken1)
      .send({
        status: 'aman',
        description: 'test',
        photoUrl: 'test',
        coordinate: 'test',
        temperature: 20,
        uvi: 20,
        pressure: 20,
        humidity: 20,
        windspeed: 20,
        weatherMain: 'test',
        weatherDesc: 'test',
        weatherIcon: 'test'
      })
      .then((response) => {
        const {body, status} = response

        console.log(body)
        expect(status).toBe(401)
        expect(body).toHaveProperty('message', 'Invalid Token')
        done()

      })
      .catch((err) => {
        done(err)
      })
  })

  test('400 Invalid Input Field  Weather Description', (done) => {
    request(app)
      .post('/reports/weathers')
      .set('access_token', invalidToken2)
      .send({
        status: 'aman',
        description: 'test',
        photoUrl: 'test',
        coordinate: 'test',
        temperature: 20,
        uvi: 20,
        pressure: 20,
        humidity: 20,
        windspeed: 20,
        weatherMain: 'test',
        weatherDesc: 'test',
        weatherIcon: 'test'
      })
      .then((response) => {
        const {body, status} = response

        console.log(body)
        expect(status).toBe(401)
        expect(body).toHaveProperty('message', 'Invalid Token')
        done()

      })
      .catch((err) => {
        done(err)
      })
  })
  

  
})


