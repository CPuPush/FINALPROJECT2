const app = require('../server');
const request = require('supertest');
const {User, sequelize} = require('../models');
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
let setData = {
  "title": "testtest",
  "caption": "testtest",
  "poster_image_url": "test.com"
}
let WrongsetData = {
  "title": "testtest",
  "caption": "testtest",
  "poster_image_url": "test",
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
  })
});

// !POST PHOTO
describe("POST /photos", () => {
  it('should send response 201', (done) => {
    request(app)
    .post(`/photos`)
    .set("authorization", authorization)
    .send(setData)
    .end((err, res) => {
      if(err){
        done(err);
      }
      expect(res.status).toEqual(201);
      expect(typeof res.body).toEqual("object");
      expect(res.body).toHaveProperty('title')
      expect(res.body).toHaveProperty('caption')
      expect(res.body).toHaveProperty('poster_image_url')
      done()
    })
  });
   // !400
  it("should send response 400",(done) => {
    request(app)
    .post(`/photos`)
    .set("authorization", authorization)
    .send(WrongsetData)
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
    .post(`/photos`)
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


// !GET PHOTO
describe("GET /photos", () => {
  it('should send response 200', (done) => {
    request(app)
    .get(`/photos`)
    .set("authorization", authorization)
    .end((err, res) => {
      if(err){
        done(err);
      }
      expect(res.status).toEqual(200);
      expect(typeof res.body).toEqual("object");
      expect(res.body[0]).toHaveProperty('title')
      expect(res.body[0]).toHaveProperty('caption')
      expect(res.body[0]).toHaveProperty('poster_image_url')
      done()
    })
  });
   // !400
  it("should send response 400",(done) => {
    request(app)
    .post(`/photos`)
    .set("authorization", authorization)
    .send(WrongsetData)
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
      .get(`/photos`)
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

// !UPDATE PHOTO
describe("UPDATE /photos", () => {
  it('should send response 200', (done) => {
    request(app)
    .put(`/photos/${userData.id}`)
    .set("authorization", authorization)
    .send(setData)
    .end((err, res) => {
      if(err){
        done(err);
      }
      expect(res.status).toEqual(200);
      expect(typeof res.body).toEqual("object");
      expect(res.body).toHaveProperty('photo')
      expect(res.body.photo).toHaveProperty('title')
      expect(res.body.photo).toHaveProperty('caption')
      expect(res.body.photo).toHaveProperty('UserId')
      done()
    })
  });
   // !400
  it("should send response 400",(done) => {
    request(app)
    .put(`/photos/${userData.id}`)
    .set("authorization", authorization)
    .send(WrongsetData)
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
      .put(`/photos/${userData.id}`)
      .send(WrongsetData)
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

// ! DELETE PHOTOS
describe("DELETE /photos/:photoId", () => {
  // !200
  it('should send response 200', (done) => {
    request(app)
    .delete(`/photos/${userData.id}`)
    .set("authorization", authorization)
    .end((err, res) => {
      if(err){
        done(err);
      }
      expect(res.status).toEqual(200);
      expect(typeof res.body).toEqual("object");
      expect(res.body).toHaveProperty('message')
      expect(typeof res.body.message).toEqual("string");
      expect(res.body.message).toEqual("Your photo has been successfully deleted");
      done()
    })
  });

  // !500
  it('should send response 500, INVALID TOKEN', (done) => {
    request(app)
    .delete(`/photos/${userData.id}`)
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
  // !500
  it('should send response 500', (done) => {
    request(app)
    .delete(`/photos/${userData.id}`)
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
  // !400
  it('should send response 400', (done) => {
    request(app)
    .delete(`/photos/1451`)
    .set("authorization", authorization)
    .end((err, res) => {
      if(err){
        done(err);
      }
      expect(res.status).toEqual(404);
      expect(typeof res.body).toEqual("object");
      expect(res.body).toHaveProperty('message')
      expect(typeof res.body.message).toEqual("string");
      expect(res.body.message).toEqual("Photo not found");
      done()
    })
  });
});


afterAll((done) => {
  sequelize.queryInterface
    .bulkDelete("Users",{})
    .then(() => {
      return done()
    })
    .catch((err) =>{
      done(err)
    });
  sequelize.queryInterface
    .bulkDelete("Photos",{})
    .then(() => {
      return done()
    })
    .catch((err) =>{
      done(err)
    })
});
