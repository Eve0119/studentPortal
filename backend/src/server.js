import express from "express"
import dotenv from 'dotenv'
import cors from 'cors'
import studentRoutes from './routes/studentRoutes.js'
import {connectDB} from './config/db.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

//middleware to access body and params of request
app.use(express.json())
app.use(cors({origin: 'http://localhost:5173'}))
app.use("/api/student", studentRoutes)


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on port:", PORT)
})
})


