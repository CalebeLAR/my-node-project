const { readFile } = require('./src/utils/fsUtils.js');

const main = async () => {
  const missions = await readFile();
  // console.log(missions);
}

main();
