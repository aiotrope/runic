import express from 'express'
import PersonInfo from '../models/person'

const router = express.Router()

router.post('/reset', async (req, res) => {
  await PersonInfo.deleteMany({})
  res.status(204).end()
})

module.exports = router
