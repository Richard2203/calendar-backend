const moment = require('moment');

// el valor de value sera asignado por el router.<metodo>. Aqui esta la informacion
// relacionada al endpoint (header,body,etc)
const isDate = (value) => {
	// si value esta vacio retorna "false" y esto le dira al express-validator
	// que no es correcto y por lo cual la validacion fallara
	if (!value) return false;

	const date = moment(value);

	return date.isValid() ? true : false;
	// if (date.isValid()) return true;
	// else return false;
};

module.exports = isDate;
