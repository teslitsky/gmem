const { Model } = require('objection');
const objectionPassword = require('objection-password');
const VisibilityPlugin = require('objection-visibility').default;

const Password = objectionPassword({
  passwordField: 'password',
  allowEmptyPassword: false,
});

class BaseModel extends Model {}

class ModelWithHashedPassword extends Password(BaseModel) {}

class ModelWithoutHiddenFields extends VisibilityPlugin(
  ModelWithHashedPassword,
) {}

module.exports = ModelWithoutHiddenFields;
