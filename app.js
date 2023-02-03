const express = require('express');
const router = express.Router();

/* .env */
require('dotenv').config();

const app = express();

/* Routes */
const ejsRouter = require('./routes/ejs.routes');
const signinRouter = require('./routes/signin');
const signupRouter = require('./routes/signup');
const adminMenuRouter = require('./routes/menu');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(ejsRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(adminMenuRouter);

/* views */
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));

app.listen(process.env.PORT, () => {
  console.log(`서버가 실행되었습니다. http://127.0.0.1:${process.env.PORT}`);
});
