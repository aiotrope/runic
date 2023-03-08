import dotenv from 'dotenv'

dotenv.config()

const DATABASE_URL_DEV = process.env.DATABASE_URL_DEV
const DATABASE_URL_TEST = process.env.DATABASE_URL_TEST
const DATABASE_URL = process.env.DATABASE_URL
const PORT = process.env.PORT || 8000
const DB_NAME = process.env.DB_NAME

const config = {
  database_url_dev: DATABASE_URL_DEV,
  database_url_test: DATABASE_URL_TEST,
  database_url: DATABASE_URL,
  port: PORT,
  db_name: DB_NAME,
}

export default config
