const express = require('express');
const { readMissionsData, writeNewMissionData, updateMissionData, deleteMissionData } = require('./utils/fsUtils')

const app = express();
app.use(express.json());

const validateMissionID = (req,res, next) => {
  const { id } = req.params;
  try {
    const numericID = Number(id)
    if( Number.isNaN(numericID)) return res.status(400).send({message:'ID inválido! Precisa ser um número'});
    next();
  } catch (error) {
    console.error('ERRO! algo deu errado na validação do ID.');
  }
};

const validateMissionData = (req, res, next) => {
  const requiredProperties = [ 'name', 'year', 'country', 'destination'];
  try {
    if( requiredProperties.every((propeties) => propeties in req.body)) return next();
    return res.status(400).send({missions: 'A missão precisa receber os atributos name, year, country e destination'})
  } catch (error) {
    console.error('ERRO! algo deu errado na validação de MissonsData.');
  }
};


app.get('/missions', async (req, res) => {
  const allMissions = await readMissionsData();

  return res.status(200).json(allMissions);
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

module.exports = app;