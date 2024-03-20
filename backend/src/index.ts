import express from 'express';
import cors from 'cors';
import CodeSnippets from './routes/CodeSnippet'
import { configDotenv } from 'dotenv';
import bodyParser from 'body-parser';

const app = express()
configDotenv()

app.use(bodyParser.json())
app.use(express.json())
app.use(cors())

app.use('/api/v1/assignment/striver',CodeSnippets)

app.listen(3000, ()=> {
    console.log("Listening to port 3000")
})