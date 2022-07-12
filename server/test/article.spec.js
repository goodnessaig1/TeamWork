let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
const pool = require('../models/db')


const title = "Political Education"

// ASSERTION STYLE
chai.should();

chai.use(chaiHttp);
 let token;
let articleId;
 const comment = "The current state of nigerian politics is becoming something else. And 2023 is the general election. we just pray it ends well ."
describe('POST ARTICLE ',()=>{
     before((done) => {
      done()
  })
 afterEach(async () => {
    await pool.query('DELETE FROM articles WHERE title =$1',[title]);

    await pool.query('DELETE FROM articles_comments WHERE comment =$1',[comment]);
});

  // LOGIN FIRST IN ORDER TO GET YOUR VALID TOKEN
    describe('POST /auth/v1/signin',()=>{
    it('It should login a user with a valid email and password', (done)=>{
            chai.request(server)
            .post('/auth/v1/signin')
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

    // POST ARTICLE
        it('It should post an article with a title under a specific category', (done)=>{
            chai.request(server)
            .post('/v1/articles')
            .set("token", `Bearer ${token}` )
            .send(
                {
                   "title": "Elections in Nigeria",
                   "article": "This article is all about politics",
                   "categoryId": "4"
                }
            )
            .end((err, response) =>{
                response.should.have.status(201)
                response.body.should.be.a('object');
                response.body.should.have.property('status').eq('success');
                articleId = response.body.data.articleId;
                done();
            })
        })

        it('It should not post any article if the categoryId is invalid', (done)=>{
            chai.request(server)
            .post('/v1/articles')
            .set("token", `Bearer ${token}` )
            .send(
                {
                   "title": title,
                   "article": "This article is all about politics",
                   "categoryId": "423"
                }
            )
            .end((err, response) =>{
                response.should.have.status(404)
                response.body.should.be.a('object');
                done();
            })
        })
        
        it('It should not post any article if the user token is invalid', (done)=>{
            chai.request(server)
            .post('/v1/articles')
            .set('token', "Bearer")
            .send(
                {
                   "title": title,
                   "article": "This article is all about politics",
                   "categoryId": "4"
                }
            )
            .end((err, response) =>{
                response.should.have.status(401)
                response.body.should.be.a('object');
                done();
            })
        })      
   
         // UPDATE | EDIT AN ARTICLE
        it('It should  update an article if the user has a valid token and also a valid article id', (done)=>{
            chai.request(server)
            .patch('/v1/articles/35')
            .set("token", `Bearer ${token}` )
            .send(
                {
                   "title": "NIGERIA ELECTION 2023",
                   "article": "This is the updated  article that  is all about politics"
                }
            )
            .end((err, response) =>{
                response.should.have.status(201)
                response.body.should.be.a('object');
                response.body.should.have.property('status').eq('success');
                done();
            })
        })
        it('it should return failed if the article id does not exist', (done)=>{
            chai.request(server)
            .patch('/v1/articles/223')
            .set("token", `Bearer ${token}` )
            .send(
                {
                   "title": "NIGERIA ELECTION 2023",
                   "article": "This is the updated  article that  is all about politics"
                }
            )
            .end((err, response) =>{
                response.should.have.status(404)
                response.body.should.be.a('object');
                response.body.should.have.property('status').eq('Failed');
                done();
            })
        })
        it('it should return Invalid token if theres no token provided', (done)=>{
            chai.request(server)
            .patch('/v1/articles/35')
            .set("token", `Bearer` )
            .send(
                {
                   "title": "NIGERIA ELECTION 2023",
                   "article": "This is the updated  article that  is all about politics"
                }
            )
            .end((err, response) =>{
                response.should.have.status(401)
                done();
            })
        })

        // EMPLOYEES CAN GET ALL ARTILES POSTED
        it('It should be able to get all articles posted', (done)=>{
            chai.request(server)
            .get('/v1/articles')
            .set("token", `Bearer ${token}` )
            .end((err, response) =>{
                response.should.have.status(200)
                response.body.should.be.a('object');
                response.body.should.have.property('status').eq('Success');
                done();
            })
        })

        it('It should not be able to get any article if the user has no token', (done)=>{
            chai.request(server)
            .get('/v1/articles')
            .set("token", `Bearer` )
            .end((err, response) =>{
                response.should.have.status(401)
                done();
            })
        })
        
        // EMPLOYEES CAN GET A SINGLE ARTILE POSTED
        it('It should be able to get a single article article posted', (done)=>{
            chai.request(server)
            .get('/v1/articles/35')
            .set("token", `Bearer ${token}` )
            .end((err, response) =>{
                response.should.have.status(200)
                response.body.should.be.a('object');
                response.body.should.have.property('status').eq('success');
                done();
            })
        })

        it('It should be able to get any article posted if the article with that id does not exist', (done)=>{
            chai.request(server)
            .get('/v1/articles/4')
            .set("token", `Bearer ${token}` )
            .end((err, response) =>{
                response.should.have.status(404)
                response.body.should.be.a('object');
                response.body.should.have.property('status').eq('Failed');
                done();
            })
        })

        it('It should not be able to get any article if the user has no valid token', (done)=>{
            chai.request(server)
            .get('/v1/articles/35')
            .set("token", `Bearer` )
            .end((err, response) =>{
                response.should.have.status(401)
                done();
            })
        })
       
        // EMPLOYEES CAN DELETE  A SINGLE ARTILE POSTED
        it('It should be able to delete a single article the user posted', (done)=>{
            chai.request(server)
            .delete(`/v1/articles/${articleId}`)
            .set("token", `Bearer ${token}` )
            .end((err, response) =>{
                response.should.have.status(202)
                response.body.should.be.a('object');
                response.body.should.have.property('status').eq('success');
                done();
            })
        })

        it('It should not be able to delete any article if the articleId is invalid', (done)=>{
            chai.request(server)
            .delete('/v1/articles/4')
            .set("token", `Bearer ${token}` )
            .end((err, response) =>{
                response.should.have.status(404)
                response.body.should.be.a('object');
                response.body.should.have.property('message').eq('Article Not Found');
                done();
            })
        })

        it('It should not be able to delete an article that was not posted my the user', (done)=>{
            chai.request(server)
            .delete('/v1/articles/58')
            .set("token", `Bearer ${token}` )
            .end((err, response) =>{
                response.should.have.status(403)
                response.body.should.be.a('object');
                response.body.should.have.property('status').eq('Failed');
                done();
            })
        })
    })

   

//  THIS TEST IS TO FLAG ARTICLES MARKED AS INAPPROPRIATE
describe('POST /v1/flag',()=>{
        it('It should update a post that is termed inappropriate to true', (done)=>{
            chai.request(server)
            .patch('/v1/articles/1/flag')
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
            .patch('/v1/articles/123/flag')
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
        it('It should be a boolean else, render an error', (done)=>{
            chai.request(server)
            .patch('/v1/articles/1/flag')
            .send(
                {
                    "flagged": "This is a string"
                }
            )
            .end((err, response) =>{
                response.should.have.status(400)
                response.body.should.be.a('object');
                response.body.should.have.property('success').eq(false);
                done();
            })
        })
    })

   
    //    ARTICLE COMMENT
    describe('POST A COMMENT ON AN ARTICLE /v1/articles/:articleId/comment',()=>{
        it('It should post a comment to a particular article if the user provides an articleId', (done)=>{
            chai.request(server)
            .post('/v1/articles/1/comment')
            .set("token", `Bearer ${token}` )
            .send(
                {
                    "comment": comment
                }
            )
            .end((err, response) =>{
                response.should.have.status(201)
                response.body.should.be.a('object');
                response.body.should.have.property('status').eq('success');
                done();
            })
        })
        
        it('It should not post any comment if the article id does not exist', (done)=>{
            chai.request(server)
            .post('/v1/articles/1345/comment')
            .set("token", `Bearer ${token}` )
            .send(
                {
                    "comment": comment
                }
            )
            .end((err, response) =>{
                response.should.have.status(404)
                response.body.should.be.a('object');
                response.body.should.have.property('status').eq('Failed');
                done();
            })
        })
        
        it('It should not post any comment if the user dosent have a vaild token', (done)=>{
            chai.request(server)
            .post('/v1/articles/1/comment')
            .set("token", `Bearer` )
            .send(
                {
                    "comment": comment
                }
            )
            .end((err, response) =>{
                response.should.have.status(401)
                done();
            })
        })

        it('It should not post a comment if the length is longer than 180', (done)=>{
            chai.request(server)
            .post('/v1/articles/1/comment')
            .set("token", `Bearer ${token}` )
            .send(
                {
                    "comment": 
                        `Elections in Nigeria are forms of choosing representatives to the Federal Government of Nigeria and the various states in the fourth
                         republic Nigeria.[1] Elections in Nigeria started since 1959 with different political parties. It's a method of choosing leaders where
                          the citizens has right to vote and to be voted for.
                         Nigerians elects on the federal level a head of state (the President of Nigeria) and a legislature (the National Assembly). The president is elected 
                         by the people. The National Assembly has two chambers. The House of Representatives has 360 members, elected for a four-year term in single-seat constituencies. 
                         The Senate has 109 members, elected for a four-year term: each of the 36 states are divided into 3 senatorial districts, each of which is represented by one senator;
                          the Federal Capital Territory is represented by only one senator.[3][4]
                         Nigeria has a multi-party system, with two or three strong parties and a third party that is electorally successful. However, members of the People's 
                         Democratic Party (PDP) had controlled the presidency since elections were resumed in 1999 until 2015 when Muhammadu Buhari won the presidential election.[5]
                         The Nigerian general elections of 2007 were held on 14 April and 21 April 2007.[6] Governorship and state assembly elections were held on 14 April, while the 
                         presidential and national assembly elections were held a week later on 21 April. late Umaru Yar'Adua won the highly controversial election for the ruling People's Democratic Party
                          (PDP) and was sworn in on 29 May.
                        The ruling PDP won 26 of the 32 states, according to INEC, including Kaduna State and Katsina State, where the results were contested by the local population.[7]

                        Following the presidential election, groups monitoring the election gave it a dismal assessment. Chief European Union observer Max van den Berg reported that the handling
                         of the polls had "fallen far short" of basic international standards, and that "the process cannot be considered to be credible."[8] A spokesman for the United States Department 
                         of State said it was "deeply troubled" by election polls, calling them "flawed", and said it hoped the political parties would resolve any differences over the election through peaceful, constitutional means.[9]
                        `
                }
            )
            .end((err, response) =>{
                response.should.have.status(400)
                response.body.should.have.property('success').eq(false);
                done();
           })
        })
    })



})