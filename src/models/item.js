const { Model } = require('objection');

class Item extends Model {
  static get tableName() {
    return 'items';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title', 'type'],

      properties: {
        id: { type: 'integer' },
        title: { type: 'string', minLength: 1, maxLength: 255 },
        type: { type: 'string', minLength: 1, maxLength: 255 },
      },
    };
  }

  static get relationMappings() {
    return {
      deliveries: {
        relation: Model.ManyToManyRelation,
        // require loop recommended solution
        // http://vincit.github.io/objection.js/#relations
        modelClass: `${__dirname}/delivery`,
        join: {
          from: 'items.type',
          through: {
            from: 'delivery_item_types.type',
            to: 'delivery_item_types.delivery_id',
          },
          to: 'deliveries.id',
        },
      },
    };
  }
}

module.exports = Item;
