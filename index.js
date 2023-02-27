const { writeNewFile } = require('./src/utils/fsUtils.js');
const readline = require('readline-sync');

const main = async () => {
  const name = readline.question('Digite o nome da missão: '); 
  const year = readline.question('Digite o ano da missão: '); 
  const country = readline.question('Digite o qual pais realizou a missão: '); 
  const destination = readline.question('Digite o destino da missão: '); 
  
  const nemPerson = {
    name,
    year,
    country,
    destination
  };

  await writeNewFile(nemPerson);
};

main();
