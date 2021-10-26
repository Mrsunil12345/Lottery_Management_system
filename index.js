require('./model/db')
const express = require('express')
const app = express();
const path = require('path')
const bodyParser = require('body-parser')
const router = require('./route/routes')



app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


app.use(express.static(__dirname + '/public'))

app.set('view engine', 'ejs');



app.listen(9000, () => {
    console.log("server is runing on port 9000");
})
app.use('/', router)