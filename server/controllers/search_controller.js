let swag = require('../models/swag');

module.exports = {
    search: (req, res, next) => {
        let { category } = req.query;
        let swagCategory = swag.filter(item => item.category === category);
        if (swagCategory.length === 0) {
            res.status(200).send(swag)
        } else {
            res.status(200).send(swagCategory)
        }
    }
}