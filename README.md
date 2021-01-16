# 2DV513

<!-- GETTING STARTED -->
## Getting Started
To get this project up and running follow this simple steps

### Prerequisites
You will need to have the following tools and applications installed in your system for this project to work
* [Node js](https://nodejs.org/en/download/)
* [MySql](https://www.mysql.com/downloads/)
* [MySql workbench](https://www.mysql.com/downloads/)

 ### Installation

 1. Use the script Phone_db_schema.sql found under Database/Schema to create the database.
 2. Use the script import_data.py to populate the database. You will need to change to the username and password to that of your mysql database in the script.
 3. Inside the ReactExpress folder Install NPM packages
   ```sh
   npm install
   ```
4. Do the same under the client folder in the ReactExpress folder
5. Start the server (./ReactExpress) using with `npm start` do the same for the client (./ReactExpress/client).
6. Navigate to localhost 3000