const isport = require('../controllers/controller.isport');
const { authenticate } = require('../config/jwt.config');


module.exports = (app) => {
    
    app.post('/api/event/create', authenticate,isport.createevent); // Crea un evento
    app.get('/api/events', authenticate,isport.geteventAll); // Obtiene todos los eventos
    app.get('/api/event/:id', authenticate,isport.getevent); // Obtiene info de un evento :id

    app.get('/api/events/today', authenticate,isport.geteventToday); // Obtiene todos los eventos de hoy
    app.get('/api/events/today/:id', authenticate,isport.geteventTodayUser); // Obtiene todos los eventos de hoy para un usuario :id
    app.get('/api/events/future/:id', authenticate,isport.geteventFutureUser); //Obtiene los eventos futuros de un usuario :id

    app.get('/api/member/:id', authenticate,isport.geteventsByUser); //Obtiene los eventos de un usuario :id
    app.put('/api/members/event/:id', authenticate,isport.addMember); //Agrega un usuario a un evento :id
    app.delete('/api/members/:user/event/:id', authenticate,isport.pullMember); //Borra un usuario :user de un evento :id
    app.delete('/api/event/:id',authenticate,isport.deleteevent); // borra un evento

    app.get('/api/event/history/:id',authenticate,isport.historyeventOwner); // Historial de eventos creatos por el miembro :id


    app.post('/api/chat', authenticate,isport.chatnewmessage); // New Message to event
    app.get('/api/chat/:id', authenticate,isport.chatgetmessage); // Obtener mensajes de un eveno

}



