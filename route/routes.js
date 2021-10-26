const express = require('express')
const router = express.Router()
const path = require('path')


router.get('/', (req, res) => {
    console.log('1');
    res.render('index')
})
router.get('/registration', (req, res) => {
    console.log('2');
    res.render('registration')


})
router.get('/admin', (req, res) => {
    //console.log('2');
    res.render('admin')
})
router.get('/contact', (req, res) => {
    // console.log('2');
    res.render('contactUs')
})
router.post('/store', (req, res) => {

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


})
router.get('/data', function(req, res) {
    db.collection('Info').find({}).toArray((err, result) => {
        if (err) {
            throw console.error();
        } else {
            //console.log(result);

        }
    })



router.post('/update', (req, res) => {
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

module.exports = router