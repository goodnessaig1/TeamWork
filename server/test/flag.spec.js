let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');



// ASSERTION STYLE
chai.should();

chai.use(chaiHttp);



describe('FLAG AN ARTICLE',()=>{
    describe('POST /v1/flag',()=>{
        it('It should update a post that is termed inappropriate to true', (done)=>{
            chai.request(server)
            .patch('/v1/flag/1')
            .send(
                {
                    "flagged": true
                }
            )
            .end((err, response) =>{
                response.should.have.status(200)
                response.body.should.be.a('object');
                response.body.should.have.property('status').eq('success');
                done();
            })
        })
        it('It should not update any article which articleId is invalid', (done)=>{
            chai.request(server)
            .patch('/v1/flag/123')
            .send(
                {
                    "flagged": true
                }
            )
            .end((err, response) =>{
                response.should.have.status(404)
                response.body.should.be.a('object');
                response.body.should.have.property('status').eq('Failed');
                done();
            })
        })
    })
})