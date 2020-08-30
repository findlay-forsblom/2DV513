const db = require('../config/db')

const query = (sql) => {
  return new Promise((resolve, reject) => {
    db.query(sql, (err, results) => {
      if (err) reject(err)
      resolve(results)
    })
  })
}

module.exports = query
