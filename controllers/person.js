const express = require('express')
require('express-async-errors')
const PersonInfo = require('../models/person')

const router = express.Router()

router.get('/persons', async (req, res) => {
  const persons = await PersonInfo.find({})
  res.status(200).json(persons)
})

router.delete('/persons/:id', async (req, res) => {
  const id = req.params.id
  const name = await PersonInfo.findById(id)
  const person = await PersonInfo.findByIdAndDelete(id)
  if (!person) throw Error('Person not found!')
  res.status(200).json({ details: `${name?.name} deleted!` })
})

router.post('/persons', async (req, res) => {
  const { name, number } = req.body

  const person = new PersonInfo({
    name: name,
    number: number,
  })

  const newPerson = await PersonInfo.create(person)
  res.status(201).json(newPerson)
})

router.put('/persons/:id', async (req, res) => {
  const id = req.params.id
  const name = req.body.name
  const number = req.body.number

  const update = {
    name: name,
    number: number,
  }

  const opts = { new: true, runValidators: true, context: 'query' }

  const updatePersonInfo = await PersonInfo.findOneAndUpdate(
    { _id: id },
    update,
    opts
  )
  if (!updatePersonInfo) throw Error('Person not found!')
  res.status(200).json(updatePersonInfo)
})

router.get('/info', async (req, res) => {
  const count = await PersonInfo.countDocuments()
  res
    .status(200)
    .json({ details: `Phonebook has info for ${count} people ${new Date()}` })
})

router.get('/persons/:id', async (req, res) => {
  const person = await PersonInfo.findById(req.params.id)
  if (!person) throw Error('Person not found!')
  res.status(200).json(person)
})

module.exports = router
