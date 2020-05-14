const app = require('./api/server');

const port = process.env.PORT || 3000;

app.listen(port);
console.log(`Conectado na porta ${port}`);
