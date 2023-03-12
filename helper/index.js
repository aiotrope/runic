const PersonInfo = require('../models/person')

const persons = [
  {
    name: 'Isaac J. Clarke',
    number: '435-61565498',
  },
  {
    name: 'Juan I. Dela Cruz',
    number: '911-98765432',
  },
  {
    name: 'Amber F. Alert',
    number: '10-1234567',
  },
  {
    name: 'James M. Moore',
    number: '44-09876543',
  },
]

const savedPersons = async () => {
  const persons = await PersonInfo.find({})
  return persons.map((person) => person.toJSON())
}

const helper = {
  persons,
  savedPersons,
}

module.exports = helper
