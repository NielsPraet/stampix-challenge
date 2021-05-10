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
      // if a filter exists, we fetch all users where first name is equal to filter
      if (filter) {
        users = await knexInstance<User>('user')
          .select('*')
          .where('first_name', filter);
      } else {
        // otherwise we just fetch all users
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
   * @returns the id of the new user
   */
  static createUser: (user: User) => Promise<number> = async (user: User) => {
    try {
      // inserting values will return a list of the indexes of all users added to the database
      return await knexInstance<User>('user').insert(user);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  /**
   * function that fetches the user with the given id from the database and returns it
   * @param id The unique identifier for a certain user -> currently just the row index
   * @returns the user identified by the id
   */
  static getUser: (id: number) => Promise<User> = async (id: number) => {
    try {
      // returns an array of all users where id field is equal to given id
      const userList = await knexInstance<User>('user')
        .select('*')
        .where('ROWID', id);
      // because the id should be unique, we can safely return the first element of this array
      return userList[0];
    } catch (e) {
      return Promise.reject(e);
    }
  };
}
