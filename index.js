const express = require('express')
const app = express();
const path = require('path')
const bodyParser = require('body-parser')

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('./frontend'))
const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/myapp'
mongoose.connect(url)
const db = mongoose.connection
db.on('open', () => {
    console.log("database connected");
})
app.get('/', (req, res) => {
    console.log('1');
    res.sendFile(path.join(__dirname + '/frontend/index.html'))
})
app.get('/registration', (req, res) => {
    console.log('2');
    res.sendFile(path.join(__dirname + '/frontend/registration.html'))


})
app.post('/store', (req, res) => {
    console.log('inside post');
    const name = req.body.name1
    const phone = req.body.phone1
    const email = req.body.email1
    const data = {
        'name': name,
        'phone': phone,
        'email': email
    }
    console.log(data);
    db.collection('Info').insertOne(data, (err, collection) => {
        if (err) {
            throw console.error();
        } else {
            console.log('inseted');
        }
    })



})
app.get('/data', function(req, res) {
    db.collection('Info').find({}).toArray((err, result) => {
        if (err) {
            throw console.error();
        } else {
            console.log(result);

        }
        var dataToSendToClient = result;
        var res = _.sample(result, 2)
        var JSONdata = JSON.stringify(res);
        res.send(JSONdata);
    })


});



app.listen(9000, () => {
    console.log("server is runing on port 9000");
})