let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
const pool = require('../models/db')


// ASSERTION STYLE
chai.should();

chai.use(chaiHttp);

const categoryName = "election"

//  IT SHOULD DELETE ANY CATEGORY WITH THIS NAME
  afterEach(async () => {
    await pool.query('DELETE FROM categories WHERE category_name =$1',[categoryName]);
  });

let token;

describe('ADMIN CAN ADD CATEGORIES WHICH USERS CAN USE TO DETERMINE THE FIELD THEY WANT OT WRITE AN ARTICLE ON ',()=>{
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

   describe('POST /v1/categories',()=>{
        it('It should add a category name to the list of categories', (done)=>{
            chai.request(server)
            .post('/v1/categories')
            .set('token', token)
            .send(
                {
                    "categoryName": categoryName
                }
            )
            .end((err, response) =>{
                response.should.have.status(201)
                response.body.should.be.a('object');
                done();
            })
        })
        it('It should not post a categoryName with length greater than 12', (done)=>{
            chai.request(server)
            .post('/v1/categories')
            .set('token', token)
            .send(
                {
                    "categoryName": "lengthybusinesses"
                }
            )
            .end((err, response) =>{
                response.should.have.status(400)
                response.body.should.be.a('object');
                done();
            })
        })
        it('It should not post a categoryName if user has no valid token', (done)=>{
            chai.request(server)
            .post('/v1/categories')
            .send(
                {
                    "categoryName": "lengthybusinesses"
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