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
		/* nivel 4 */
		for (var i = 0; i < pokemon_a.nivel; i++) {
			json_sort[i] = {id:pokemon_a.id};
			if((i+1) == pokemon_a.nivel){
				for (var j = (i+1); j < (pokemon_a.nivel+ pokemon_b.nivel); j++) {
					json_sort[j] = {id:pokemon_b.id};
				}
			}
		}
		var min = Math.ceil(0);
		var max = Math.floor(Object.keys(json_sort).length);
		var resultado =  Math.floor(Math.random() * (max - min)) + min;
		
		var retorno = {};
		console.log({vencedor:json_sort[resultado].id});
		if(json_sort[resultado].id == pokemon_a.id){
			pokemon_a.nivel = pokemon_a.nivel + 1;
			pokemon_b.nivel = pokemon_b.nivel - 1;
			retorno.vencedor = pokemon_a;
			retorno.perdedor = pokemon_b;
			models.pokemons.update(
			    {nivel:pokemon_a.nivel},
				{ where: { id: pokemon_a.id } }).then(function(result){});
			if(pokemon_b.nivel < 1){
				models.pokemons.destroy({
				where: {
					id:pokemon_b.id
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
				{ where: { id: pokemon_b.id } }).then(function(result){});
			if(pokemon_a.nivel < 1){
				models.pokemons.destroy({
				where: {
					id:pokemon_a.id
				}}).then(function(result){});
			}else{
				models.pokemons.update(
			    {nivel:pokemon_a.nivel},
				{ where: { id: pokemon_a.id } }).then(function(result){});
			}
		}
		return res.status(200).json(retorno);
	});
});

module.exports = router;
