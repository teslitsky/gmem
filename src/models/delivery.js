const Model = require('./model');
const Location = require('./location');

class Delivery extends Model {
  static get tableName() {
    return 'deliveries';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title', 'login', 'password'],

      properties: {
        id: { type: 'integer' },
        title: { type: 'string' },
        login: { type: 'string' },
        password: { type: 'string', minLength: 3 },
      },
    };
  }

  static get relationMappings() {
    return {
      locations: {
        relation: Model.ManyToManyRelation,
        modelClass: Location,
        join: {
          from: 'deliveries.id',
          through: {
            from: 'delivery_locations.delivery_id',
            to: 'delivery_locations.location_id',
          },
          to: 'locations.id',
        },
      },

      // @TODO: add product types relation
    };
  }
}

module.exports = Delivery;
