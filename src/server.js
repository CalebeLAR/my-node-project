const app = require('./app');
const connection = require('./db/connection');

const PORT = 3000;

  // - comandos passar o script.sql para o container;
  // docker cp ./trybestrelar.sql "idCOntainer":/
  // docker exec "idCOntainer" /bin/sh -c 'mysql -uroot -proot </trybestrelar.sql'
  // docker exec -it "idCOntainer" mysql -uroot -proot

app.listen(PORT, async () => {
  console.log(`Back-end rodando na porta ${PORT}`);

  const [result] = await connection.execute('SELECT * FROM missions');
  if(result) console.log('MySQL Connection Ok!');
});

