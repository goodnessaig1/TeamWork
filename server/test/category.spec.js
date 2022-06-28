let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
const pool = require('../models/db')


// ASSERTION STYLE
chai.should();

chai.use(chaiHttp);

const categoryName = "election"

  const email = "goodness1111@gmail.com"


let token;
let isNotAdminToken


describe('CREATE A USER ACCOUNT THATS NOT AN ADMIN',()=>{
    // TESTING THE CREATE-ACCOUNT ROUTE
    describe('CHECK IF USER WITH EMAIL ALREADY EXIST',()=>{
         before(async () => {
        await pool.query('SELECT * FROM users WHERE email =$1',[email]);
    });

    describe('POST /auth/v1/create-user',()=>{
        it('it should create a user account', (done)=>{
            chai.request(server)
            .post('/auth/v1/create-user')
            .send(
                {
                "firstName": "goodness",
                "lastName": "ose",
                "email": email,
                "password": "password123",
                "gender": "MALE",
                "jobRole" : "Developer",
                "department": "Admin",
                "isAdmin" : false,
            }
            )
            .end((err, response) =>{
                response.should.have.status(201)
                response.body.should.be.a('object');
                response.body.should.have.property('status').eq('success');
                done();
            })
        })
    })
      after(async () => {
        await pool.query('DELETE FROM users WHERE email =$1',[email]);
        // DELETE THIS USER AFTER CREATION
    });

     describe('POST /auth/v1/login',()=>{
    it('It should login a user who is not an admin', (done)=>{
            chai.request(server)
            .post('/auth/v1/login')
            .set('Accept', 'application/json')
            .send(
                {
                "email": email,
                "password": "password123"
            }
            )
            .end((err, res) =>{
               isNotAdminToken = res.body.data.token;
                done();
            })
        })
   })
   })
   
   // THIS USER IS NOT AN ADMIN
   describe('POST /v1/categories',()=>{
        it('Users who are not admin should not be able to post any category', (done)=>{
            chai.request(server)
            .post('/v1/categories')
            .set("token", `Bearer ${isNotAdminToken}` )
            .send(
                {
                    "categoryName": "Economy"
                }
            )
            .end((err, response) =>{
                response.should.have.status(400)
                response.body.should.be.a('object');
                done();
            })
        })
    })
  })
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
            .set("token", `Bearer ${token}` )
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
  
        after(async () => {
         await pool.query('DELETE FROM categories WHERE category_name =$1',[categoryName]);
        });
  
        it('It should not post a categoryName with length greater than 12', (done)=>{
            chai.request(server)
            .post('/v1/categories')
            .set("token", `Bearer ${token}` )
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
                response.should.have.status(400)
                response.body.should.be.a('object');
                done();
            })
        })
    })


 })