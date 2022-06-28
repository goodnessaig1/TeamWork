// /* eslint-disable  */
// let chai = require('chai');
// let chaiHttp = require('chai-http');
// let server = require('../index');
// const pool = require('../models/db')

// // ASSERTION STYLE
// chai.should();

// chai.use(chaiHttp);
//     const email = "goodnessadigd213@gmail.com"


// describe('ADMIN AND EMPLOYEE CREATE ACCOUNT AND SIGNUP ROUTES',()=>{
    
    
//     // TESTING THE CREATE-ACCOUNT ROUTE
//     describe('POST /auth/v1/create-user',()=>{
//         it('it should create a new user', (done)=>{
//             chai.request(server)
//             .post('/auth/v1/create-user')
//             .send(
//                 {
//                 "firstName": "goodness",
//                 "lastName": "ose",
//                 "email": email,
//                 "password": "password123",
//                 "gender": "MALE",
//                 "jobRole" : "Developer",
//                 "department": "Admin",
//                 "isAdmin" : true,
//                 "address": "No 43 endurance street"
//             }
//             )
//             .end((err, response) =>{
//                 response.should.have.status(201)
//                 response.body.should.be.a('object');
//                 response.body.should.have.property('status').eq('success');
//                 done();
//             })
//         })

//         //  IT SHOULD DELETE ANY USER WITH THIS EMAIL SO IT CAN RE-REGISTER
//       after(async () => {
//         await pool.query('DELETE FROM users WHERE email =$1',[email]);
//     });

    
//         it('It should not be able to create a user if user with same email exist', (done)=>{
//             chai.request(server)
//             .post('/auth/v1/create-user')
//             .send(
//                 {
//                 "firstName": "goodness",
//                 "lastName": "ose",
//                 "email": "goodness@gmail.com",
//                 "password": "password123",
//                 "gender": "MALE",
//                 "jobRole" : "Developer",
//                 "department": "Admin",
//                 "isAdmin" : true,
//                 "address": "No 43 endurance street"
//             }
//             )
//             .end((err, response) =>{
//                 response.should.have.status(401)
//                 response.body.should.be.a('object');
//                 response.body.should.have.property('message').eq('User with this email already exist');
//                 done();
//             })
//         })
        
//         it('it should not be able to create a user with an invalid email', (done)=>{
//             chai.request(server)
//             .post('/auth/v1/create-user')
//             .send(
//                 {
//                 "firstName": "goodness",
//                 "lastName": "ose",
//                 "email": "goodnessgmailcom",
//                 "password": "password123",
//                 "gender": "MALE",
//                 "jobRole" : "Developer",
//                 "department": "Admin",
//                 "isAdmin" : true,
//                 "address": "No 43 endurance street"
//             }
//             )
//             .end((err, response) =>{
//                 response.should.have.status(412)
//                 response.body.should.be.a('object');
//                 response.body.should.have.property('message').eq('Validation failed');
//                 done();
//             })
//         })

//         it('it should not be able to create a user with a short length of password', (done)=>{
//             chai.request(server)
//             .post('/auth/v1/create-user')
//             .send(
//                 {
//                 "firstName": "goodness",
//                 "lastName": "ose",
//                 "email": "goodness@gmailcom",
//                 "password": "passs",
//                 "gender": "MALE",
//                 "jobRole" : "Developer",
//                 "department": "Admin",
//                 "isAdmin" : true,
//                 "address": "No 43 endurance street"
//             }
//             )
//             .end((err, response) =>{
//                 response.should.have.status(412)
//                 response.body.should.be.a('object');
//                 response.body.should.have.property('message').eq('Validation failed');
//                 done();
//             })
//         })

//   });

//     // LOGIN ROUTE TEST
// describe('POST /auth/v1/login',()=>{
//     it('It should login a user with a valid email and password', (done)=>{
//             chai.request(server)
//             .post('/auth/v1/login')
//             .send(
//                 {
//                 "email": "goodness@gmail.com",
//                  "password": "password123",
//             }
//             )
//             .end((err, response) =>{
//                 response.should.have.status(200)
//                 response.body.should.be.a('object');
//                 response.body.should.have.property('status').eq('success');
//                 done();
//             })
//         })
    
//         it('It should not login a user with an invalid email and password', (done)=>{
//             chai.request(server)
//             .post('/auth/v1/login')
//             .send(
//                 {
//                 "email": "goodness43@gmail.com",
//                 "password": "passwo123",
//             }
//             )
//             .end((err, response) =>{
//                 response.should.have.status(401)
//                 response.body.should.be.a('object');
//                 response.body.should.have.property('message').eq('password or email incorrect');
//                 done();
//             })
//         })

//     })

// })