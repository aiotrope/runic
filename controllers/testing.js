const express = require('express')
const PersonInfo = require('../models/person')

const router = express.Router()

router.post('/reset', async (req, res) => {
  await PersonInfo.deleteMany({})
  res.status(204).end()
})

module.exports = router
