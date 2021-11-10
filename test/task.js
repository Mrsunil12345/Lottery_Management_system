var chai=require('chai')
var chaiHttp=require('chai-http')
var server=require('../index')
const { expect }=chai
chai.use(chaiHttp)



    describe('POST /store',()=>{
        it("it will give the admin page",(done)=>{
            chai.request(server)
                .get('/')
                .end((err,response)=>{
                    if(err) done(err)
                   expect(res).to.have.status(200)

                done()  
                })
        })
    })







