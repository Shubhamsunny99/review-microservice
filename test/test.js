let mongoose = require("mongoose");
let Review = require('../app/models/review');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Review', () => {
    beforeEach((done) => { //Before each test we empty the database
        Review.deleteMany({}, (err) => { 
            return done();           
        });        
    });

    describe('/POST reviews/add-review', () => {
        it('it should not POST a review without pages field', (done) => {
            let review = {
                userID: "5f01648b056a2e2c78ce840d",
                restuarantID: "5f01648b056a2e2c78ce840d",
                review : "BEst Restuarant",
                rating: 5
            }
          chai.request(server)
              .post('/reviews/add-review')
              .send(review)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status');
                    res.body.should.have.property('data');
                done();
              });
        });
  
    });

    describe('/GET/:id reviews/get-review', () => {
        it('it should get resturaant by id', (done) => {
            let review = new Review(
                {
                    userID: "5f01648b056a2e2c78ce840d",
                    restuarantID: "5f01648b056a2e2c78ce840d",
                    review : "BEst Restuarant",
                    rating: 5
                });
                review.save((err, review_d) => {
                    chai.request(server)
                  .get('/reviews/get-review/' + review_d._id)
                  .send(review_d)
                  .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('userID');
                        res.body.should.have.property('restuarantID');
                        res.body.should.have.property('review');
                        res.body.should.have.property('rating');
                        res.body.should.have.property('_id').eql(review_d.id);
                    done();
                  });
            });
  
        });
    });

    describe('/PUT/:id reviews/update-review', () => {
        it('it should UPDATE a review given the id', (done) => {
            let review = new Review({
                userID: "5f01648b056a2e2c78ce840d",
                restuarantID: "5f01648b056a2e2c78ce840d",
                review : "Best Restuarant",
                rating: 5
            });
            review.save((err, review_D) => {
                  chai.request(server)
                  .put('/reviews/update-review/' + review_D._id)
                  .send({
                    userID: "5f01648b056a2e2c78ce840d",
                    restuarantID: "5f01648b056a2e2c78ce840d",
                    review : "BEst Restuarant",
                    rating: 5
                })
                  .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                    done();
                  });
            });
        });
    });
});
