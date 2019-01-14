const Model = require('./model');
const Item = require('./item');
const Delivery = require('./delivery');
const Client = require('./client');

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
      delivery: {
        relation: Model.BelongsToOneRelation,
        modelClass: Delivery,
        join: {
          from: 'orders.delivery_id',
          to: 'deliveries.id',
        },
      },
      client: {
        relation: Model.BelongsToOneRelation,
        modelClass: Client,
        join: {
          from: 'orders.client_id',
          to: 'clients.id',
        },
      },
    };
  }
}

module.exports = Order;
