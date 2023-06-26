const router = require('express').Router();

router.use('/', (req, res, next) => {
    return 'hello world';
});

module.exports = {
  Allroutes: router,
};
