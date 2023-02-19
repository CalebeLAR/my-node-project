const fs = require('fs').promises;
const path = require('path');

async function readFile() {
  try {
    const data = await fs.readFile(path.resolve(__dirname, '../../data/missions.json'))
    const missions = JSON.parse(data);
    return missions;
  } catch(error) {
    console.error('ERRO: ', error.message);
  }
}

module.exports = {
  readFile
}