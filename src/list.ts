import type User from './models/User';
import UsersController from './database/usersController';
import Utils from './Utils';
// Your project code

exports.handler = (
  event: any,
  _context: any,
  callback: (p1: any, p2?: any) => any
) => {
  const request_headers = event.queryStringParameters;
  // if an empty first_name query is given, we return a 400 BAD REQUEST
  const headers = {
    'Content-Type': 'application/json',
  };
  if (request_headers && request_headers.first_name.trim() == '') {
    // create a response object
    const response = Utils.createResponse(
      400,
      headers,
      JSON.stringify({ error: 'Empty filter' })
    );
    callback(null, response);
    return;
  }
  // the possible filter that the requesting entity added
  const filter = request_headers ? request_headers.first_name : null;

  users_list(filter)
    .then((data) => callback(null, data))
    .catch((err) => callback(null, err));
};

/**
 *
 * @param filter possible filter that indicates first name
 * @returns Promise containing list of users
 */
const users_list: (filter?: string) => Promise<Array<User>> = async (
  filter?: string
) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  return new Promise(async (resolve, reject) => {
    try {
      const users = await UsersController.getUsersList(filter);
      //For the callback to work correctly, we need to return a valid response object
      const response = Utils.createResponse(
        200,
        headers,
        JSON.stringify(users)
      );

      resolve(response);
    } catch (e) {
      // if an error would occur, we respond with a status 500 error
      const response = Utils.createResponse(500, headers, JSON.stringify(e));

      reject(response);
    }
  });
};
