const app = require('../server');
const request = require('supertest');
const {User, Photo, sequelize} = require('../models');
const { generateToken,  } = require('../helper/jwt');

const userData = {
  id: 1,
  full_name: 'test',
  email: 'test@mail.com',
  username: 'test',
  password: 'test',
  profile_image_url: 'test.com',
  age: 10,
  phone_number: 767,
  createdAt: new Date(),
  updatedAt: new Date(),
}


let authorization = ""
let invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsImVtYWlsIjoidGVzdEBtYWlsLmNvbSIsImlhdCI6MTY3MTYxMzAwMH0.vQS9BlsTP3c0mZCVKpPXycsmB9TCjf7gylPSm-4p5XYadfaf"


let setComment = {
  id:1,
  commet: "wah wah wah",
  PhotoId: 1
}
let WrongsetComment = {
  commet: "wah wah wah",
  PhotoId: 1134
}


beforeAll((done) => {
  sequelize.queryInterface
    .bulkInsert("Users", [userData], {})
    .then(() => {
      authorization = generateToken({
        id: userData.id,
        email: userData.email,
      })
      done();
    })
    .catch((err) => {
      done(err)
  });

  sequelize.queryInterface
    .bulkInsert("Photos", [{
      id: 1,
      title: "test",
      caption: "test",
      poster_image_url: "test.com",
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
    .catch((err) => {
      done(err)
  });
  
});

// ! POST COMMENT
describe("POST /comments", () => {
  // !200
  it('should send response 201', (done) => {
    request(app)
    .post(`/comments`)
    .send(setComment)
    .set("authorization", authorization)
    .end((err, res) => {
      if(err){
        done(err);
      }
      expect(res.status).toEqual(201);
      expect(typeof res.body).toEqual("object");
      expect(res.body).toHaveProperty('comment')
      expect(res.body.comment).toHaveProperty('id')
      expect(res.body.comment).toHaveProperty('UserId')
      expect(res.body.comment).toHaveProperty('PhotoId')
      done()
    })
  });
  // !404
  it('should send response 404', (done) => {
    request(app)
    .post(`/comments`)
    .send(WrongsetComment)
    .set("authorization", authorization)
    .end((err, res) => {
      if(err){
        done(err);
      }
      expect(res.status).toEqual(404);
      expect(typeof res.body).toEqual("object");
      expect(res.body).toHaveProperty('message')
      expect(typeof res.body.message).toEqual("string");
      expect(res.body.message).toEqual("PhotoId not found");
      done()
    })
  });

  // !500
  it('should send response 500', (done) => {
    request(app)
    .post(`/comments`)
    .end((err, res) => {
      if(err){
        done(err);
      }
      expect(res.status).toEqual(500);
      expect(typeof res.body).toEqual("object");
      expect(res.body).toHaveProperty('name')
      expect(res.body).toHaveProperty('message')
      expect(typeof res.body.message).toEqual("string");
      expect(res.body.message).toEqual("jwt must be provided");
      done()
    })
    });
});


// ! GET COMMENT
describe("GET /comments", () => {
  // !200
  it('should send response 200', (done) => {
    request(app)
    .get(`/comments`)
    .set("authorization", authorization)
    .end((err, res) => {
      if(err){
        done(err);
      }
      expect(res.status).toEqual(200);
      expect(typeof res.body).toEqual("object");
      expect(res.body).toHaveProperty('comments')
      expect(res.body.comments[0]).toHaveProperty('id')
      expect(res.body.comments[0]).toHaveProperty('UserId')
      expect(res.body.comments[0]).toHaveProperty('PhotoId')
      done()
    })
  });

    // !500
    it('should send response 500', (done) => {
      request(app)
      .get(`/comments`)
      .end((err, res) => {
        if(err){
          done(err);
        }
        expect(res.status).toEqual(500);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty('name')
        expect(res.body).toHaveProperty('message')
        expect(typeof res.body.message).toEqual("string");
        expect(res.body.message).toEqual("jwt must be provided");
        done()
      })
      });
    // !500

    it('should send response 500 INVALID TOKEN', (done) => {
      request(app)
      .get(`/comments`)
      .set('authorization', invalidToken)
      .end((err, res) => {
        if(err){
          done(err);
        }
        expect(res.status).toEqual(500);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty('name')
        expect(res.body).toHaveProperty('message')
        expect(typeof res.body.message).toEqual("string");
        expect(res.body.message).toEqual("invalid signature");
        done()
      })
      });
})

// ! PUT /comments/:commentId
describe("PUT /comments/:commentId", () => {
  // !200
  it('should send response 200', (done) => {
    request(app)
    .put(`/comments/${setComment.id}`)
    .set("authorization", authorization)
    .send({
      comment: "test update"
    })
    .end((err, res) => {
      if(err){
        done(err);
      }
      expect(res.status).toEqual(200);
      expect(typeof res.body).toEqual("object");
      expect(res.body).toHaveProperty('comment')
      expect(res.body.comment).toHaveProperty('id')
      expect(res.body.comment).toHaveProperty('UserId')
      expect(res.body.comment).toHaveProperty('PhotoId')
      done()
    })
  });
  // !404
  it('should send response 404', (done) => {
    request(app)
    .put(`/comments/556`)
    .set('authorization', authorization)
    .end((err, res) => {
      if(err){
        done(err);
      }
      expect(res.status).toEqual(404);
      expect(typeof res.body).toEqual("object");
      expect(res.body).toHaveProperty('message')
      expect(typeof res.body.message).toEqual("string");
      expect(res.body.message).toEqual("Comment not found");
      done()
    })
    });

  // !500
  it('should send response 500', (done) => {
    request(app)
    .put(`/comments/${setComment.id}`)
    .end((err, res) => {
      if(err){
        done(err);
      }
      expect(res.status).toEqual(500);
      expect(typeof res.body).toEqual("object");
      expect(res.body).toHaveProperty('name')
      expect(res.body).toHaveProperty('message')
      expect(typeof res.body.message).toEqual("string");
      expect(res.body.message).toEqual("jwt must be provided");
      done()
    })
    });
  // !500

  it('should send response 500 INVALID TOKEN', (done) => {
    request(app)
    .put(`/comments/${setComment.id}`)
    .set('authorization', invalidToken)
    .end((err, res) => {
      if(err){
        done(err);
      }
      expect(res.status).toEqual(500);
      expect(typeof res.body).toEqual("object");
      expect(res.body).toHaveProperty('name')
      expect(res.body).toHaveProperty('message')
      expect(typeof res.body.message).toEqual("string");
      expect(res.body.message).toEqual("invalid signature");
      done()
    })
    });
})

// ! DELETE /comments/:commentId
describe("DELETE /comments/:commentId", () => {
  // !200
  it('should send response 200', (done) => {
    request(app)
    .delete(`/comments/${setComment.id}`)
    .set("authorization", authorization)
    .send({
      comment: "test update"
    })
    .end((err, res) => {
      if(err){
        done(err);
      }
      expect(res.status).toEqual(200);
      expect(typeof res.body).toEqual("object");
      expect(res.body).toHaveProperty('message')
      expect(typeof res.body.message).toEqual("string");
      expect(res.body.message).toEqual("Your comment has been successfully deleted");
      done()
    })
  });

  // !404
  it('should send response 404', (done) => {
    request(app)
    .delete(`/comments/556`)
    .set('authorization', authorization)
    .end((err, res) => {
      if(err){
        done(err);
      }
      expect(res.status).toEqual(404);
      expect(typeof res.body).toEqual("object");
      expect(res.body).toHaveProperty('message')
      expect(typeof res.body.message).toEqual("string");
      expect(res.body.message).toEqual("Comment not found");
      done()
    })
    });

    // !500
  it('should send response 500', (done) => {
    request(app)
    .delete(`/comments/${setComment.id}`)
    .end((err, res) => {
      if(err){
        done(err);
      }
      expect(res.status).toEqual(500);
      expect(typeof res.body).toEqual("object");
      expect(res.body).toHaveProperty('name')
      expect(res.body).toHaveProperty('message')
      expect(typeof res.body.message).toEqual("string");
      expect(res.body.message).toEqual("jwt must be provided");
      done()
    })
    });
  // !500

  it('should send response 500 INVALID TOKEN', (done) => {
    request(app)
    .delete(`/comments/${setComment.id}`)
    .set('authorization', invalidToken)
    .end((err, res) => {
      if(err){
        done(err);
      }
      expect(res.status).toEqual(500);
      expect(typeof res.body).toEqual("object");
      expect(res.body).toHaveProperty('name')
      expect(res.body).toHaveProperty('message')
      expect(typeof res.body.message).toEqual("string");
      expect(res.body.message).toEqual("invalid signature");
      done()
    })
    });
})

afterAll((done) => {
  sequelize.queryInterface
    .bulkDelete("Users",{})
    .then(() => {
      return done()
    })
    .catch((err) =>{
      done(err)
    })
  sequelize.queryInterface
    .bulkDelete("Photos",{})
    .then(() => {
      return done()
    })
    .catch((err) =>{
      done(err)
  })
  sequelize.queryInterface
    .bulkDelete("Comments",{})
    .then(() => {
      return done()
    })
    .catch((err) =>{
      done(err)
    })
});
