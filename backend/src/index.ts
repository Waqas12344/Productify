import express from "express"
import { ENV } from "./config/env"
import { clerkMiddleware } from '@clerk/express'
import cors from 'cors'
const app = express()

app.use(cors({
    origin: ENV.FRONTEND_URL,
    credentials: true
}))
app.use(clerkMiddleware())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get("/", (req, res) => { 
    
})

app.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT}`)
})