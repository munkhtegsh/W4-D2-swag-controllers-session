let users = require('../models/users');
let id = 1;

module.exports = {
    login: (req, res, next) => {
        console.log(req.session.user)
        users.forEach(user => {
            if (user.username === req.body.username && user.password === req.body.password) {
                req.session.user.username = req.body.username;
                res.status(200).send(req.session.user.username);
            } else {
                res.status(500);
            }
        });
    },

    register: (req, res, next) => {
        let { username, password } = req.body;
        users.push(username, password);
        id++;
        req.session.user.username = username;
        res.status(200).send(req.session.user);
    },

    signout: (req, res, next) => {
        req.session.destroy(); //destroying cookie
        return res.status(200).send(req.session);
    },

    getUser: (req, res, next) => {
        res.status(200).send(req.session.user);
    }
}