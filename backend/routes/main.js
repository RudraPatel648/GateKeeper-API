const router = require('express').Router();
const authenticationMiddleware = require('../middleware/auth');
const {login , access} = require('../controllers/main');

router.post('/gatekeeper/login' , login);
router.get('/gatekeeper/access' , authenticationMiddleware , access);

module.exports = router