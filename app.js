const express = require('express');
const cookieParser = require('cookie-parser');

/* .env */
require('dotenv').config();

const app = express();

/* Routes */
const router = require('./routes');
const ejsRouter = require('./routes/ejs.routes');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', router);
app.use(ejsRouter);

/* views */
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));

app.listen(process.env.PORT, () => {
  console.log(`서버가 실행되었습니다. http://127.0.0.1:${process.env.PORT}`);
});
