const checkIfExist = 'SELECT * FROM colors WHERE color=$1';
const createNewColor =
  'INSERT INTO colors ( color_name, color) VALUES ($1,$2) RETURNING *';
const getAllColors = 'SELECT * FROM colors';
const selectSingleColor = `SELECT * FROM colors where id = $1`;
const deleteSingleColor = `DELETE FROM colors where id = $1`;

module.exports = {
  checkIfExist,
  createNewColor,
  getAllColors,
  selectSingleColor,
  deleteSingleColor,
};
