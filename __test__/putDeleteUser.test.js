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

let setData = {
  email:'test@mail.com',
  full_name: 'testsete',
  username: 'tssdfsad',
  profile_image_url: 'test.com',
  age: 12,
  phone_number: 234,
}
let WrongsetData = {
  email:'test',
  full_name: 'testsete',
  username: 'tssdfsad',
  profile_image_url: 'test.com',
  age: 12,
  phone_number: 234,
}

let invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsImVtYWlsIjoidGVzdEBtYWlsLmNvbSIsImlhdCI6MTY3MTYxMzAwMH0.vQS9BlsTP3c0mZCVKpPXycsmB9TCjf7gylPSm-4p5XYfdd'

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


describe("PUT /users/:userId", () => {
  it('should send response 200', (done) => {
    request(app)
    .put(`/users/${userData.id}`)
    .set("authorization", authorization)
    .send(setData)
    .end((err, res) => {
      if(err){
        done(err);
      }
      expect(res.status).toEqual(200);
      expect(typeof res.body).toEqual("object");
      expect(res.body).toHaveProperty('email')
      expect(res.body).toHaveProperty('full_name')
      expect(res.body).toHaveProperty('username')
      done()
    })
  });
   // !404
   it("should send response 404, INVALID userID",(done) => {
    request(app)
    .put(`/users/123`)
    .set("authorization", authorization)
    .send(setData)
    .end((err, res) => {
      if(err){
        done(err);
      }
      expect(res.status).toEqual(404);
      expect(typeof res.body).toEqual("object");
      expect(res.body).toHaveProperty('message');
      expect(typeof res.body.message).toEqual("string");
      expect(res.body.message).toEqual("User not found");
      done()
    })
  })
  // !400
  it("should send response 400, INVALID email format",(done) => {
    request(app)
    .put(`/users/${userData.id}`)
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
      expect(res.body.message).toEqual("Please enter valid email format");
      done()
    })
  })
});


describe("DELETE /users/:userId", () => {
  // !200
  it('should send response 200', (done) => {
    request(app)
    .delete(`/users/${userData.id}`)
    .set("authorization", authorization)
    .end((err, res) => {
      if(err){
        done(err);
      }
      expect(res.status).toEqual(200);
      expect(typeof res.body).toEqual("object");
      expect(res.body).toHaveProperty('message')
      expect(typeof res.body.message).toEqual("string");
      expect(res.body.message).toEqual("Your account has been successfully deleted");
      done()
    })
  });

  // !500
  it('should send response 500, INVALID TOKEN', (done) => {
    request(app)
    .delete(`/users/1234`)
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
    .delete(`/users/1234`)
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


afterAll((done) => {
  sequelize.queryInterface
    .bulkDelete("Users",{})
    .then(() => {
      return done()
    })
    .catch((err) =>{
      done(err)
    })
});
