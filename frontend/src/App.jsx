import * as React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Container, VStack, Heading, Box } from '@chakra-ui/react'

import './utils/scss/_App.scss'

import Home from './components/home/index'
import Person from './components/person/index'
import { NotFound } from './components/notfound'

const App = () => {
  return (
    <VStack>
      <Container>
        <Box mt="6rem">
          <Heading as="h1" size="2xl">
            <Link to={'/'} id="app-name">
              Phonebook
            </Link>
          </Heading>
        </Box>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/person/:id" element={<Person />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </VStack>
  )
}

export default App
