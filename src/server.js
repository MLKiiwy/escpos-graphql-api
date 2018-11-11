import express from 'express';
import config from 'config';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './db';
import models from './models';
import ticketGenerator from './ticketGenerator';

const port = config.get('api.port');
const { Message } = models(db);
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('dist'));

app.get('/api/messages/:id', async function(req, res) {
  res.status(200).send(await Message.getById(req.params.id));
});

app.post('/api/messages', async function(req, res) {
  try {
    const msg = await Message.create(req.body);
    const imagePath = await ticketGenerator(msg.id);
    // await print(imagePath);

    res.status(201).send({
      ...msg,
      imagePath,
    });
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.listen(port);
