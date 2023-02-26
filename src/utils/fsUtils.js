const fs = require('fs').promises;
const path = require('path');

const dir_file = '../../data/missions.json'

async function readFile() {
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
    const previousMissions = await readFile(); 
    const newMission = [...previousMissions, { id: Date.now(),...obj}];

    await fs.writeFile(path.resolve(__dirname, dir_file), JSON.stringify(newMission));
  } catch (e) {
    console.error("ALGO DEU ERRADO\n", e);
  }
}

module.exports = { writeNewFile, readFile };