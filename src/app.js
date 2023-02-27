const express = require('express');
const { writeNewFile, readMissionsData } = require('./utils/fsUtils')

const app = express();
app.use(express.json());

app.get('/missions', async (req, res) => {
  const allMissions = await readMissionsData();

  return res.status(200).json(allMissions);
});

app.post('/missions', async (req, res) => {
  const newMission = req.body;
  const newMissionWhitID = await writeNewFile(newMission);
  return res.status(200).json(newMissionWhitID);
});

module.exports = app;