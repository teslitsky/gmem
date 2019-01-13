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
}

module.exports = Location;
