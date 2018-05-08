var express = require('express');
var router = express.Router();
var models = require('../models');

/* LISTAR POKEMONS. */
router.get('/', function(req, res, next) {
  models.pokemons.findAll().then(function(results){
  	return res.json(results);
  });
});

/* BUSCAR POKEMON. */
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  models.pokemons.findById(id).then(function(results){
  	return res.json(results);
  });
});

/* CRIAR POKEMON. */
router.post('/',function(req, res){
	var pokemon = req.body;
	pokemon.nivel = 1;
	/* Express Validator */
	req.assert('treinador').notEmpty().len(1, 50);
	req.assert('tipo').notEmpty().len(6, 50).tipoPokemon(req.body.tipo);
		
	var error = req.validationErrors();
	if(error){
		return res.status(400).json({});
	}
	models.pokemons.create(pokemon).then(function(data){
		return res.status(200).json(data);
	});
});

/* ALTERAR POKEMONS. */
router.put('/:id',function(req, res){
	var id = req.params.id;
	var treinador = req.body.treinador;
	req.assert('treinador','treinador invalido').notEmpty().len(1, 50);
	var error = req.validationErrors();
	if(error){
		return res.status(400).json({});
	}

	models.pokemons.update(
	  {treinador:treinador},
	  { where: { id: id } }).then(function(result){
	  	if(!result){
			return res.status(400).json({});
		}
	  	return res.status(204).json({});
	  });
});

/* DELETAR POKEMONS. */
router.delete('/:id',function(req, res){
	var id = req.params.id;
	models.pokemons.destroy({
		where: {
			id:id
		}
	}).then(function(){
		return res.status(204).json({});
	});
});

module.exports = router;
