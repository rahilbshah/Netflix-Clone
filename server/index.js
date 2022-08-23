import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import authRoute from './routes/authRoute.js'
import userRoute from './routes/userRoute.js'
import movieRoute from './routes/movieRoute.js'
import listsRoute from './routes/listsRoute.js'

const app = express();
dotenv.config();

const connect=async ()=>{
    try {
      await  mongoose.connect(process.env.MONGO,{ useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,});
        console.log("Connected to MongoDb");
    } catch (error) {
        throw error;
    }
}

mongoose.connection.on("disconnected",()=>{
    console.log("MongoDb Disconnected");
})


//middlewares
app.use(express.json());

app.use('/api/auth',authRoute)
app.use('/api/user',userRoute)
app.use('/api/movies',movieRoute)
app.use('/api/lists',listsRoute)

app.listen(8800,()=>{
    connect()
    console.log("connected to backend");
})