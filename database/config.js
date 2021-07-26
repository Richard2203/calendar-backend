// importando la libreria mongoose para poder conectar mongo a node
const mongoose = require('mongoose');

const dbConnection = async () => {
	try {
		// .connect recibe la cadena de conexion y un objeto con ciertas propieades
		// .connect retorna una promesa
		await mongoose.connect(process.env.DB_CNN, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		console.log('BD online');
	} catch (error) {
		console.log(error);
		throw new Error('Error en la conexion a BD');
	}
};

module.exports = dbConnection;
