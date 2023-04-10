const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res, next) => {
    res.json({"msg": "Success"});
});

app.listen(8001, () => {
  console.log("User service working on port 8001!")
});