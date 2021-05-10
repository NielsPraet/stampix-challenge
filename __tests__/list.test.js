const url = 'http://localhost:3000';
const request = require('supertest')(url);

test('/users should return a valid non-null response', () => {
  return request
          .get('/users')
          .then((data) => {
            expect(data).toBeDefined();
          });
});

test('/users should return a 200 response', () => {
  return request
          .get('/users')
          .expect(200);
});

test('/users should return an array', () => {
  return request
    .get('/users')
    .then((data) => expect(data.body).toBeInstanceOf(Array));
});

test('/users with valid query should return a valid non-null response', () => {
  return request
          .get('/users')
          .query({ first_name: 'Pascale' })
          .then((data) => {
            expect(data).toBeDefined();
          });
});

test('/users with valid query should return a 200 response', () => {
  return request
          .get('/users')
          .query({ first_name: 'Pascale' })
          .expect(200);
});

test('/users with query should return a list', () => {
  return request
    .get('/users')
    .then((data) => expect(data.body).toBeInstanceOf(Array));
});


test('/users with valid query should return non-empty array', () => {
  return request
    .get('/users')
    .query({ first_name: 'Pascale' })
    .then((data) => expect(data.body.length).toBeGreaterThan(0));
});

test('/users without valid query should return a valid non-null response', () => {
  return request
          .get('/users')
          .query({ first_name: '' })
          .then((data) => {
            expect(data).toBeDefined();
          });
});

test('/users with empty query should return a 502 error', () => {
  return request
    .get('/users')
    .query({ first_name: '' })
    .expect(502);
});

test('/users without valid query should array', () => {
  return request
    .get('/users')
    .query({ first_name: 'not_a_valid_query' })
    .then((data) => {
      expect(data.body).toBeInstanceOf(Array);
    })
});

test('/users without valid query should return empty array', () => {
  return request
    .get('/users')
    .query({ first_name: 'not_a_valid_query' })
    .then((data) => {
      expect(data.body).toHaveLength(0);
    })
});
