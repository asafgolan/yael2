const express = require('express');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const cookieParser = require("cookie-parser");
const cors = require('cors');



require("dotenv").config();


const {todoRouter} = require('./routers/todoRouter');
const {userRouter} = require('./routers/userRouter');

const app = express();
const PORT = 3001;



app.use(expressJwt({secret: process.env.JWT_SECRET}).unless({path: ['/users/login/','/users/signup/','/users/signout/']}));
app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use('/users', userRouter);
app.use('/todos', todoRouter);

app.listen(PORT, () => {
    console.log('server is up');
});
