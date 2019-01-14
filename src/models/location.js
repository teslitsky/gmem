const { Model } = require('objection');

class Location extends Model {
  static get tableName() {
    return 'locations';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['iso', 'country'],

      properties: {
        id: { type: 'integer' },
        iso: { type: 'string', minLength: 3, maxLength: 3 },
        country: { type: 'string', minLength: 1, maxLength: 255 },
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
          from: 'locations.id',
          through: {
            from: 'delivery_locations.location_id',
            to: 'delivery_locations.delivery_id',
          },
          to: 'deliveries.id',
        },
      },
    };
  }
}

module.exports = Location;
