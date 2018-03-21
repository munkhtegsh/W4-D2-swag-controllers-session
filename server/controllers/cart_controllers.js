let swag = require('../models/swag');

module.exports = {
    add: (req, res, next) => {
        let { id } = req.query;
        if (req.session.user.id) {
            res.status(200).send(req.session.user);
        } else {
            swag.forEach(item => {
                if (item.id === +id) {
                    req.session.user.cart.push(item);
                    req.session.user.total += item.price;
                    res.status(200).send(req.session.user);
                }
            })
        }
    },

    remove: (req, res, next) => {
        let { id } = req.query;
        req.session.user.cart.forEach(item => {
            if (item.id === +id) {
            req.session.user.total -= item.price;
            }
        });

        let cart = req.session.user.cart.filter(item => {
            return item.id !== +id;
        });
        req.session.user.cart = cart;
        res.status(200).send(req.session.user);
    },

    checkout: (req, res, next) => {
        req.session.user.cart = [];
        req.session.user.total = 0;
        res.status(200).send(req.session.user);
    }
}