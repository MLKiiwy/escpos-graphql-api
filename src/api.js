import express from 'express';
import path from 'path';
import config from 'config';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './db';
import models from './models';

const port = config.get('port');
const { Message } = models(db);
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/ticket', express.static(__dirname + '/dist'));

// app.get('/ticket/:id', function(req, res) {
//   res.sendFile(path.join(__dirname + '/../dist/index.html'));
// });

app.get('/messages/:id', async function(req, res) {
  res.status(200).send(await Message.getById(req.params.id));
});

app.post('/messages', async function(req, res) {
  const msg = await Message.create(req.body);
  res.status(201).send(msg);
});

app.listen(port);
