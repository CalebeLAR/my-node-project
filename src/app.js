const express = require('express');
const { readMissionsData, writeNewMissionData } = require('./utils/fsUtils')

const app = express();
app.use(express.json());

app.get('/missions', async (req, res) => {
  const allMissions = await readMissionsData();

  return res.status(200).json(allMissions);
});

app.post('/missions', async (req, res) => {
  const newMission = req.body;
  const newMissionWhitID = await writeNewMissionData(newMission);
  return res.status(200).json({ missions: newMissionWhitID });
});

module.exports = app;