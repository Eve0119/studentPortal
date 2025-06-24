import express from "express"
import studentRoutes from './routes/studentRoutes.js'

const app = express()

app.use("/api/student", studentRoutes)

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})