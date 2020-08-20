const express = require('express');

//Routes
const postRoute = require('./Routes/postRoute');
const todosRoute = require('./Routes/todosRoute');
//Middlewares
const pw = require('./midddlewares/testMiddle');

const app = express({strict: true});
const mainRoute= '/todos/api';

app.use(mainRoute,  postRoute);
app.use(mainRoute, todosRoute);

app.listen(process.env.PORT || 3000, ()=>{
    console.log('Server up and running!');
})