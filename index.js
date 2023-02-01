const express = require('express');
const cors =  require('cors');
const routerApi = require('./routes'); //se importa automaticamente el archivo con nombre index
const {logErrors,errorHandler,boomErrorHandler} = require('./middlewares/errorHandler')

const app = express();
const port = 4444;

app.use(express.json());
app.use(cors());

routerApi(app);

app.use(logErrors);

app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  // console.log('Servidor en el puerto:', port);
});
