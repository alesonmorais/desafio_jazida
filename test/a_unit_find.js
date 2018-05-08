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
    
    it('#Cadastrar Pokemon',function(done){
        request.post('/pokemons')
        .send({id:1, treinador:"Aleson", tipo:"pikachu"})
        .expect(200, done);
    });

    it('#Buscar Pokemons', function(done) {
        request.get('/pokemons/1')
        .set('Accept','application/json')
        .expect('Content-type',/json/)
        .expect(200, done);
    });

});