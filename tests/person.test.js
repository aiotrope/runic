const mongoose = require('mongoose')
const request = require('supertest')

const app = require('../app')
const PersonInfo = require('../models/person.js')
const helper = require('../helper/index.js')

beforeAll(async () => {
  const keys = Object.keys(mongoose.connection.collections)
  keys.forEach(async (key) => {
    await mongoose.connection.collections[key].deleteMany({})
  })

  const person0 = new PersonInfo({
    name: helper.persons[0].name,
    number: helper.persons[0].number,
  })
  const person1 = new PersonInfo({
    name: helper.persons[1].name,
    number: helper.persons[1].number,
  })
  const person2 = new PersonInfo({
    name: helper.persons[2].name,
    number: helper.persons[2].number,
  })
  const person3 = new PersonInfo({
    name: helper.persons[3].name,
    number: helper.persons[3].number,
  })

  const p0 = await PersonInfo.create(person0)
  const p1 = await PersonInfo.create(person1)
  const p2 = await PersonInfo.create(person2)
  const p3 = await PersonInfo.create(person3)

  await Promise.all([p0, p1, p2, p3])
})

describe('DB Record', () => {
  test('it has 4 default persons on db', async () => {
    const personsAtStart = await helper.savedPersons()
    expect(personsAtStart.length).toBe(4)
  })
})

describe('POST persons', () => {
  test('it can create new person info', async () => {
    const personsAtStart = await helper.savedPersons()
    const person = {
      name: 'Rufus J. Hagues',
      number: '123-1234567',
    }

    const post = await request(app).post('/api/persons').send(person)
    expect(post.type).toEqual('application/json')
    expect(post.status).toEqual(201)
    expect(post.body).toHaveProperty('number')

    const personsAtEnd = await helper.savedPersons()
    expect(personsAtEnd).toHaveLength(personsAtStart.length + 1)

    const names = personsAtEnd.map((person) => person.name)
    const numbers = personsAtEnd.map((person) => person.number)

    expect(names).toContain(person.name)
    expect(numbers).toContain(person.number)
  })
})

describe('GET persons', () => {
  test('it can list all persons', async () => {
    const personsOnDB = await helper.savedPersons()

    const response = await request(app).get('/api/persons')
    expect(response.type).toEqual('application/json')
    expect(response.statusCode).toEqual(200)
    expect(Array.isArray(response.body)).toBeTruthy()

    const names = personsOnDB.map((person) => person.name)
    const numbers = personsOnDB.map((person) => person.number)
    expect(names[1]).toBe(helper.persons[1].name)
    expect(numbers[1]).toBe(helper.persons[1].number)
    expect(personsOnDB).toHaveLength(5)
  })
})
describe('GET person', () => {
  test('it can retrieve a person based on ID', async () => {
    const personsOnDB = await helper.savedPersons()
    const ids = personsOnDB.map((person) => person.id)

    const response = await request(app).get(`/api/persons/${ids[1]}`)
    expect(response.statusCode).toEqual(200)

    expect(response.body.name).toEqual(helper.persons[1].name)
    expect(response.body.number).toEqual(helper.persons[1].number)
  })
})
describe('DELETE person', () => {
  test('it can delete a person based on ID', async () => {
    const personsOnDB = await helper.savedPersons()
    const ids = personsOnDB.map((person) => person.id)

    const response = await request(app).delete(`/api/persons/${ids[3]}`)
    expect(response.statusCode).toEqual(200)
    expect(response.body.details).toBe(`${helper.persons[3].name} deleted!`)
    const currentPersonsOnDB = await helper.savedPersons()
    expect(currentPersonsOnDB).toHaveLength(personsOnDB.length - 1)
  })
})
describe('Update person', () => {
  test('it can update a person based on ID', async () => {
    const personsOnDB = await helper.savedPersons()
    const ids = personsOnDB.map((person) => person.id)

    const person = {
      name: 'Isaac X. Clarke',
      number: '000-09876540',
    }

    const response = await request(app)
      .put(`/api/persons/${ids[0]}`)
      .send(person)
    expect(response.statusCode).toEqual(200)
    expect(response.body.name).toBe(person.name)
    expect(response.body.number).toBe(person.number)
    expect(response.body.id).toEqual(ids[0])
  })
})
describe('GET Info', () => {
  test('it can check endpoint info', async () => {
    const response = await request(app).get('/api/info')
    expect(response.statusCode).toEqual(200)
    expect(response.body.details).toEqual(
      `Phonebook has info for 4 people ${new Date()}`
    )
  })
})

afterAll(async () => {
  await PersonInfo.deleteMany({})
  await mongoose.connection.close()
})
