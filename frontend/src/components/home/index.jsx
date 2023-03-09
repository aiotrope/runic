import * as React from 'react'
import { Box } from '@chakra-ui/react'

import List from '../list'
import CreateForm from '../form/create'

const Home = () => {
  return (
    <Box>
      <CreateForm />
      <List />
    </Box>
  )
}

export default Home
