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
    res.status(500).json({message: "Error retriving data"});
  }
});

//Get by id Function
server.get('/api/zoos/:id', async (req, res) => {
  try {
    const zoo = await db('zoos')
    .where({ id: req.params.id }); //Return record that matches specific ID from table 
    
      res.status(200).json(zoo);
  }
  catch (error) {
    res.status(500).json({message: "Error retriving data"});
  }
});

//Post Function
server.post('/api/zoos', async (req, res) => {
  try{
    const zoo = await db('zoos')
    .insert({ name: req.body.name });

    res.status(201).json(zoo);
  }
  catch (error) {
    res.status(500).json({message: "Error adding zoo"});
  }
});

//Put Function
server.put('/api/zoos/:id', async (req, res) => {
  try{
    const zoo = await db('zoos')
    .where({ id: req.params.id })
    .update(req.body);

    res.status(200).json(zoo);
  }
  catch (error) {
    res.status(500).json(error);
  }
});

//Delete Function
server.delete('/api/zoos/:id', async (req, res) => {
  try{
    const zoo = await db('zoos')
    .where({ id: req.params.id })
    .del();

    res.status(204).end();
  }
  catch (error) {
    res.status(500).json(error);
  }
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
