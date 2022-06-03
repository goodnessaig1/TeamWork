let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');

// ASSERTION STYLE
chai.should();

chai.use(chaiHttp);


describe('GIF UPLOAD IMAGE TO CLOUDINARY ',()=>{
    // TESTING THE CREATE-ACCOUNT ROUTE
    describe('POST /v1/gifs',()=>{
        it('It should post an image to cloudinaary and also return the link', (done)=>{
            chai.request(server)
            .post('/v1/gifs')
            .send(
                {
                    "title": "An image",
                    "image":  "images/vintage.png"
                }
            )
            .end((err, response) =>{
                response.should.have.status(201)
                response.body.should.be.a('object');
                response.body.should.have.property('status').eq('success');
                done();
            })
        })
        // it('It should not post an image that is invalid', (done)=>{
        //     chai.request(server)
        //     .post('/v1/gifs')
        //     .send(
        //         {
        //             "title": "An image",
        //             "image":  "images/vinta"
        //         }
        //     )
        //     .end((err, response) =>{
        //         response.should.have.status(201)
        //         response.body.should.be.a('object');
        //         response.body.should.have.property('message').eq('success');
        //         done();
        //     })
        // })
        })


 })