const app = require('../../src/app.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;

chai.use(chaiHttp)

describe('tests de rotas', function () {

  describe('testes para o app.get(/missions)', async function () {
    it('app.get(/missions) deve retornar uma chave missions com um array de missões e um estatus 200 OK!', async function () {
      const response = await chai.request(app).get('/missions');
      
      expect(response.status).to.be.equal(200);
      expect(response.body).to.haveOwnProperty('missions');
      expect(response.body.missions).to.be.instanceof(Array);
      
    });
  });

  describe('testes para o app.post(/missions)', async function () {
    it('app.post(/missions) deve retornar uma chave missions com um array de missões e um estatus 201 OK!', async function () {
      const mockRequest = {
        name: 'mocktest',
        year: 2023,
        country: 'trybe',
        destination: 'expect'
      }
      const response = await chai.request(app).post('/missions').send(mockRequest);

      expect(response.status).to.be.equal(201);
      expect(response.body).to.haveOwnProperty('missions');
      expect(response.body.missions).to.be.instanceof(Object);
      expect(response.body.missions).to.haveOwnProperty('id');
      expect(response.body.missions.name).to.equal(mockRequest.name);
      expect(response.body.missions.year).to.equal(mockRequest.year);
      expect(response.body.missions.country).to.equal(mockRequest.country);
      expect(response.body.missions.destination).to.equal(mockRequest.destination);
      
    });
  });
});