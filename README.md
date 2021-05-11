# Stampix Node.js & Serverless challenge

## Setting
Cloud-based AWS Lambda functions with a Node.js 14 runtime written in TypeScript.

## Goal
This repository contains a populated SQLite database consisting of 50 users. The goal is to create 3 functions, corresponding to 4 operations on the database: creation, retrieving, listing & searching.

The following REST API is set up already for you (see Practical):

1. A list of users: `GET http://localhost:3000/users`
2. Get a specific user: `GET http://localhost:3000/user/{id}`
3. Create a user: `POST http://localhost:3000/user`
  <br/>
  **Note by Niels:** The endpoint currently doesn't return the id of the created user but this would be a very easy fix.

Endpoint one should both be able to:

1. List all users
2. Find all users with a specific first name

Endpoint two and three are straight-forward.

## Practical
1. Clone this repo and install the already existing development dependencies.
3. Write your functions according to AWS Lambda standards using the Node.js 14 runtime inside `/src/*.ts`
4. Start the compiler using `yarn watch`, this will pro-actively compile your changes .
5. In another terminal, run a local server using `yarn start`, this will make the local endpoints available.

## Requirements
1. The 3 functions should do what they are supposed to do according to the goals of this challenge.
2. You should add automatic testing and make sure that `yarn test` does what could be expected of it in a CI/CD context.
  <br/>
  **Note by Niels:** It is possible that the offline serverless server crashes due to the amount of requests being sent
3. Document your code as you would in any collaborative project

## Food for thought
Think about the following questions and formulate an answer below. Think about the difficulties or edge-cases you would encounter. How would you tackle these?

The number of users suddenly increases to over 10,000. What comes to your mind with relationship to the functionality you just wrote?

Have a look at the datastructure of the database (i.e. have a look at `scripts/populate.js`). Now assume that we are not using SQLite, but MySQL 8. What would you do differently?

Suppose we want to set up a search function for the users where we can search with an arbitrary input value. How would you do this?

Overall, how much time did you spent (approximately) on this challenge?

### Your answers

1. The first thing I would do is add some type of pagination to the request, either by just using pages with a fixed amount of results per page or by adding both a page-limit and offset query. This would relieve the stress on the server and on the database itself. Secondly I would query the database in another manner, instead of asking for all rows at once we could ask for each row individually and accumulate these into 1 response. Maybe we could also add some type of caching so that we decrease the number of calls that have to be made to the database.

2. One of the biggest differences between SQLite and MySQL is that the former uses a locally stored file and the latter uses a database server. A server would add an extra dependency to your stack (because the database server could suddenly fail if it was on a different machine) and this would mean that we would lose our API functionality even though the lambdas themselves are still up, so we could add some more checks to see if the database could've crashed. Secondly, a database running on a different server will also need to have connections to the lambda backend. This could resolve in a heavily congested network, so we would have to structure the calls a little bit differently. If we have data that we need to send to the database that doesn't have high priority, we could add these up into a queue until we decide the queue is big enough to send one request to the server to resolve all this new information. This could mean that the network is less congested because we don't open a new connection every second or so, or have a connection idle when the backend isn't used at all. Lastly I want to touch on the security of the database. Having a database in a local file is pretty secure because you can't really make requests to this database directly from an outside source. But when the database is running on a server, this changes some things. At this point anyone that knew the database URI could create a connection to the database (and we don't want that). This means that we need to build in some type of authentication into the database server and in our lambda backend so we can make secure queries to the database.

3. My first thought is to create some type of builder function, that will add an SQL where statement for every query in the request. Ofcourse we first need to check if all passed queries are valid (or we could also just ignore the queries that aren't valid), after this we loop over all (key, value) pairs that we get from the queryStringParameters and append `.where(key, value)` (Knex style) to the currently build SQL query. This means that every query parameter must have the same name as a column name in the database, but we could easily fix this by adding some type of dictionary that maps the query parameter to the correct column name.
  Example: We make a request that looks like `.../users?first_name=John&gender=male&language=en`, so we want to get every user who's first name is John, is male and speaks English. Our function would then check if all these queries are valid (which they are) and would then create a starting SQL query (something like `SELECT * FROM user`). Then we would loop over all the queries (here we would have the following key-value pairs `[(first_name, John),(gender, male),(language, en)]`) and add a where statement for each one of the pairs, so in the end we would have a query that looks like `SELECT * FROM user WHERE first_name = 'John' AND gender = 'male' AND language = 'EN'`. This query will return exactly what the requesting entity asked for.

4. I don't know the exact amount (around 14 hours or so I think?) but I do know what took the most amount of time and what took the least amount of time. A lot of the work went into reading a lot of documentation about how AWS lambdas in general work, how sqlite handles sql queries, how the knex library works and how jest works. After that, writing tests took a lot more work that first imagined, I think I filled a good 2-3 hours writing those (this does include reading some documentation). The actual programming of the lambdas took the least amount of time (which I think is, in general at least, a normal thing) and refactoring and changing around the code also took a bit more time.

## Delivery
- Anything that is not enforced in the base repository (tools, dependencies, architecture, frameworks, ...) is free of choice
- Push your solution to your Git platform of choice, as long as it's public.

**Note**: There's no need to actually use the AWS Cloud.
