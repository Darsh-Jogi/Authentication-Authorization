import express from 'express';
import dotenv from 'dotenv'
import { ConnectDB } from './configs/ConnectDB.js';
import AuthRouter from './routes/Auth.route.js'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3300

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/auth', AuthRouter)

app.listen(PORT, async () => {
    await ConnectDB()
    console.log(`server is running on ${process.env.SERVER_URL}:${PORT}`)
})