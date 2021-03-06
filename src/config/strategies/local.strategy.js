const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:local.strategy');

module.exports = function localStrategy() {
    passport.use(new Strategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        }, (username, password, done) => {
            const url = 'mongodb://localhost:27017';
            const dbName = 'libraryApp';
            (async function mongo() {
                let client;
                try {

                    client = await MongoClient.connect(url);

                    debug('Conectado ao servidor');

                    const db = client.db(dbName).collection('users');

                    const user = await db.findOne({ username });

                    if (user.password === password) {
                        done(null, user);
                    } else {
                        done(null, false);
                    }

                } catch (err) {
                    debug(err);
                }
                client.close();
            }());
            const user = {
                username, password
            }
        }));

}