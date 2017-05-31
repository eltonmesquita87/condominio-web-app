/*
 * Define constantes de tipos de media HTTP comuns
 */
/* global nfc */

function MediaType() {
}
MediaType.FORM_URLENCODED = "application/x-www-form-urlencoded";
MediaType.MULTIPART_FORMDATA = "multipart/form-data";
MediaType.JSON = "application/json";

/*
 * Define constantes para codigos de resposta HTTP comuns
 */
function GpiHttpStatus() {
}

GpiHttpStatus.ABORTED = 0;
GpiHttpStatus.UNAUTHORIZED = 401;
GpiHttpStatus.NOT_FOUND = 404;
GpiHttpStatus.BAD_GATEWAY = 502;

function alltrim(s) {

	if (s === undefined
		|| s === null) {
		return "";
	}

	s = "" + s;

	var i = 0;
	for (; i < s.length; ++i) {
		if (s.charAt(i) == ' '
			|| s.charAt(i) == '\r'
			|| s.charAt(i) == '\n') {
			continue;
		} else {
			break;
		}
	}

	var j = (s.length - 1);
	for (; j >= 0; --j) {
		if (s.charAt(j) == ' '
			|| s.charAt(j) == '\r'
			|| s.charAt(j) == '\n') {
			continue;
		} else {
			break;
		}
	}

	var q = "";
	for (var k = i; k <= j; ++k) {
		q += s.charAt(k);
	}

	return q;

}

/**
 * @param {String} source
 */
function isEmpty(source) {

	if (source === null
		|| source === undefined) {
		return true;
	}

	source = "" + source;

	for (var i = 0; i < source.length; ++i) {
		if (source.charAt(i) != ' '
			&& source.charAt(i) != '\r'
			&& source.charAt(i) != '\n') {
			return false;
		}
	}

	return true;

}

/**
 * Limpar o conteúdo de um container HTML
 * @param {Node} container
 */
function limparContainer(container) {

	for (; container.childNodes.length > 0; ) {
		var e = container.childNodes[container.childNodes.length - 1];
		e.parentNode.removeChild(e);
	}

}

/**
 * Completa conteúdo com o caracter informado, alinhando texto à esquerda 
 * @param {String} source
 * @param {Number} size
 * @param {String} c
 */
function padl(source, size, c) {

	var s = "" + source;

	if (c == null) {
		c = ' ';
	}
	if (size == null) {
		size = 1;
	}

	while (s.length < size) {
		s = c + s;
	}

	return s.substring(s.length - size);

}

/**
 * Completa conteúdo com o caracter informado, alinhando texto à direita 
 * @param {String} source
 * @param {Number} size
 * @param {String} c
 */
function padr(source, size, c) {

	var s = "" + source;

	if (c == null) {
		c = ' ';
	}
	if (size == null) {
		size = 1;
	}

	while (s.length < size) {
		s += c;
	}

	return s.substring(0, size);

}

/**
 * Recupera a altura total da janela, considerando a barra de rolagem vertical
 * @returns
 */
function globalHeight() {
	return (window.innerHeight + window.pageYOffset);
}

/**
 * Remove os caracteres especiais
 * @param {String} nome 
 * @returns {String}
 */
function removerCaracteresEspeciais(nome) {
	return new String(nome).replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-');
}

/**
 * Completa e Formata o CNPJ
 * @param {String} cnpj
 */
function completar_e_formatar_CNPJ(cnpj) {
	cnpj = removerCaracteresEspeciais(cnpj);
	cnpj = padl(cnpj, 14, "0");
	cnpj = cnpj.substring(0, 2) + "." + cnpj.substring(2, 5) + "." + cnpj.substring(5, 8) + "/" + cnpj.substring(8, 12) + "-" + cnpj.substring(12, 14);
	return cnpj;
}

/**
 * Completa e formata o CEP
 * @param cep
 * @returns {String}
 */
