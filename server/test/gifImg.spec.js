let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
const validation = require("../middleware/validation");


// ASSERTION STYLE
chai.should();

chai.use(chaiHttp);
 let token;

describe('GIF UPLOAD IMAGE TO CLOUDINARY ',()=>{
    // TESTING THE CREATE-ACCOUNT ROUTE
    describe('POST /auth/v1/login',()=>{
    it('It should login a user with a valid email and password', (done)=>{
            chai.request(server)
            .post('/auth/v1/login')
            .set('Accept', 'application/json')
            .send(
                {
                "email": "goodness@gmail.com",
                 "password": "password123",
            }
            )
            .end((err, res) =>{
               token = res.body.data.token;
                done();
            })
        })
        })
    describe('POST /v1/gifs',()=>{
        it('It should post an image to cloudinaary and also return the link', (done)=>{
            chai.request(server)
            .post('/v1/gifs')
            .set("authorization", "Bearer " + token)
            .send(
                {
                    "title": "An image",
                    "image":  "images/vintage.png"
                }
            )
            .end((err, response) =>{
                response.body.should.be.a('object');
                done();
            })
        })
        it('It should not post an image that is invalid', (done)=>{
            chai.request(server)
            .post('/v1/gifs')
            .send(
                {
                    "title": "An image",
                    "image":  "images/vinta"
                }
            )
            .end((err, response) =>{
                response.should.have.status(401)
                response.body.should.be.a('object');
                done();
            })
        })
        
        })

        // GIF COMMENT
        describe('POST /v1/gifs/1/comment',()=>{
        it('It should post a comment', (done)=>{
            chai.request(server)
            .post('/v1/gifs/1/comment')
            .set("authorization", "Bearer" + token)
            .send(
                {
                   "comment": "This is my second comment on my first post"
                }
            )
            .end((err, response) =>{
                response.body.should.be.a('object');
                done();
            })
        })
        })


 })