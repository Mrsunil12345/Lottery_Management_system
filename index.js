const express = require('express')
const app = express();
const path = require('path')
const bodyParser = require('body-parser')

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('./frontend'))
const mongoose = require('mongoose');
const { json } = require('body-parser');
const { deflateRawSync } = require('zlib');
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
app.get('/admin', (req, res) => {
    //console.log('2');
    res.sendFile(path.join(__dirname + '/frontend/admin.html'))
})
app.get('/contact', (req, res) => {
    // console.log('2');
    res.sendFile(path.join(__dirname + '/frontend/contactUs.html'))
})
app.post('/store', (req, res) => {

    const name = req.body.name1
    const phone = req.body.phone1
    const city = req.body.city
    const data = {
            'name': name,
            'phone': phone,
            'city': city,
            'status': false
        }
        // console.log(data);
    db.collection('Info').insertOne(data, (err, collection) => {
        if (err) {
            throw console.error();
        } else {
            console.log('data inseted');
        }
    })
    res.send("data inserted")



})
app.get('/data', function(req, res) {
    db.collection('Info').find({}).toArray((err, result) => {
        if (err) {
            throw console.error();
        } else {
            //console.log(result);

        }
        var dataToSendToClient = result;

        var JSONdata = JSON.stringify(dataToSendToClient);
        res.send(JSONdata);
    })


});

app.post('/update', (req, res) => {
    var content = ''
    req.on("data", (data) => {
        content = content + data
        console.log(content);
        var obj = JSON.parse(content);
        console.log(obj.d1);
        db.Info.aggregate([{
                $addFields: { "status": false }
            }])
            //  db.Info.update()
    });
})


app.listen(9000, () => {
    console.log("server is runing on port 9000");
})