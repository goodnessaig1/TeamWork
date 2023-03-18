const checkIfExist = 'SELECT * FROM colors WHERE color=$1';
const createNewColor =
  'INSERT INTO colors ( color_name, color) VALUES ($1,$2) RETURNING *';
const getAllColors = 'SELECT * FROM colors';

module.exports = {
  checkIfExist,
  createNewColor,
  getAllColors,
};
