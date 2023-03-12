import * as React from 'react'
import { Box, Stack, Badge } from '@chakra-ui/react'

import List from '../list'
import CreateForm from '../form/create'

const Home = () => {
  return (
    <Box>
      <CreateForm />
      <List />
      <Stack direction="row">
        <Badge variant="solid" colorScheme="green" my="7rem">
          Status: Approved
        </Badge>
      </Stack>
    </Box>
  )
}

export default Home
