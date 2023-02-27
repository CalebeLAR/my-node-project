const express = require('express');
const { readMissionsData, writeNewMissionData, updateMissionData, deleteMissionData } = require('./utils/fsUtils')

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

app.put('/missions/:id', async (req, res) => {
  const { id } = req.params;
  const updatedMissionData = req.body;
  const updatedMission = await updateMissionData(Number(id), updatedMissionData)
  return res.status(201).json({ missions: updatedMission });
});

app.delete('/missions/:id', async (req, res) => {
  const { id } = req.params;
  const updatedMission = await deleteMissionData(Number(id))
  return res.sendStatus(204);
});

module.exports = app;