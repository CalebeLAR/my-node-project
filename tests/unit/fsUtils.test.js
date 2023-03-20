const { expect } = require('chai');
const sinon = require('sinon');
const fs = require('fs/promises');
const { readMissionsData } = require('../../src/utils/fsUtils');

const mockDataMissions = JSON.stringify({
  missions:[
    {
      "id": 1,
      "name": "Mariner 2",
      "year": "1962",
      "country": "United States",
      "destination": "Vênus"
    },
    {
      "id": 2,
      "name": "Mariner 5",
      "year": "1967",
      "country": "United States",
      "destination": "Vênus"
    },
    {
      "id": 3,
      "name": "Venera 4",
      "year": "1967",
      "country": "URSS",
      "destination": "Vênus"
    }
  ]
});

describe('A função readMissionsData', async function () {
  it('deve retornar um array', async function () {
    sinon.stub(fs, 'readFile').resolves(mockDataMissions);
    const { missions } = await readMissionsData();
    expect(missions).to.be.instanceOf(Array);
    expect(missions).to.be.lengthOf(3);
    sinon.restore();
  });
});
