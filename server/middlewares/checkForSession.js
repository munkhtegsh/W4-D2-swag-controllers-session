// custom middleware that will check to see if session created yet or not
module.exports = (req, res, next) => {
    if (!req.session.user) {
        req.session.user = { //adding user to session
            username: '',
            cart: [],
            total: 0
        };
    }
    next();
}