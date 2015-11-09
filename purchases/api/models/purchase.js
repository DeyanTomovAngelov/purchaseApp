module.exports = {
  connection: 'purchase',
  tableName: 'purchase',
  attributes: {
    dayId: {
      model: 'Days',
      type: 'integer',
      enum: [0, 1, 2, 3, 4, 5, 6],
      columnName: 'dayId',
      required: true
    },
    id: {
      type: 'integer',
      columnName: 'id',
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    purchaseName: {
      type: 'string',
      columnName: 'purchase_name',
      required: true
    },
    storeName: {
      type: 'string',
      columnName: 'store_name',
      required: true
    },
    description: {
      type: 'text',
      columnName: 'description'
    },
    price: {
      type: 'float',
      columnName: 'price',
      required: true
    }
  }
};
