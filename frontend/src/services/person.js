import { http } from './http'

const getPersons = async () => {
  const response = await http.get('/persons')
  return response.data
}

const getPerson = async (id) => {
  const response = await http.get(`/persons/${id}`)
  return response.data
}
const createPerson = async (data) => {
  const response = await http.post('/persons', data)
  return response.data
}

const personService = {
  getPersons,
  getPerson,
  createPerson,
}

export default personService
