//forma antiga
//const user = require('../api/user')

module.exports = app =>{
    // recuperar ou cadastrar usuario
    app.route('/users')
        .post(app.api.user.save)    
        .get(app.api.user.get)
    // alterar user
    app.route('/users/:id')
        .put(app.api.user.save) //modificar usuario
        .get(app.api.user.getById) // get user by Id    
           
}