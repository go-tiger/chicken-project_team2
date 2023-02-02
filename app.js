const express = require('express');
const router = express.Router();

/* .env */
require('dotenv').config();

const app = express();

/* Routes */
const signupRouter = require('./routes/signup')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(signupRouter);

app.listen(process.env.PORT, () => {
  console.log(`서버가 실행되었습니다. http://127.0.0.1:${process.env.PORT}`);
});