const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = {
  client: 'sqlite3',
  connection: {
    filename: './data/lambda.sqlite3',
  },
  useNullAsDefault: true,
};
const db = knex(knexConfig);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

//Get Function
server.get('/api/zoos', async (req, res) => {
  try {
    const zoos = await db('zoos'); //Returns all the records from the table
    res.status(200).json(zoos);
  }
  catch (error) {
    res.status(500).json(error);
  }
});

//Post Function
server.post('/api/zoos', async (req, res) => {
  try{
    const zoo = await db('zoos').insert({ name: req.body.name });
    res.status(201).json(zoo);
  }
  catch (error) {
    res.status(500).json(error);
  }
});



const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
