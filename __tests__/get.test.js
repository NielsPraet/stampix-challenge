const url = 'http://localhost:3000';
const request = require('supertest')(url);

test('/user should return a 404', () => {
  return request
          .get('/user')
          .expect(404);
});

test('/user/{id} with valid id should return non-null response', () => {
  return request
    .get('/user/1')
    .then((data) => {
      expect(data).toBeDefined();
    });
});

test('/user/{id} with valid id should return an non-null body', () => {
  return request
    .get('/user/1')
    .then((data) => {
      expect(data.body).toBeDefined();
    });
});


test('/user/{id} with valid id should return an object', () => {
  return request
    .get('/user/1')
    .then((data) => {
      expect(data.body).toBeInstanceOf(Object);
    });
});

test('/user/{id} with valid id should return an object with all required fields', () => {
  return request
    .get('/user/1')
    .then((data) => {
      const body = data.body;
      expect(body).toHaveProperty('gender');
      expect(body).toHaveProperty('first_name');
      expect(body).toHaveProperty('last_name');
      expect(body).toHaveProperty('email');
      expect(body).toHaveProperty('date_of_birth');
      expect(body).toHaveProperty('language');
      expect(body).toHaveProperty('created_at');
      expect(body).toHaveProperty('modified_at');
    });
});

test('/user/{id} without valid id should return non-null response', () => {
  return request
    .get('/user/0')
    .then((data) => {
      expect(data).toBeDefined();
    });
});

test('/user/{id} without valid id should return a 404', () => {
  return request
    .get('/user/0')
    .expect(404);
});

test('/user/{id} without valid id should return an non-null body', () => {
  return request
    .get('/user/0')
    .then((data) => {
      expect(data.body).toBeDefined();
    });
});


test('/user/{id} without valid id should return an object', () => {
  return request
    .get('/user/0')
    .then((data) => {
      expect(data.body).toBeInstanceOf(Object);
    });
});

test('/user/{id} without valid id should not return an object with required fields', () => {
  return request
    .get('/user/0')
    .then((data) => {
      const body = data.body;
      expect(body).not.toHaveProperty('gender');
      expect(body).not.toHaveProperty('first_name');
      expect(body).not.toHaveProperty('last_name');
      expect(body).not.toHaveProperty('email');
      expect(body).not.toHaveProperty('date_of_birth');
      expect(body).not.toHaveProperty('language');
      expect(body).not.toHaveProperty('created_at');
      expect(body).not.toHaveProperty('modified_at');
    });
});

test('/user/{id} with non-numeric id should return 400', () => {
  return request
    .get('/user/a')
    .expect(400);
});
