module.exports = {
  connection: 'purchase',
  tableName: 'purchase',
  attributes: {
    dayId: {
      type: 'integer',
      columnName: 'day_id',
      enum: [0, 1, 2, 3, 4, 5, 6]
    },
    id: {
      type: 'integer',
      columnName: 'day_id',
      primaryKey: true,
      unique: true
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
