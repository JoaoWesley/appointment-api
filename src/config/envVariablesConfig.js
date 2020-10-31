import dotenv from 'dotenv'

dotenv.config()

export default {
  APP_ENV: process.env.APP_ENV,
  PORT: process.env.PORT,  
  CLIENT_BASE_URL: process.env.CLIENT_BASE_URL,
  DATABASE_URL: process.env.CLIENT_BASE_URL
}
