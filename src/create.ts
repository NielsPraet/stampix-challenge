import type User from './models/User';
import UsersController from './database/usersController';

// Your project code
exports.handler = (
  event: any,
  _context: any,
  callback: (p1: any, p2?: any) => any
) => {
  const user = event.body ? JSON.parse(event.body) : null;
  /*
   * First we check if the request has the correct headers ('Content-Type': 'application/json')
   * Then we check if a body is present
   * Finally we check if it's a valid user
   */
  if (!has_correct_headers(event.headers) || !user || !is_valid_user(user)) {
    // return a 400 BAD REQUEST
    callback({ statusCode: 400 });
    return;
  }

  // currently we don't return the id of the newly created entry to the requesting agent, but this would be an easy fix
  users_create(user)
    .then(() => callback(null, { statusCode: 201 }))
    .catch((err) => callback(err));
};

/**
 * apparently there is not really a cleaner way to do this (we could remove this check but then it wouldn't be as easy to show the correct error code)
 * checks if given object is a valid user object
 * @param user a possible user object
 * @returns boolean indicating if correct headers are present
 */
const is_valid_user = (user: any) => {
  const number_of_keys = Object.keys(user).length;
  // first check is to see if we have 8 or 9 fields (8 if we didn't add a phone number, which is allowed to be null)
  if (![8, 9].includes(number_of_keys)) {
    return false;
  }
  // if we have 9 fields, this means we must have a phone number
  if (number_of_keys === 9 && !user.hasOwnProperty('phone_number')) {
    return false;
  }
  // now we check if all other fields are present
  return (
    user.hasOwnProperty('gender') &&
    user.hasOwnProperty('first_name') &&
    user.hasOwnProperty('last_name') &&
    user.hasOwnProperty('email') &&
    user.hasOwnProperty('date_of_birth') &&
    user.hasOwnProperty('language') &&
    user.hasOwnProperty('created_at') &&
    user.hasOwnProperty('modified_at')
  );
};

/**
 * Check to see if headers object contain the headers needed to process the request
 * @param headers Headers object
 * @returns boolean indicating if correct headers are present
 */
const has_correct_headers = (headers: any) => {
  return (
    headers.hasOwnProperty('content-type') &&
    headers['content-type'] === 'application/json'
  );
};

/**
 * Create an entry for the user in the database
 * @param user the user we want to add to the database
 * @returns Promise containing the id of the newly created user
 */
const users_create = (user: User) => {
  return UsersController.createUser(user);
};
