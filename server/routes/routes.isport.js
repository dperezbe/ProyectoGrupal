const isport = require('../controllers/controller.isport');
const { authenticate } = require('../config/jwt.config');


module.exports = (app) => {
    
    app.post('/api/event/create', authenticate,isport.createevent);
    app.get('/api/event/:id', authenticate,isport.getevent);
    app.get('/api/events', authenticate,isport.geteventAll);
    app.get('/api/events/today', authenticate,isport.geteventToday);

    app.get('/api/members/event/:id', authenticate,isport.getMembers);
    app.put('/api/members/event/:id', authenticate,isport.addMember);
    app.delete('/api/members/:user/event/:id', authenticate,isport.pullMember);

}