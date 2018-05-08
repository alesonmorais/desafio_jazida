require('dotenv').config();
var app = require('../app');
var models = require('../models');
var request = require('supertest')(app);

describe('pokemons', function() {

    it('#Limpar Tabela',function(done){
        models.pokemons.destroy({
          where: {},
          truncate: true
        }).then(function(){
            done();
        });
    });
    
    it('#Cadastrar Pokemon 1',function(done){
        request.post('/pokemons')
        .send({id:1, treinador:"Aleson", tipo:"pikachu"})
        .expect(200, done);
    });

    it('#Cadastrar Pokemon 2',function(done){
        request.post('/pokemons')
        .send({id:2, treinador:"Aleson", tipo:"charizard"})
        .expect(200, done);
    });

    it('#Cadastrar Pokemon 3',function(done){
        request.post('/pokemons')
        .send({id:3, treinador:"Aleson", tipo:"mewtwo"})
        .expect(200, done);
    });

    it('#Cadastrar Pokemon 4',function(done){
        request.post('/pokemons')
        .send({id:4, treinador:"Alfredo", tipo:"pikachu"})
        .expect(200, done);
    });

    it('#Cadastrar Pokemon 5',function(done){
        request.post('/pokemons')
        .send({id:5, treinador:"Alfredo", tipo:"charizard"})
        .expect(200, done);
    });

    it('#Cadastrar Pokemon 6',function(done){
        request.post('/pokemons')
        .send({id:6, treinador:"Alfredo", tipo:"mewtwo"})
        .expect(200, done);
    });

    it('#Cadastrar Pokemon 7',function(done){
        request.post('/pokemons')
        .send({id:7, treinador:"Giuseppe", tipo:"pikachu"})
        .expect(200, done);
    });
        
    it('#Cadastrar Pokemon Com Tipo Errado',function(done){
        request.post('/pokemons')
        .send({treinador:"Aleson", tipo:"charmander"})
        .expect(400, done);
    });

    it('#Cadastrar Pokemon Faltando Dados',function(done){
        request.post('/pokemons')
        .send({ tipo:"pikachu" })
        .expect(400, done);
    });

    it('#Listar Pokemons', function(done) {
        request.get('/pokemons')
        .set('Accept','application/json')
        .expect('Content-type',/json/)
        .expect(200, done);
    });

    it('#Buscar Pokemon', function(done) {
        request.get('/pokemons/2')
        .set('Accept','application/json')
        .expect('Content-type',/json/)
        .expect(200, done);
    });

    it('#Alterar Treinador',function(done){
        request.put('/pokemons/1')
        .send({ treinador:"Jose" })
        .expect(204, done);
    });

    it('#Deletar Pokemon',function(done){
        request.delete('/pokemons/7')
        .expect(204, done);
    });

    it('#Batalha Pokemon',function(done){
        request.post('/batalhar/3/5')
        .set('Accept','application/json')
        .expect('Content-type',/json/)
        .expect(200, done);
    });
    
});