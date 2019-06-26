
process.env.NODE_ENV = 'test'
const port = process.env.PORT || 3000
const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect

const { peopleService } = require('../services')
const app = require('../server')
const peopleJson = require('./people.json').peopleJson

// node http.Server object to use for closing connection
var server


chai.use(chaiHttp)

describe('People', () => {
  before(async function () {
    server = app.listen(port)
    await peopleService.removeAllPeople()
  })

  after(() => {
    server.close()
  })
  

  describe('/GET all people when empty', () => {
    it('When no people are in the database, it should return an empty array', async function () {
      try{
        let res = await chai.request(app).get('/api/people')
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res.body).to.be.an('array')
        expect(res.body).to.have.lengthOf(0)
      } catch(err) {
        console.log(err)
      }
    })
  })

  describe('/GET all people', () => {
    before(async function () {
      for (person in peopleJson) {
        await peopleService.createPerson(peopleJson[person])
      }
    })

    after(async function () {
      await peopleService.removeAllPeople()
    })

    it('it should get three people', async function () {
      try{
        let res = await chai.request(app).get('/api/people')
        //console.log(res)
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res.body).to.be.an('array')
        expect(res.body).to.have.lengthOf(3)
      } catch(err) {
        console.log(err)
      }
    })
  })

  describe('/GET one person', () => {
    before(async function () {
      for (person in peopleJson) {
        await peopleService.createPerson(peopleJson[person])
      }
    })

    after(async function () {
      await peopleService.removeAllPeople()
    })

    it('it should get one person', async function () {
      let personId = 1
      try{
        let res = await chai.request(app).get('/api/people/' + personId)
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res.body).to.be.a('object')
        expect(res.body).to.have.property('personId', 1)
        expect(res.body).to.have.property('name', 'TestName1')
        expect(res.body).to.have.property('company', 'TestCompany1')
        expect(res.body).to.have.property('job', 'TestJob1')
        expect(res.body).to.have.property('salary', 1)
      } catch(err) {
        console.log(err)
      }
    })
  })


  describe('/POST person', () => {
    afterEach(async function () {
      await peopleService.removeAllPeople()
    })

    it('it should post a new person', async function () {
      let testPerson = peopleJson.testPersonOne
      try {
        let res = await chai.request(app).post('/api/people').send(testPerson)
        expect(res).to.have.status(201)
        expect(res).to.be.json
        expect(res).to.have.header('Content-Location', '/api/people/1')
        expect(res.body).to.be.a('object')
        expect(res.body).to.have.property('personId', 1)
        expect(res.body).to.have.property('name', 'TestName1')
        expect(res.body).to.have.property('company', 'TestCompany1')
        expect(res.body).to.have.property('job', 'TestJob1')
        expect(res.body).to.have.property('salary', 1)
      } catch(err) {
        console.log(err)
      }
    })
  })

  describe('/PUT person', () => {
    beforeEach(async function () {
      let testPerson = peopleJson.testPersonOne
      let result = await peopleService.createPerson(testPerson)
      this.postedPerson = result.contents
    })
    afterEach(async function () {
      await peopleService.removeAllPeople()
    })

    it('it should update a person', async function () {
      let personId = this.postedPerson.personId
      let alteredInfo = peopleJson.testPersonTwo
      try {
        let res = await chai.request(app).put('/api/people/' + personId).send(alteredInfo)
        expect(res).to.have.status(204)
        expect(res).to.have.header('Content-Location', '/api/people/1')
        expect(res.body).to.be.empty
      } catch(err) {
        console.log(err)
      }
    })
  })

  describe('/DELETE person', () => {
    before(async function () {
      for (person in peopleJson) {
        await peopleService.createPerson(peopleJson[person])
      }
    })

    after(async function () {
      await peopleService.removeAllPeople()
    })

    it('it should delete a person', async function () {
      let personId = 1
      try {
        let res = await chai.request(app).delete('/api/people/' + personId)
        expect(res).to.have.status(204)
      } catch(err) {
        console.log(err)
      }
    })
  })

  describe('/GET search query', () => {
    before(async function () {
      for (person in peopleJson) {
        await peopleService.createPerson(peopleJson[person])
      }
    })

    after(async function () {
      await peopleService.removeAllPeople()
    })

    it('it should return two people from search', async function () {
      let queryString = "?company=TestCompany2&job=TestJob3"
      try {
        let res = await chai.request(app).get('/api/people/search' + queryString)
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('array')
      } catch(err) {
        console.log(err)
      }
    })

    it('it should return NOT FOUND with valid query params', async function () {
      let queryString = "?company=testcompany7&job=testjob8"
      try {
        let res = await chai.request(app).get('/api/people/search' + queryString)
        expect(res).to.have.status(200)
        expect(res.body).to.be.empty
      } catch(err) {
        console.log(err)
      }
    })

    //TODO validate params
    it('it should return BAD REQUEST with invalid query params', async function () {
      let queryString = "?food=Chicken&shoes=Nike"
      try {
        let res = await chai.request(app).get('/api/people/search' + queryString)
        expect(res).to.have.status(400) //BAD REQUEST
        expect(res.body).to.be.empty
      } catch(err) {
        console.log(err)
      }
    })
  })


})
