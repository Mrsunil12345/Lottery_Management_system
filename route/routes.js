const express = require('express')
const router = express.Router()
const path = require('path')
const mongoose = require('mongoose')
const db = mongoose.model('User')

//Route for the home page
router.get('/', (req, res) => {

    res.render('index')
})

//Route for the Registration page
router.get('/registration', (req, res) => {

    res.render('registration')
})

//Route for the admin page
router.get('/admin', (req, res) => {

    res.render('admin')
})

//Route for the contactUs page
router.get('/contact', (req, res) => {
    // console.log('2');
    res.render('contactUs')
})

//Route for the Status field
router.get('/status', (req, res) => {
    // console.log('2');
    res.render('status')
})

router.get('/contactstatus', (req, res) => {
    // console.log('2');
    res.render('contactstatus')
})

router.post('/contactMe', (req, res) => {
   res.redirect('contactstatus')
    
})

//Route for the post request from user registration  page
router.post('/store', (req, res) => {
    const user = new db()
    user.name = req.body.name1
    user.phone = req.body.phone1
    user.city = req.body.city
    user.status = false
    user.save((err, data) => {
        if (!err) {
            res.redirect('status')
        } else {
            console.log("error")
        }
    })
})

//Route for the sending the data to client
router.get('/data', function(req, res) {
    db.find({"status":false},
        (err, data) => {
        if (!err) {
            var dataToSendToClient = data;
            var JSONdata = JSON.stringify(dataToSendToClient);
            res.send(JSONdata);
        } else {
            console.log('error')
        }
    })
})

//Route for the receiving the ajax request from the client 
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
                console.log("updated");
            }
        })
        db.updateOne({ _id: id2 }, { $set: { status: true } }, (err, result) => {
            if (err) {
                console.log(err);

            } else {
                console.log("updated");
            }
        })


    });
    res.end()
})

//Route for the receiving the ajax request from the client 
router.post('/update1', (req, res) => {
    var content = ''
    req.on("data", (data) => {
        content = content + data
        console.log(content);
        var obj = JSON.parse(content);
        const id1 = (obj.d1);
        db.updateOne({ _id: id1 }, { $set: { status: true } }, (err, result) => {
            if (err) {
                console.log(err);

            } else {
                console.log("updated");
            }
        })

    });
    res.end()
})

module.exports = router