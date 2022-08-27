const express = require('express');

const { PORT = 3000 } = process.env;
const app = express();
const mongoose = require('mongoose');
const routerUser = require('./routes/users');
const routerCard = require('./routes/cards');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '6309ff0c5e766b7d340b2281',
  };

  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routerUser);
app.use(routerCard);

app.use((req, res) => {
  res.status(404).send({ message: 'Проверьте корректность указанной ссылки' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
