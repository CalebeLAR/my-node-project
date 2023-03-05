require('express-async-errors');
const express = require('express');
const { readMissionsData, writeNewMissionData, updateMissionData, deleteMissionData } = require('./utils/fsUtils')

const app = express();
app.use(express.json());

const validateMissionID = (req,res, next) => {
  const { id } = req.params;
  const numericID = Number(id)
  if( Number.isNaN(numericID)) return res.status(400).send({message:'ID inválido! Precisa ser um número'});
  next();
};

const validateMissionData = (req, res, next) => {
  const requiredProperties = [ 'name', 'year', 'country', 'destination'];
  if( requiredProperties.every((propeties) => propeties in req.body)) return next();
  return res.status(400).send({missions: 'A missão precisa receber os atributos name, year, country e destination'})
};

app.get('/missions', async (req, res) => {
  const allMissions = await readMissionsData();
  return res.status(200).json(allMissions);
});

app.get('/missions/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { missions: allMissions } = await readMissionsData();
  const mission = allMissions.find((m)=> m.id === id);
  if (mission) return res.status(200).json(mission);
  if (!mission) return res.status(200).json({message: "missão não encontrada"});
});

app.post('/missions', validateMissionData,  async (req, res) => {
  const newMission = req.body;
  const newMissionWhitID = await writeNewMissionData(newMission);
  return res.status(201).json({ missions: newMissionWhitID });
});

app.put('/missions/:id', validateMissionID, validateMissionData, async (req, res) => {
  const { id } = req.params;
  const updatedMissionData = req.body;
  const updatedMission = await updateMissionData(Number(id), updatedMissionData)
  return res.status(201).json({ missions: updatedMission });
});

app.delete('/missions/:id', validateMissionID, async (req, res) => {
  const { id } = req.params;
  const updatedMission = await deleteMissionData(Number(id))
  return res.sendStatus(204);
});

app.use((error, req, res, next)=> {
  console.log(error.stack);
  next(error);
});

app.use((error, req, res, next)=> {
  res.status(500).send({message: "erro: capturado em app.use(error)"})
});

module.exports = app;