const fs = require('fs').promises;
const path = require('path');

const dir_file = '../../data/missions.json'

async function readMissionsData() {
  const data = await fs.readFile(path.resolve(__dirname, dir_file));
  const missions = JSON.parse(data); // se esse .json estiver vazio, o parse da problema!
  return missions;
}

async function writeNewMissionData(obj) {
  const previousMissions = await readMissionsData();
  const newMission = { id: Date.now(), ...obj };
  const newMissions = { missions: [...previousMissions.missions, newMission] };
  await fs.writeFile(path.resolve(__dirname, dir_file), JSON.stringify(newMissions));
  return newMission;
}

async function updateMissionData(id, updatedMissionData) {
  const { missions: oldMissions } = await readMissionsData();
  const updatedMission = { id, ...updatedMissionData }
  const updatedMIssions = oldMissions.reduce((missionsList, currentMission) => {
    if (currentMission.id === updatedMission.id) return [...missionsList, updatedMission];
    return [...missionsList, currentMission];
  }, []);

  await fs.writeFile(path.resolve(__dirname, dir_file), JSON.stringify({ missions: [...updatedMIssions] }));
  return updatedMIssions;
}

async function deleteMissionData(id, updatedMissionData) {
  const { missions: oldMissions } = await readMissionsData();
  const updatedMIssions = oldMissions.filter((mission) => mission.id !== id);
  await fs.writeFile(path.resolve(__dirname, dir_file), JSON.stringify({ missions: [...updatedMIssions] }));
}

module.exports = {
  readMissionsData,
  writeNewMissionData,
  updateMissionData,
  deleteMissionData
};