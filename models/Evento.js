const { Schema, model } = require('mongoose');

// Schema crea una especie de tabla en mongoDb, recibe un objeto de propieades
// estableciendo el tipo de dato que sera, si es obligatorio el campo y si es
// repetible
const EventosSchema = new Schema({
	title: {
		type: String,
		require: true,
	},
	notes: {
		type: String,
		require: true,
	},
	start: {
		type: Date,
		require: true,
	},
	end: {
		type: Date,
		require: true,
	},
	// creando una referencia ID con otro modelo
	user: {
		type: Schema.Types.ObjectId,
		ref: 'Usuario',
	},
});

// exportando un model, recibe el nombre de la "tabla" y el schema
module.exports = model('Evento', EventosSchema);
