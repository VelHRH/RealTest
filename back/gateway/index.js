import express from 'express'
import cors from 'cors'
import proxy from 'express-http-proxy'

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', proxy('http://localhost:8001')); //users
app.use('/test', proxy('http://localhost:8002'));
app.use('/device', proxy('http://localhost:8003'));
app.use('/company', proxy('http://localhost:8004'));

app.listen(8000, () => {
  console.log("Gateway service working on port 8000!")
});