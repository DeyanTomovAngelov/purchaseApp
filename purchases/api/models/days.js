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
    dayId: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      columnName: 'dayId',
      autoIncrement: true
    },
    purchaseByDay: {
      collection: 'Purchase',
      via: 'dayId'
    }
  }
};
