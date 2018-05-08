var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* BATALHA POKEMON. */
router.post('/batalhar/:pokemonAid/:pokemonBid',function(req, res){
	var id_a = req.params.pokemonAid;
	var id_b = req.params.pokemonBid;
	/* Express Validator */
	req.assert('pokemonAid').notEmpty().isInt();
	req.assert('pokemonBid').notEmpty().isInt();
	var error = req.validationErrors();
	if(error){
		return res.status(400).json({});
	}
	models.pokemons.findAll({
    where: {
        id: [id_a,id_b]
    }
	}).then(function(result){
		if(!result || Object.keys(result).length < 2){
			return res.status(400).json({});
		}
		pokemon_a = result[0].dataValues;
		pokemon_b = result[1].dataValues;
		var json_sort = {};
		if(pokemon_a.nivel > pokemon_b.nivel){
			json_sort[0] = {id:id_a};
			json_sort[1] = {id:id_a};
			json_sort[2] = {id:id_b};
		}else if(pokemon_b.nivel > pokemon_a.nivel){
			json_sort[0] = {id:id_b};
			json_sort[1] = {id:id_b};
			json_sort[2] = {id:id_a};
		}else{
			json_sort[0] = {id:id_b};
			json_sort[1] = {id:id_a};
		}

		var min = Math.ceil(0);
		var max = Math.floor(Object.keys(json_sort).length);
		var resultado =  Math.floor(Math.random() * (max - min)) + min;
		
		var retorno = {};
		if(json_sort[resultado].id == id_a){
			pokemon_a.nivel = pokemon_a.nivel + 1;
			pokemon_b.nivel = pokemon_b.nivel - 1;
			retorno.vencedor = pokemon_a;
			retorno.perdedor = pokemon_b;
			models.pokemons.update(
			    {nivel:pokemon_a.nivel},
				{ where: { id: id_a } }).then(function(result){});
			if(pokemon_b.nivel < 1){
				models.pokemons.destroy({
				where: {
					id:id_b
				}}).then(function(result){});
			}else{
				models.pokemons.update(
			    {nivel:pokemon_b.nivel},
				{ where: { id: id_b } }).then(function(result){});
			}
		}else{
			pokemon_b.nivel = pokemon_b.nivel + 1;
			pokemon_a.nivel = pokemon_a.nivel - 1;
			retorno.vencedor = pokemon_b;
			retorno.perdedor = pokemon_a;
			models.pokemons.update(
			    {nivel:pokemon_b.nivel},
				{ where: { id: id_b } }).then(function(result){});
			if(pokemon_a.nivel < 1){
				models.pokemons.destroy({
				where: {
					id:id_a
				}}).then(function(result){});
			}else{
				models.pokemons.update(
			    {nivel:pokemon_a.nivel},
				{ where: { id: id_a } }).then(function(result){});
			}
		}
		return res.status(200).json(retorno);
	});
});

module.exports = router;
