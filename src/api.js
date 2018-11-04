import express from 'express';
import path from 'path';
import config from 'config';
import bodyParser from 'body-parser';
import db from './db';
import models from './models';

const port = config.get('port');
const { Message } = models(db);
const app = express();

app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/messages/:id', async function(req, res) {
  res.status(200).send(await Message.getById(req.params.id));
});

app.post('/messages', async function(req, res) {
  const msg = await Message.create(req.body);
  res.status(201).send(msg);
});

app.listen(port);
