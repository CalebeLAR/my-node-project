const express = require('express');
const { writeNewFile, readFile } = require('./utils/fsUtils')

const app = express();
app.use(express.json());

app.get('/students', async (req, res) => {
  const students = await readFile();

  return res.status(200).json(students);
});

app.post('/students', async (req, res) => {
  const students = await readFile();

  return res.status(200).json(students);
});

module.exports = app;