const { writeNewFile } = require('./src/utils/fsUtils.js');
const readline = require('readline-sync');

const main = async () => {
  const name = readline.question('nome: '); 
  const age = readline.question('age: '); 
  const watchedAt = readline.question('watchedAt: '); 
  const rate = readline.question('rate: '); 
  
  const nemPerson = {
    name,
    age,
    "talk": {
      watchedAt,
      rate
    }
  };

  await writeNewFile(nemPerson);
};

main();
