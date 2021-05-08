import knexInstance from './knex';
import type User from '../models/User';

export default class UsersController {
  /**
   * function that returns all users if no filter is specified, otherwise it will returns all users with first_name == filter
   *
   * @param filter possible filter that indicates first name
   * @returns Promise containing list of users
   */
  static getUsersList: (filter?: string) => Promise<Array<User>> = async (
    filter?: string
  ) => {
    try {
      let users;
      if (filter) {
        users = await knexInstance<User>('user')
          .select('*')
          .where('first_name', filter);
      } else {
        users = await knexInstance<User>('user').select('*');
      }
      return users;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  /**
   * function that adds the given user to the database
   * @param user The new user we want to add to the database
   * @returns
   */
  static createUser: (user: User) => Promise<void> = async (user: User) => {
    try {
      // inserting values will return a list of the indexes of all users added to the database
      return await knexInstance<User>('user').insert(user);
    } catch (e) {
      return Promise.reject(e);
    }
  };
}
