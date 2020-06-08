const app = require('./server');

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Conectado na porta ${port}`));
