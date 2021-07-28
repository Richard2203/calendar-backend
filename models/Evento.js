const { Schema, model } = require('mongoose');

// Schema crea una especie de tabla en mongoDb, recibe un objeto de propieades
// estableciendo el tipo de dato que sera, si es obligatorio el campo y si es
// repetible
const EventosSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	notes: {
		type: String,
		required: true,
	},
	start: {
		type: Date,
		required: true,
	},
	end: {
		type: Date,
		required: true,
	},
	// creando una referencia ID con otro modelo
	user: {
		type: Schema.Types.ObjectId,
		ref: 'Usuario',
		required: true,
	},
});

// el segundo argumento es una funcion que nos permite hacer diversas modificaciones
// al modelo
EventosSchema.method('toJSON', function () {
	// haciendo referencia al modelo que se esta construyendo
	// this.toObject();
	const { _id, __v, ...object } = this.toObject();

	// object.<NomPropieadadNueva> = <NomPropieadadieja>
	// nos permite reasignar nombres a una propieadad y modificar valores
	object.id = _id;
	return object;
});

// exportando un model, recibe el nombre de la "tabla" y el schema
module.exports = model('Evento', EventosSchema);
