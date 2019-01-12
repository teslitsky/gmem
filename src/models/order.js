const { Model } = require('objection');
const Item = require('./item');

class Order extends Model {
  static get tableName() {
    return 'orders';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['client_id', 'location'],

      properties: {
        id: { type: 'integer' },
        client_id: { type: 'integer' },
        location: { type: 'string', minLength: 3, maxLength: 3 },
      },
    };
  }

  static get relationMappings() {
    return {
      items: {
        relation: Model.ManyToManyRelation,
        modelClass: Item,
        join: {
          from: 'orders.id',
          through: {
            from: 'order_items.order_id',
            to: 'order_items.item_id',
          },
          to: 'items.id',
        },
      },
    };
  }
}

module.exports = Order;
