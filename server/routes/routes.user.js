const { registrar, login, whois } = require('../controllers/controller.user');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    
    app.post('/api/user', registrar);
    app.post('/api/login', login);
    app.get('/api/whois/:id',authenticate, whois);

}