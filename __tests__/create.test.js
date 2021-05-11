const url = 'http://localhost:3000';
const request = require('supertest')(url);

test('POST /user without (correct) headers should return 400', () => {
  return request
          .post('/user')
          .expect(400)
          &&
          request.post('/user')
          .accept('application/json')
          .expect(400);
});

test('POST /user with correct headers but without body should return 400', () => {
  return request
    .post('/user')
    .set('Content-Type', 'application/json')
    .expect(400)
});

test('POST /user with correct headers but incorrect body should return 400', () => {
  return request
    .post('/user')
    .set('Content-Type', 'application/json')
    .send({ value: 'incorrect' })
    .expect(400);
});

test('POST /user with correct headers but missing body fields should return 400', () => {
  return request
    .post('/user')
    .set('Content-Type', 'application/json')
    .send({
      first_name: 'John',
      last_name: 'Doe'
    })
    .expect(400);
});

test('POST /user with correct number of fields but wrong fields should return 400', () => {
  return request
    .post('/user')
    .set('Content-Type', 'application/json')
    .send({
      field1: '',
      field2: '',
      field3: '',
      field4: '',
      field5: '',
      field6: '',
      field7: '',
      field8: '',
    })
    .expect(400);
});

test('POST /user with correct but empty fields should return 400', () => {
  return request
    .post('/user')
    .set('Content-Type', 'application/json')
    .send({
      first_name: '',
      last_name: '',
      email: '',
      gender: '',
      phone_number: '',
      date_of_birth: '',
      language: '',
      created_at: '',
      modified_at: ''
    })
    .expect(400);
});

test('POST /user with correct body should return 201', () => {
  return request
    .post('/user')
    .set('content-type', 'application/json')
    .send({
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@Doe.com',
      gender: 'male',
      phone_number: '120.349.2398',
      date_of_birth: 1600519439494.0,
      language: 'en',
      created_at: '2021-05-10 23:46:00',
      modified_at: '2021-05-10 23:46:00'
    })
    .expect(201);
});

test('POST /user without phone_number should return 201', () => {
  return request
  .post('/user')
  .set('content-type', 'application/json')
  .send({
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@Doe.com',
    gender: 'male',
    date_of_birth: 1600519439494.0,
    language: 'en',
    created_at: '2021-05-10 23:46:00',
    modified_at: '2021-05-10 23:46:00'
  })
  .expect(201);
});
