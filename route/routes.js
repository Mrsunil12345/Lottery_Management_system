const express = require('express')
const router = express.Router()
const path = require('path')
const mongoose = require('mongoose')
const db = mongoose.model('User')


router.get('/', (req, res) => {

    res.render('index')
})
router.get('/registration', (req, res) => {

    res.render('registration')


})
router.get('/admin', (req, res) => {

    res.render('admin')
})
router.get('/contact', (req, res) => {
    // console.log('2');
    res.render('contactUs')
})
router.post('/store', (req, res) => {
    const user = new db()
    user.name = req.body.name1
    user.phone = req.body.phone1
    user.city = req.body.city
    user.status = false

    console.log(req.body);
    user.save((err, data) => {
        if (!err) {
            res.redirect('/')
        } else {
            console.log("error")
        }
    })


})
router.get('/data', function(req, res) {
    db.find((err, data) => {
        if (!err) {
            var dataToSendToClient = data;
            var JSONdata = JSON.stringify(dataToSendToClient);
            res.send(JSONdata);
        } else {
            console.log('error')
        }
    })
})




router.post('/update', (req, res) => {
    var content = ''
    req.on("data", (data) => {
        content = content + data
        console.log(content);
        var obj = JSON.parse(content);
        const id1 = (obj.d1);
        const id2 = (obj.d2)
        db.updateOne({ _id: id1 }, { $set: { status: true } }, (err, result) => {
            if (err) {
                console.log(err);

            } else {
                console.log(result);
            }
        })
        db.updateOne({ _id: id2 }, { $set: { status: true } }, (err, result) => {
            if (err) {
                console.log(err);

            } else {
                console.log(result);
            }
        })


    });
})

module.exports = router