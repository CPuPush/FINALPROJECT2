const app = require('../server');
const request = require('supertest');
const {User, sequelize} = require('../models');
const { hashPassword } = require('../helper/bcrypt');

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

const worngData = {
  full_name: 'test',
  email: 123,
  username: 'test',
  password: hashPassword('test'),
  profile_image_url: 'test.com',
  age: 10,
  phone_number: 767,
  createdAt: new Date(),
  updatedAt: new Date(),
}

//! REGISTER
describe("POST /users/register", () => {
  it('should send response 201', (done) => {
    request(app)
    .post("/users/register")
    .send(userData)
    .end((err, res) => {
      if(err){
        done(err);
      }
      expect(res.status).toEqual(201);
      expect(typeof res.body).toEqual("object");
      expect(res.body).toHaveProperty('email')
      expect(res.body).toHaveProperty('full_name')
      expect(res.body).toHaveProperty('age')
      expect(res.body.full_name).toEqual(userData.full_name)
      done()
    })
  });
});

describe("INVALID POST /users/register ", () => {
  it('should send response 400', (done) => {
    request(app)
    .post("/users/register")
    .send(worngData)
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
  });
});


//! LOGIN
const dataLogin ={
  email: 'test@mail.com',
  password: 'test'
}

const invalidDataLogin = {
  email: 'test@mail.com',
  password: 'testt'
}

describe("POST /users/login ", () => {
  it('should send response 200', (done) => {
    request(app)
    .post("/users/login")
    .send(dataLogin)
    .end((err, res) => {
      if(err){
        done(err);
      }
      expect(res.status).toEqual(200);
      expect(typeof res.body).toEqual("object");
      expect(res.body).toHaveProperty("token");
      expect(typeof res.body.token).toEqual("string");
      expect((res.body.token).length).toBeGreaterThan(0);
      done()
    })
  });
});

describe("INVALID POST /users/login ", () => {
  it('should send response 400', (done) => {
    request(app)
    .post("/users/login")
    .send(invalidDataLogin)
    .end((err, res) => {
      if(err){
        done(err);
      }
      expect(res.status).toEqual(400);
      expect(typeof res.body).toEqual("object");
      expect(res.body).toHaveProperty("message");
      expect(typeof res.body.message).toEqual("string");
      expect(res.body.message).toEqual("Password is wrong");
      done()
    })
  });
});



// let setData = {
//   email:'test@mail.com',
//   full_name: 'testsete',
//   username: 'tssdfsad',
//   profile_image_url: 'test.com',
//   age: 12,
//   phone_number: 234,
// }




// describe("PUT /users/:userId", () => {
//   it('should send response 200', (done) => {
//     request(app)
//     .put("/users/1")
//     .set("authorization", authorization)
//     .send(setData)
//     .end((err, res) => {
//       if(err){
//         done(err);
//       }
//       expect(res.status).toEqual(200);
//       // expect(typeof res.body).toEqual("object");
//       // expect(res.body).toHaveProperty('email')
//       // expect(res.body).toHaveProperty('full_name')
//       // expect(res.body).toHaveProperty('age')
//       // expect(res.body.full_name).toEqual(userData.full_name)
//       done()
//     })
//   });
// });
// //! PUT
// const authorization = generateToken({
//   id: userData.id,
//   email: userData.email
// });
// console.log(authorization);

// const datas = {
//   email:'testete@mail',
//   full_name: 'iiginsdf',
//   username: 'adfasefd',
//   profile_image_url: 'aterdf.com',
//   age: 2,
//   phone_number: 4243,
// }

// describe("PUT /users/:userId ", () => {
//   it('should send response 200', (done) => {
//     request(app)
//     .put("/users/" + userData.id)
//     .set("Authorization", authorization)
//     .send(datas)
//     .end((err, res) => {
//       if(err){
//         done(err);
//       }
//       expect(res.status).toEqual(200);
//       // expect(typeof res.body).toEqual("object");
//       // expect(res.body).toHaveProperty("token");
//       // expect(typeof res.body.token).toEqual("string");
//       // expect((res.body.token).length).toBeGreaterThan(0);
//       done()
//     })
//   });
// });


// let authorization = "";
// beforeAll((done) => {
//   sequelize.queryInterface
//     .then(() => {
//       authorization = generateToken({
//         id: userData.id,
//         email: userData.email
//       });
//       return done();
//     })
//     .catch((err) => {
//       done(err);
//     });
// });

// const datas = {
//   email:'testete@mail',
//   full_name: 'iiginsdf',
//   username: 'adfasefd',
//   profile_image_url: 'aterdf.com',
//   age: 2,
//   phone_number: 4243,
//   createdAt: new Date(),
//   updatedAt: new Date(),

// }

// describe("PUT /users/login ", () => {
//   it('should send response 200', (done) => {
//     request(app)
//     .put("/users/" + userData.id)
//     .set("authorization", authorization)
//     .send(datas)
//     .end((err, res) => {
//       if(err){
//         done(err);
//       }
//       expect(res.status).toEqual(200);
//       // expect(typeof res.body).toEqual("object");
//       // expect(res.body).toHaveProperty("token");
//       // expect(typeof res.body.token).toEqual("string");
//       // expect((res.body.token).length).toBeGreaterThan(0);
//       done()
//     })
//   });
// });


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


  // it("should send response with 201 status code", (done) => {
  //   request(app)
  //     .post("/users/register")
  //     .send(userData)
      // .end((err, res) => {
      //   if(err){
      //     done(err);
      //   }
      //   expect(res.status).toEqual(201);
      //   expect(typeof res.body).toEqual("object");
      //   expect(res.body).toHaveProperty('id')
      //   expect(res.body).toHaveProperty('email')
      //   expect(res.body).toHaveProperty('full_name')
      //   done()
      // })



