# 2DV513 - Assignment 3

<!-- GETTING STARTED -->
## Getting Started
To get this project up and running follow the following steps:

### Prerequisites
You will need to have the following tools and applications installed in your system for this project to work:
* [Node js](https://nodejs.org/en/download/)
* [MySql](https://www.mysql.com/downloads/)
* [MySql workbench](https://www.mysql.com/downloads/) (To run sql database installation script)

 ### Installation

 1. Use the script Phone_db_schema.sql found under ./Database/Schema to create the database.
 2. Use the script import_data.py (./Database) to populate the database. You will need to change to the username and password in this script to what your MySQL database uses.
 3. Inside the ReactExpress folder, install NPM packages by the following command:
   ```sh
   npm install
   ```
4. Do the same under the client folder in the ReactExpress folder.
5. Start the server (./ReactExpress) using with `npm start` do the same for the client (./ReactExpress/client).
6. Navigate to localhost 3000

### Queries
The queries used by the server can be found in the different controllers in the ./ReactExpress/controllers folder.