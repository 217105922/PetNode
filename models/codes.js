const db = require('../helpers/database');

//return result by its code  
exports.getByCode = async function getByCode (code) {
  let query = "SELECT * FROM Codes WHERE code = ?"
  let values = [code]
  let data = await db.run_query(query, values)
  return data
}

exports.getAll = async function getAll (limit=10, OFFSET=1) {
  let query = "SELECT * FROM Codes ;"
  let data = await db.run_query(query);
  return data
}

exports.generateCode = async function generateCode () {
  let parm =(Math.random() + 1).toString(36).substring(7);
  let value = [parm]
  let query = 'INSERT INTO Codes code VALUES= ${parm}';
  let data = await db.run_query(query,value);
  return parm
}

