const { response } = require('express');
const Evento = require('../models/Evento');

const getEventos = (req, res = response) => {
	res.json({
		ok: true,
		msg: 'getEventos',
	});
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
