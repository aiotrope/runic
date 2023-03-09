import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

import App from './App'
import './utils/scss/_index.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))
const queryClient = new QueryClient()

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </Router>
    </QueryClientProvider>
  </React.StrictMode>
)
