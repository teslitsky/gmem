const passport = require('koa-passport');
const { Strategy } = require('passport-local');
const Delivery = require('../../delivery');

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(
  new Strategy(
    {
      usernameField: 'login',
      passwordField: 'password',
      passReqToCallback: true,
      session: false,
    },
    async (req, login, password, done) => {
      try {
        const account = await Delivery.findByLogin(login);
        if (!account) {
          const delivery = await Delivery.createDelivery({
            login,
            password,
            title: req.body.title,
          });

          return done(null, delivery);
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