function completar_e_formatar_CEP(cep) {
	cep = removerCaracteresEspeciais(cep);
	cep = padl(cep, 8, "0");
	cep = cep.substring(0, 5) + "-" + cep.substring(5, 8);
	return cep;
}

/**
 * Recupera o contexto raiz padrão da aplicação
 * @returns {String}
 */
function getContextoRaiz() {
	return '/condominio';
}

/**
 * Retorna a data formatada no formato String
 * @returns {String}
 */
function dataAtualFormatada() {
	var data = new Date();
	var dataFormatada = ("0" + data.getDate()).substr(-2) + "/" + ("0" + (data.getMonth() + 1)).substr(-2) + "/" + data.getFullYear();
	return dataFormatada;
}

function dataInfinita() {
	var data = new Date(9999, 11, 31);
	var dataFormatada = ("0" + data.getDate()).substr(-2) + "/" + ("0" + (data.getMonth() + 1)).substr(-2) + "/" + data.getFullYear();
	return dataFormatada;
}

/**
 * Retorna a chave com a data concatenada no formato String
 * @returns {String}
 */
function concatenaData(id, dataHora) {
	var str = dataHora;
	var dia = str.substring(0, 2);
	var mes = str.substring(3, 5);
	var ano = str.substring(6, 10);
	var data = dia + '-' + mes + '-' + ano;
	var hora = str.substring(11, 13);
	var min = str.substring(14, 16);
	var seg = str.substring(17, 19);
	var horaF = hora + '-' + min + '-' + seg;
	return id + '-' + data + '-' + horaF;
}

/**
 * Converte um valor texto numérico para número. <br/>
 * Caso o valor texto não seja um número, assume o segundo argumento. <br/>
 * Caso o segundo argumento não seja um número, define o valor como 0 (zero).
 * @param {String} source
 * @param {Number} defaultValue
 */
function convertNumber(source, defaultValue) {
	var n = new Number(source);
	if (isNaN(n))
		n = new Number(defaultValue);
	if (isNaN(n))
		n = new Number(0);
	return n;
}
/**
 * Retorna um núemero de contrato formatado
 * @param {type} numero
 * @returns {String}
 */
function formatarNContrato(numero) {
	novoNumero = numero.substring(0, 4) + "/" + numero.substring(4, 8) + "-" + numero.substring(8, 12);
	return novoNumero;
}

/**
 * Retona valores sim e não para abreviações dos mesmos
 * @param {type} abrev
 * @returns {novoNumero|String}
 */
function retornaValorSimENao(abrev) {
	if (!isEmpty(abrev)) {
		if (abrev === 'S') {
			return "Sim";
		}
		else if (abrev === 'N') {
			return "N\u00e3o";
		}
		else {
			return null;
		}
	}
	return novoNumero;
}
/**
 * Limpa os atributos de um objeto, inserindo null caso estajam vazios
 * @param obj
 * @returns
 */
function trimEmObjeto(obj) {

	for (var prop in obj) {
		if (isEmpty(obj[prop])) {
			obj[prop] = null;
		}
	}
	return obj;
}

/**
 * Limpa os atributos de um objeto
 * @param obj
 * @returns
 */
function limparObjeto(obj) {

	for (var prop in obj) {

		obj[prop] = null;

	}
	return obj;
}

/**
 * Verifica se os atributos do objeto estão vazios
 * @param obj
 * @returns
 */
function verificaObjetoVazio(obj) {

	for (var prop in obj) {
		if (!isEmpty(obj[prop])) {
			return false;
		}
	}
	return true;
}

/**
 * Converte valor monetário string para float
 * @param {type} valor
 * @returns {unresolved}
 */
function converteMonetarioParaFloat(valor) {
	if (!isEmpty(valor)) {
		var valorTemp = valor.split('.').join('');
		var valorTempFloat = valorTemp.replace(',', '.');

		return parseFloat(valorTempFloat);
	}
	else {
		return null;
	}
}