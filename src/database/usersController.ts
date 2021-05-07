import knexInstance from './knex';

interface User {
  gender: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  date_of_birth: string;
  language: string;
  created_at: Date;
  modified_at: Date;
}

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
    let users;
    if (filter) {
      users = await knexInstance<User>('user')
        .select('*')
        .where('first_name', filter);
    } else {
      users = await knexInstance<User>('user').select('*');
    }
    return users;
  };
}
