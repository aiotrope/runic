import axios from 'axios'
import config from '../utils/config'

const baseURL = config.base_url

export const http = axios.create({
  baseURL: baseURL,
  timeout: 60000,
})
