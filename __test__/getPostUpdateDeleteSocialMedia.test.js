const app = require('../server');
const request = require('supertest');
const {User,Photo, sequelize} = require('../models');
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


let setSocial = {
  id:1,
  name: "test", 
  social_media_url: "test.com"
}
let wrongsetSocial = {
  name: "test", 
  social_media_url: "test"
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
});

// !POST socialmedias
describe("POST /socialmedias", () => {
  // ! 201
  it('should send response 201', (done) => {
    request(app)
    .post(`/socialmedias`)
    .set("authorization", authorization)
    .send(setSocial)
    .end((err, res) => {
      if(err){
        done(err);
      }
      expect(res.status).toEqual(201);
      expect(typeof res.body).toEqual("object");
      expect(res.body).toHaveProperty('social_media')
      expect(res.body.social_media).toHaveProperty('name')
      expect(res.body.social_media).toHaveProperty('social_media_url')
      done()
    })
  });

  // !400
  it("should send response 400",(done) => {
    request(app)
    .post(`/socialmedias`)
    .set("authorization", authorization)
    .send(wrongsetSocial)
    .end((err, res) => {
      if(err){
        done(err);
      }
      expect(res.status).toEqual(400);
      expect(typeof res.body).toEqual("object");
      expect(res.body).toHaveProperty('message');
      expect(typeof res.body.message).toEqual("string");
      expect(res.body.message).toEqual("please enter valid url format");
      done()
    })
  })

  // !500
  it('should send response 500', (done) => {
    request(app)
    .post(`/socialmedias`)
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
})

// !GET socialmedias
describe("GET /socialmedias", () => {
  // ! 201
  it('should send response 200', (done) => {
    request(app)
    .get(`/socialmedias`)
    .set("authorization", authorization)
    .end((err, res) => {
      if(err){
        done(err);
      }
      expect(res.status).toEqual(200);
      expect(typeof res.body).toEqual("object");
      expect(res.body[0]).toHaveProperty('id');
      expect(res.body[0]).toHaveProperty('name');
      expect(res.body[0]).toHaveProperty('social_media_url');
      done()
    })
  })
  // !500
  it('should send response 500', (done) => {
    request(app)
    .get(`/socialmedias`)
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
})

// ! PUT /socialmedias/:socialmediasId
describe("PUT /socialmedias/:socialmediasId", () => {
  // !200
  it('should send response 200', (done) => {
    request(app)
    .put(`/socialmedias/${setSocial.id}`)
    .set("authorization", authorization)
    .send({
      name: "updated", 
      social_media_url: "updated.com"
    })
    .end((err, res) => {
      if(err){
        done(err);
      }
      expect(res.status).toEqual(200);
      expect(typeof res.body).toEqual("object");
      expect(res.body).toHaveProperty('message')
      expect(res.body.message).toHaveProperty('id')
      expect(res.body.message).toHaveProperty('name')
      expect(res.body.message).toHaveProperty('social_media_url')
      done()
    })
  });
  // !404
  it('should send response 404', (done) => {
    request(app)
    .put(`/socialmedias/321321`)
    .set('authorization', authorization)
    .send(wrongsetSocial)
    .end((err, res) => {
      if(err){
        done(err);
      }
      expect(res.status).toEqual(404);
      expect(typeof res.body).toEqual("object");
      expect(res.body).toHaveProperty('message')
      expect(typeof res.body.message).toEqual("string");
      expect(res.body.message).toEqual("Social Media Not Found");
      done()
    })
    });
  // !400
  it("should send response 400",(done) => {
    request(app)
    .put(`/socialmedias/${setSocial.id}`)
    .set("authorization", authorization)
    .send(wrongsetSocial)
    .end((err, res) => {
      if(err){
        done(err);
      }
      expect(res.status).toEqual(400);
      expect(typeof res.body).toEqual("object");
      expect(res.body).toHaveProperty('message');
      expect(typeof res.body.message).toEqual("string");
      expect(res.body.message).toEqual("please enter valid url format");
      done()
    })
  })
  // !500
  it('should send response 500', (done) => {
    request(app)
    .put(`/socialmedias/${setSocial.id}`)
    .send(setSocial)
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
})

// ! DELETE /socialmedias/:socialmediasId
describe("DELETE /socialmedias/:socialmediasId", () => {
  // !200
  it('should send response 200', (done) => {
    request(app)
    .delete(`/socialmedias/${setSocial.id}`)
    .set("authorization", authorization)
    .end((err, res) => {
      if(err){
        done(err);
      }
      expect(res.status).toEqual(200);
      expect(typeof res.body).toEqual("object");
      expect(res.body).toHaveProperty('message')
      expect(typeof res.body.message).toEqual("string");
      expect(res.body.message).toEqual("Your social media has been successfully deleted")
      done()
    })
  });

  // !404
  it('should send response 404', (done) => {
    request(app)
    .delete(`/socialmedias/434`)
    .set('authorization', authorization)
    .end((err, res) => {
      if(err){
        done(err);
      }
      expect(res.status).toEqual(404);
      expect(typeof res.body).toEqual("object");
      expect(res.body).toHaveProperty('message')
      expect(typeof res.body.message).toEqual("string");
      expect(res.body.message).toEqual("Social Media Not Found");
      done()
    })
    });

  // !500
  it('should send response 500', (done) => {
    request(app)
    .delete(`/socialmedias/${setSocial.id}`)
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
  it('should send response 500, INVALID TOKEN', (done) => {
    request(app)
    .delete(`/socialmedias/${setSocial.id}`)
    .set("authorization", invalidToken)
    .end((err, res) => {
      if(err){
        done(err);
      }
      expect(res.status).toEqual(500);
      expect(typeof res.body).toEqual("object");
      expect(res.body).toHaveProperty('message')
      expect(res.body).toHaveProperty('name')
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
    .bulkDelete("SocialMedia",{})
    .then(() => {
      return done()
    })
    .catch((err) =>{
      done(err)
    })
});
