const { writeNewFile } = require('./src/utils/fsUtils.js');

const main = async () => {
  await writeNewFile({
    "name": "Jhin",
    "age": 33,
    "id": 90,
    "talk": {
      "watchedAt": "23/10/2020",
      "rate": 7
    }
  })
}

main();
