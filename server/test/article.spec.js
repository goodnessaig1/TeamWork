// let chai = require('chai');
// let chaiHttp = require('chai-http');
// let server = require('../index');
// const pool = require('../models/db')


// const title = "Political Education"

// // ASSERTION STYLE
// chai.should();

// chai.use(chaiHttp);
//  let token;

// describe('POST ARTICLE ',()=>{
//      before((done) => {
//       done()
//   })
//  afterEach(async () => {
//     await pool.query('DELETE FROM articles WHERE title =$1',[title]);
//   });

//   // LOGIN FIRST IN ORDER TO GET YOUR VALID TOKEN
//     describe('POST /auth/v1/login',()=>{
//     it('It should login a user with a valid email and password', (done)=>{
//             chai.request(server)
//             .post('/auth/v1/login')
//             .set('Accept', 'application/json')
//             .send(
//                 {
//                 "email": "goodness@gmail.com",
//                  "password": "password123",
//             }
//             )
//             .end((err, res) =>{
//                token = res.body.data.token;
//                 done();
//             })
//         })

//     // POST ARTICLE
//         it('It should post an article with a title under a specific category', (done)=>{
//             chai.request(server)
//             .post('/v1/articles')
//             .set('token', token)
//             .send(
//                 {
//                    "title": title,
//                    "article": "This article is all about politics",
//                    "categoryId": "4"
//                 }
//             )
//             .end((err, response) =>{
//                 response.should.have.status(201)
//                 response.body.should.be.a('object');
//                 response.body.should.have.property('status').eq('success');
//                 done();
//             })
//         })

//         it('It should not post any article if the categoryId is invalid', (done)=>{
//             chai.request(server)
//             .post('/v1/articles')
//             .set('token', token)
//             .send(
//                 {
//                    "title": title,
//                    "article": "This article is all about politics",
//                    "categoryId": "423"
//                 }
//             )
//             .end((err, response) =>{
//                 response.should.have.status(404)
//                 response.body.should.be.a('object');
//                 done();
//             })
//         })
        
//         it('It should not post any article if the user token is invalid', (done)=>{
//             chai.request(server)
//             .post('/v1/articles')
//             .set('token', "Bearer")
//             .send(
//                 {
//                    "title": title,
//                    "article": "This article is all about politics",
//                    "categoryId": "4"
//                 }
//             )
//             .end((err, response) =>{
//                 response.should.have.status(400)
//                 response.body.should.be.a('object');
//                 done();
//             })
//         })      
//     })
    
// //  THIS TEST IS TO FLAG ARTICLES MARKED AS INAPPROPRIATE
// describe('POST /v1/flag',()=>{
//         it('It should update a post that is termed inappropriate to true', (done)=>{
//             chai.request(server)
//             .patch('/v1/articles/1/flag')
//             .send(
//                 {
//                     "flagged": true
//                 }
//             )
//             .end((err, response) =>{
//                 response.should.have.status(200)
//                 response.body.should.be.a('object');
//                 response.body.should.have.property('status').eq('success');
//                 done();
//             })
//         })
//         it('It should not update any article which articleId is invalid', (done)=>{
//             chai.request(server)
//             .patch('/v1/articles/123/flag')
//             .send(
//                 {
//                     "flagged": true
//                 }
//             )
//             .end((err, response) =>{
//                 response.should.have.status(404)
//                 response.body.should.be.a('object');
//                 response.body.should.have.property('status').eq('Failed');
//                 done();
//             })
//         })
//         it('It should be a boolean else, render an error', (done)=>{
//             chai.request(server)
//             .patch('/v1/articles/1/flag')
//             .send(
//                 {
//                     "flagged": "This is a string"
//                 }
//             )
//             .end((err, response) =>{
//                 response.should.have.status(400)
//                 response.body.should.be.a('object');
//                 response.body.should.have.property('success').eq(false);
//                 done();
//             })
//         })
//     })
// })