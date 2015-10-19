module.exports = {
  connection: 'purchase',
  tableName: 'days',
  attributes: {
    name: {
      type: 'string',
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      unique: true,
      columnName: 'name'
    },
    id: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      columnName: 'id',
      autoIncrement: true
    }
  }
};
