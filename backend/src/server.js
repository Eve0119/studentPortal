import express from "express"
import studentRoutes from './routes/studentRoutes.js'
import {connectDB} from './config/db.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

connectDB();

app.use("/api/student", studentRoutes)

app.listen(PORT, () => {
    console.log("Server is running on port:", PORT)
})

