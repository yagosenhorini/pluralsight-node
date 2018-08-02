const passport = require('passport');
require('./strategies/local.strategy');

module.exports = function passportConfig(app){
    
    app.use(passport.initialize());
    app.use(passport.session());
    
    //armazena usuario na sessao
    passport.serializeUser((user, done)=>{
        done(null, user)
    });

    //devolve o usuario na sessao
    passport.deserializeUser((user, done)=>{
        done(null, user);
    });

}