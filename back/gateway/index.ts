import express from 'express'
import cors from 'cors'
import proxy from 'express-http-proxy'
import { config } from 'dotenv';

config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/user', proxy('http://localhost:8001'));
app.use('/test', proxy('http://localhost:8002'));
app.use('/company', proxy('http://localhost:8003'));

app.listen(process.env.PORT, () => {
  console.log(`Gateway service working on port ${process.env.PORT}!`)
});