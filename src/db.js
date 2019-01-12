const knex = require('knex');
const { Model } = require('objection');
const config = require('../knexfile');

const db = knex(config);

module.exports = Model.knex(db);
