const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);

server.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  const db = router.db; //lowdb instance
  const user = db
    .get('users')
    .find({ email: email, password: password })
    .value();

  if (!user) {
    res.sendStatus(401);    
  } else {

    const {id,nombre}=user

    // Aquí puedes generar un token de seguridad. En este ejemplo, simplemente // Aquí puedes generar un token de seguridad. En este ejemplo, simplemente
    // usamos un string estático como token, pero en una aplicación real
    // debes generar un token seguro y único para cada usuario.
    const token = "4asd564as54d65as4das4d564asd498g98fh98dfs4hfg4h974345t94k984*/73r7hdasf";
    
    // Devuelve el usuario y el token
    res.json({ id,nombre, token });
  }
});

server.use(router);

server.listen(4000, () => {
  console.log('JSON Server is running on port 4000');
});