import  Colors  from 'colors'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js';
import authRoute from "./routes/authRoute.js";

// config env
dotenv.config()
// db config
connectDB()

// rest object
const app = express()
//middelware
app.use(express.json())
app.use(morgan('dev'))
//routes
app.use("/api/v1/auth/",authRoute);

// reset api
app.get('/', (req,res) =>{
    res.send("<h1>jishnu</h1>")
})

// port
const PORT = process.env.PORT;

// RUN LISTEN
app.listen(PORT,() =>{
    console.log('server running on port 8080' .bgGreen.black);
})
