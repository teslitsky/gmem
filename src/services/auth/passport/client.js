const passport = require('koa-passport');
const { Strategy } = require('passport-local');
const Client = require('../../client');

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(
  'client',
  new Strategy(
    {
      usernameField: 'login',
      passwordField: 'password',
      session: false,
    },
    async (login, password, done) => {
      try {
        const account = await Client.findByLogin(login);
        if (!account) {
          const client = await Client.createClient({
            login,
            password,
          });

          return done(null, client);
        }

        const isValidPassword = await account.verifyPassword(password);
        if (!isValidPassword) {
          return done(null, false);
        }

        return done(null, { id: account.id });
      } catch (err) {
        return done(err);
      }
    },
  ),
);

module.exports = passport;
