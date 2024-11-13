import express from 'express';
import dotenv from 'dotenv'
import { ConnectDB } from './configs/ConnectDB.js';
import AuthRouter from './routes/Auth.route.js'
import bodyParser from 'body-parser';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3300

app.use(bodyParser.json());
app.use('/auth', AuthRouter)

app.listen(PORT, async () => {
    await ConnectDB()
    console.log(`server is running on http://localhost:${PORT}`)
})