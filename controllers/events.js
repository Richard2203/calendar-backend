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

const actualizarEvento = async (req, res = response) => {
	// el nombre de la propiedad "id" esta definido en el path
	const eventoID = req.params.id;
	const uid = req.uid;

	try {
		const evento = await Evento.findById(eventoID);

		if (!evento)
			res.status(404).json({
				ok: false,
				msg: 'No existe evento con ese ID',
			});

		if (evento.user.toString() !== uid)
			res.status(401).json({
				ok: false,
				msg: 'No tiene privilegios para editar este evento',
			});

		// creando un nuevo evento extrayendo las propieades de red.body
		// y anexando la propieadad "user"
		const nuevoEvento = {
			...req.body,
			user: uid,
		};

		console.log(nuevoEvento);

		// findByIdAndUpdate() recibe varios parametros
		// y retorna el elemento actualizado
		// - primer elemento: id del objeto "evento" a actualizar
		// - segundo elemento: un objeto con propieades equivalentes al objeto
		//   a actualizar
		// - tercer elemento: un objeto con configuraciones: la propieadad "new"
		//   "new:true" establece el retorno del objeto actualizado, de omitir
		//   esta propieadad retornara el objeto viejo
		const eventoActualizado = await Evento.findByIdAndUpdate(
			eventoID,
			nuevoEvento,
			{ new: true }
		);

		res.json({
			ok: true,
			evento: eventoActualizado,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'por favor hable con el administrador',
		});
	}
};

const eliminarEvento = async (req, res = response) => {
	// el nombre de la propiedad "id" esta definido en el path
	const eventoID = req.params.id;
	const uid = req.uid;

	try {
		const evento = await Evento.findById(eventoID);

		if (!evento)
			res.status(404).json({
				ok: false,
				msg: 'No existe evento con ese ID',
			});

		if (evento.user.toString() !== uid)
			res.status(401).json({
				ok: false,
				msg: 'No tiene privilegios para editar este evento',
			});

		await Evento.findByIdAndDelete(eventoID);

		res.json({
			ok: true,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'por favor hable con el administrador',
		});
	}
};

module.exports = { getEventos, crearEvento, actualizarEvento, eliminarEvento };
