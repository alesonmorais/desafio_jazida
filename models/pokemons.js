module.exports = function(sequelize, DataTypes){
	var pokemons = sequelize.define('pokemons',
	{
		'tipo' : DataTypes.STRING(50),
		'treinador' : DataTypes.STRING(50),
		'nivel' : DataTypes.INTEGER,
	},{
		timestamps: false
	});
	return pokemons;
}