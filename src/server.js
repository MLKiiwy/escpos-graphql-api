import express from 'express';
import config from 'config';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './db';
import models from './models';
import screenshot from './screenshot';

const port = config.get('port');
const { Message } = models(db);
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('dist'));

app.get('/api/messages/:id', async function(req, res) {
  res.status(200).send(await Message.getById(req.params.id));
});

app.post('/api/messages', async function(req, res) {
  const msg = await Message.create(req.body);
  const imagePath = await screenshot(msg.id);
  // await print(imagePath);

  res.status(201).send(imagePath);
});

app.listen(port);
