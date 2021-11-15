const assert = require('assert');

const request = require('supertest');
const app = require('../index')
const chai = require('chai')
const chaiHttp=require('chai-http')
const db=require('../model/model')

chai.should()
chai.use(chaiHttp)


//tesitng the regidtartion page
describe('Unit testing the home registration routes', function() {

    it('should return OK status', function(done) {
      chai.request(app)
        .get('/registration')
        .end((err,response)=>{
            response.should.have.status(200)
        done() 
        })
    });
});

//testing the home page
describe('Unit testing the home page', function() {

    it('should return OK status', function(done) {
     chai.request(app)
        .get('/')
        .end((err,response)=>{
            response.should.have.status(200)
        })
        done()
    });
});

//testing the admin page
describe('Unit testing the index page', function() {

    it('should return OK status', function(done) {
      chai.request(app)
        .get('/admin')
        .end((err,response)=>{
            response.should.have.status(200)
        done()    
        })
    });
});

//testing the contact page
describe('Unit testing the admin page', function() {

    it('should return OK status', function(done) {
      chai.request(app)
        .get('/contact')
       .end((err,response)=>{
           response.should.have.status(200)

       done()    
       })
    });
});

//testing the mongodb connection
describe('Reading Details of User from database', () => {
    it('Finds user with the name', (done) => {
        db.findOne({ name: 'sunil' })
            .then((user) => {
                assert(user.name === 'sunil');
                done();
            });
    })
})

//

describe('Unit ajax request /data', function() {

    it('should return OK status', function(done) {
      chai.request(app)
        .get('/data')
        .end((err,response)=>{
            response.should.have.status(200)
            response.should.be.a('object')
         done()   
        })
    });
});

// //testing the ajax request for the update 
describe('Unit ajax request /data', function() {

    it('should return OK status', function(done) {
      chai.request(app)
        .post('/update')
        .end((err,response)=>{
            response.should.have.status(200)
            response.should.be.a('object')
        done()    
        })
    });
});


describe('Unit ajax request /store', function() {

    it('should return OK status', function(done) {
      chai.request(app)
        .post('/store')
        .end((err,response)=>{
            response.should.have.status(200)
         //  response.body.should.have.property('name')
           response.should.be.a('object')
        done()    
        })
    });
});