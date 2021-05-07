import { Knex, knex } from 'knex';

const config: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: './src/db.sqlite',
  },
};

const knexInstance = knex(config);

export default knexInstance;
