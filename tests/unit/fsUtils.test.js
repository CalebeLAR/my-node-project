const { expect } = require('chai');
const { readMissionsData } = require('../../src/utils/fsUtils');

describe('A função readMissionsData', async function () {
  it('deve retornar um array', async function () {
    const { missions } = await readMissionsData();
    expect(missions).to.be.instanceOf(Array);
  });
});
