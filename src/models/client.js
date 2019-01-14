const Model = require('./model');

class Client extends Model {
  static get tableName() {
    return 'clients';
  }

  static get hidden() {
    return ['password', 'refresh_token'];
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['login', 'password'],

      properties: {
        id: { type: 'integer' },
        login: { type: 'string' },
        password: { type: 'string', minLength: 3 },
      },
    };
  }

  static get relationMappings() {
    return {
      // @TODO: add orders relation
    };
  }
}

module.exports = Client;
