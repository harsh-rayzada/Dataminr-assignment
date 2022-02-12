## Dataminr assignment

This is a backend application based on the assignment given by Dataminr.

This application is built using Typescript and uses PostgreSQL as the database.

This application requires the following prerequisites to run it as a local server or to run the tests -
Node v16..14.0
NPM v8.3.1
PostgreSQL v14
PG Admin 4 v6.4
Docker v20.10.11

To run the application as a local server -
1. Navigate to the project root folder(containing package.json file)
2. Open a terminal and run **npm install**
3. After the above completes, open the **.env** file in an editor and add the DB and application details for the given keys based on the docker config.
4. To generate the docker image for the database, run this command - **npm run docker-create-db**
5. Once the above is done, then, in the terminal, run **npm run transpile-load**
6. Ensure through the logs that the database is connected to the application. and the required tables are created.
7. You can test the endpoints using the given Postman collection(Postman needs to be installed as a prerequisite to do this)

To run the test cases, follow the above steps till point 8.
Then terminate the server running on the terminal and run the command **npm run test** to run the present test cases. 