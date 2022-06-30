let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
const pool = require('../models/db')


const comment = "This is my second comment on my third post"
 afterEach(async () => {
    await pool.query('DELETE FROM gif_comment WHERE comments =$1',[comment]);
  });

// ASSERTION STYLE
chai.should();

chai.use(chaiHttp);
 let token;

describe('GIF UPLOAD IMAGE TO CLOUDINARY ',()=>{
    // LOGIN FIRST IN ORDER TO GET YOUR VALID TOKEN
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
            .set("token", `Bearer ${token}` )
            .send(
                {
                    "title": "An image",
                    "image":  "images/vintage.png"
                }
            )
            .end((err, response) =>{
                response.should.have.status(201)
                response.body.should.be.a('object');
                done();
            })
        })
        it('It should not post an image that is invalid', (done)=>{
            chai.request(server)
            .post('/v1/gifs')
            .set("token", `Bearer ${token}` )
            .send(
                {
                    "title": "An image",
                    "image":  "images/vinta"
                }
            )
            .end((err, response) =>{
                response.should.have.status(500)
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
            // .set('token', token)
            .set("token", `Bearer ${token}` )
            .send(
                {
                   "comment": comment
                }
            )
            .end((err, response) =>{
                response.should.have.status(201)
                response.body.should.be.a('object');
                done();
            })
        })

        it('It should not post a comment comment if the user has no token', (done)=>{
            chai.request(server)
            .post('/v1/gifs/1/comment')
            .set("token", `Bearer` )
            .send(
                {
                   "comment": comment
                }
            )
            .end((err, response) =>{
                response.should.have.status(401)
                response.body.should.be.a('object');
                done();
            })
        })
        })


 })