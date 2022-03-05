const { registrar, login } = require('../controllers/controller.user');

module.exports = (app) => {
    
    app.post('/api/user', registrar);
    app.post('/api/login', login);
}