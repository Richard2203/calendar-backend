const { Schema, model } = require('mongoose');

// Schema crea una especie de tabla en mongoDb, recibe un objeto de propieades
// estableciendo el tipo de dato que sera, si es obligatorio el campo y si es
// repetible
const UsurioSchema = new Schema({
	name: {
		type: String,
		require: true,
	},
	email: {
		type: String,
		require: true,
		unique: true,
	},
	password: {
		type: String,
		require: true,
	},
});

// exportando un model, recibe el nombre de la "tabla" y el schema
module.exports = model('Usuario', UsurioSchema);
