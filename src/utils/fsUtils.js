const fs = require('fs').promises;
const path = require('path');

const dir_file = '../../data/missions.json'

async function readMissionsData () {
  try {
    const data = await fs.readFile(path.resolve(__dirname, dir_file));
    const missions = JSON.parse(data); // se esse .json estiver vazio, o parse da problema!
    return missions;
  } catch(error) {
    console.error('ERRO: função readMissionsData', error.message);
  }
}

async function writeNewMissionData(obj) {
  try {
    const previousMissions = await readMissionsData();
    const newMission =  { id: Date.now(),...obj};
    const newMissions = { missions: [...previousMissions.missions, newMission] };

    await fs.writeFile(path.resolve(__dirname, dir_file), JSON.stringify(newMissions));
    return newMission;
  } catch (error) {
    console.error("ERRO: função writeNewMissionData", error.message);
  }
}

async function updateMissionData (id, updatedMissionData) {
  const { missions:{ oldMissions }} = await readMissionsData();
  const updatedMission = { id, ...updatedMission}
  const updatedMIssions = oldMissions.reduce((missionsList, currentMission)=>{
    if(currentMission.id === updatedMission.id) return [...missionsList, updatedMission];
    return [missionsList, currentMission];
  }, [])
  const updatedData = JSON.stringify(updatedMIssions);

  
}

module.exports = { readMissionsData, writeNewMissionData };