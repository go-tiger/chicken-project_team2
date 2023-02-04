const express = require('express');
const router = express.Router();

const app = express();

const signinRouter = require('./signin');
const signupRouter = require('./signup');
const adminMenuRouter = require('./menu');

app.use(signinRouter);
app.use(signupRouter);
app.use(adminMenuRouter);

module.exports = router;
