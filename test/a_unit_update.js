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

    it('#Alterar Treinador',function(done){
        request.put('/pokemons/1')
        .send({ treinador:"Alberto" })
        .expect(204, done);
    });

});