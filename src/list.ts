import UsersController from './database/usersController';
// Your project code

exports.handler = (
  event: any,
  _context: any,
  callback: (p1: any, p2?: any) => any
) => {
  const request_headers = event.queryStringParameters;
  const filter = request_headers ? request_headers.first_name : null;

  // Your code here
  users_get(filter)
    .then((data) => callback(null, data))
    .catch((err) => callback(err));
};

/**
 *
 * @param filter possible filter that indicates first name
 * @returns Promise containing list of users
 */
const users_get = async (filter?: string) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  return new Promise(async (resolve, reject) => {
    try {
      const users = await UsersController.getUsersList(filter);
      //For the callback to work correctly, we need to return a valid response object
      const response = {
        statusCode: 200,
        headers: headers,
        body: JSON.stringify(users),
      };

      resolve(response);
    } catch (err) {
      // if an error would occur, we respond with a status 500 error
      const response = {
        statusCode: 500,
        headers: headers,
        body: JSON.stringify(err),
      };

      reject(response);
    }
  });
};
