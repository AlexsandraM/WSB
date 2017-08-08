module.exports = {
  getUsuarios: function(req, res){
    res.json({message: "rota para GET do /usuarios"})
  },
  postUsuarios: require('./app/routes/user_routes'),
  login: require('./app/routes/authenticate_routes')
}
