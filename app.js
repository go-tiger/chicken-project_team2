const express = require('express');
const app = express();
const signupRouter = require('./routes/signup')

app.use(signupRouter);

require('dotenv').config();

app.get('/', (req, res) => {
  res.send('초기페이지입니다.');
});

app.listen(process.env.PORT, () => {
  console.log(`서버가 실행되었습니다. http://127.0.0.1:${process.env.PORT}`);
});


