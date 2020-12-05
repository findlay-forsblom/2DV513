const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.PASS_DATABASE,
  database: 'Phone_Db',
  insecureAuth: true
})

connection.connect((err) => {
  if (err) throw err

  console.log('Mysql Connected')
})

module.exports = connection
