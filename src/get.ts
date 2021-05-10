import UsersController from './database/usersController';
import Utils from './Utils';
// Your project code

exports.handler = (
  event: any,
  _context: any,
  callback: (p1: any, p2?: any) => any
) => {
  const path_parameters = event.pathParameters;
  const id = path_parameters ? path_parameters.id : null;
  const headers = {
    'Content-Type': 'application/json',
  };
  // if no id is given, we return an error
  if (!id) {
    callback(
      Utils.createResponse(
        400,
        headers,
        JSON.stringify({ error: 'No ID specified' })
      )
    );
  }
  // if id is a non-numeric value, we return an error
  if (isNaN(id)) {
    callback(
      Utils.createResponse(
        400,
        headers,
        JSON.stringify({ error: 'non-numeric id' })
      )
    );
  }
  users_get(id)
    .then((data) => callback(null, data))
    .catch((err) => callback(err));
};

/**
 * main part of the code for this endpoint is placed here
 * @param id the unique identifier for the requested user
 * @returns a valid response object with the user in its body
 */
const users_get: (id: number) => Promise<any> = async (id: number) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  return new Promise(async (resolve, reject) => {
    try {
      // get user with id
      const user = await UsersController.getUser(id);
      // create the response
      let response;
      if (user) {
        response = Utils.createResponse(200, headers, JSON.stringify(user));
      } else {
        response = Utils.createResponse(
          404,
          headers,
          JSON.stringify({ error: 'not found' })
        );
      }
      resolve(response);
    } catch (e) {
      // create the error response
      const response = Utils.createResponse(500, headers, JSON.stringify(e));
      reject(response);
    }
  });
};
