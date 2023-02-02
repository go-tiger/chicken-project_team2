const express = require('express');
const router = express.Router();

const signinRouter = require('./routes/signin.js');
const { sequelize } = require('./models');

const app = express();
app.use(express.json());

require('dotenv').config();

app.get('/', (req, res) => {
  res.send('초기페이지입니다.');
});

app.use(signinRouter);

app.listen(process.env.PORT, () => {
  console.log(`서버가 실행되었습니다. http://127.0.0.1:${process.env.PORT}`);
});
