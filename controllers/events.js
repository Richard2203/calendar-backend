const { response } = require('express');
const Evento = require('../models/Evento');

const getEventos = async (req, res = response) => {
	try {
		// - find() retorna todos los elementos que correspondan con el argumento
		//   enviado, si no se envia nada retorna todos los registros
		// - populate('<nomModeloCorrespondienteAPropieadad>',<campo1 campo2 campoETC...>)
		//   retorna el uid y los campos indicados en la propieadad que tenga entiedad
		// 	 relacional con otro modelo
		const events = await Evento.find().populate('user', 'name email');

		res.json({
			ok: true,
			events,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'por favor hable con el administrador',
		});
	}
};

const crearEvento = async (req, res = response) => {
	try {
		// creando una nueva instancia del modelo Evento
		// este modelo unicamente tomara las propieades que emplea,
		// el resto de propieades no establecidas en el modelo las ignorara
		const evento = new Evento(req.body);

		// req.uid contiene el id del usuario previamente logueado
		evento.user = req.uid;

		// guardando en la BD el evento
		const eventoGuardado = await evento.save();

		res.json({
			ok: true,
			evento: eventoGuardado,
		});
	} catch (error) {
		console.log(error);

		res.status(500).json({
			ok: false,
			msg: 'por favor hable con el administrador',
		});
	}
};

const actualizarEvento = (req, res = response) => {
	res.json({
		ok: true,
		msg: 'actualizarEvento',
	});
};

const eliminarEvento = (req, res = response) => {
	res.json({
		ok: true,
		msg: 'eliminarEvento',
	});
};

module.exports = { getEventos, crearEvento, actualizarEvento, eliminarEvento };
