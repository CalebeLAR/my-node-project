const fs = require('fs').promises;
const path = require('path');

const dir_file = '../../data/missions.json'

async function readMissionsData () {
  try {
    const data = await fs.readFile(path.resolve(__dirname, dir_file));
    const missions = JSON.parse(data); // se esse .json estiver vazio, o parse da problema!
    return missions;
  } catch(error) {
    console.error('ERRO: ', error.message);
  }
}

async function writeNewFile(obj) {
  try {
    const previousMissions = await readMissionsData();
    const newMission =  { id: Date.now(),...obj};
    const newMissions = [...previousMissions, { id: Date.now(),...obj}];

    await fs.writeFile(path.resolve(__dirname, dir_file), JSON.stringify(newMissions));
    return newMission;
  } catch (e) {
    console.error("ALGO DEU ERRADO\n", e);
  }
}

async function updateMissionData () {
  const oldMission = await readMissionsData();
}

module.exports = { writeNewFile, readMissionsData };