'use strict';

function GPIHttpMetodo() {
}

GPIHttpMetodo.GET = 'GET';
GPIHttpMetodo.POST = 'POST';
GPIHttpMetodo.PUT = 'PUT';
GPIHttpMetodo.DELETE = 'DELETE';

(function() {
	
	angular.module("GpiBaseModule", [])
	
	.filter('filtroSimNao', function() {
		return function (input) {
			switch(input) {
				case 'S': return 'Sim';
				case 'N': return 'N\u00E3o';
				default: return '';
			}
		};
	})
	
	.filter('filtroSimNaoLogico', function() {
		return function(input) {
			if (input === true) {
				return "Sim";
			}
			return "Não";
		}
	})
	
	.filter('paddingLeft', function() {
		return function (input, size, character) {
			if(isEmpty(input)) return "";
			if(new Number(input) == 0) return "";
			if(size === undefined || size === null) return input;
			if(character === undefined || character === null) return input;
			return padl(input, size, character);
		};
	})
	
	.filter('paddingRight', function() {
		return function (input, size, character) {
			if(isEmpty(input)) return "";
			if(size === undefined || size === null) return input;
			if(character === undefined || character === null) return input;
			return padr(input, size, character);
		};
	})
	
	.filter('prefixoDV', function() {
		return function (input) {
			if(isEmpty(input)) return "";
			input = "000000000" + new Number(input);
			input = input.substring(input.length - 9);
			var q = 0;
			for(var i = 0; i < input.length; ++i) {
				q += ((i+1) * input.charAt(i));
			}
			var r = (q % 11);
			r = (r == 10 ? 'X' : ""+r);
			input = input.substring(input.length-4);
			return input + '-' + r;
		};
	})
	
	.filter('cnpjFormatado', function() {
		return function (input) {
			if(isEmpty(input)) return "";
			return completar_e_formatar_CNPJ(input);
		};
	})
	
	.filter('cepFormatado', function() {
		return function (input) {
			if(isEmpty(input)) return "";
			return completar_e_formatar_CEP(input);
		};
	})
	
	/*
	 * Formata um valor numérico na máscara do Cnae (Classificaçã Nacional de Atividade Econômica).
	 * Dúvidas, consulte http://www.cnae.ibge.gov.br.
	 */
	.filter('cnae', function() {
		
		return function (input) {
			
			if(isEmpty(input)) return "";
			
			var s = new String(input);
			while(s.length < 7) {
				s = "0"+s;
			}
			
			s = s.substring(s.length - 7);
			s = s.substring(0,5) + "/" + s.substring(5);
			s = s.substring(0,4) + "-" + s.substring(4);
			
			return s;
			
		};
		
	})
	
	.factory("GpiBaseServices", [ '$http', '$rootScope', function($http, $rootScope) {
		
		/**
		 * @param {Object} objParam
		 * @param {Boolean} isFormData
		 */
		function $$serializeParams(objParam, isFormData) {
			
			var parms = '';
			var formData = new FormData();
			
			if(objParam === null || objParam === undefined) {
				return;
			}
			
			for(var attr in objParam) {
				
				var v = objParam[attr];
				if(v == null){
					continue;
				}
				
				if(parms.length > 0) {
					parms += '&';
				}

				/*
				 * Serialization as Simple Form Data (application/x-www-form-urlencoded)
				 */
				parms += attr;
				parms += '=';
				parms += encodeURIComponent(v);
				
				/*
				 * Serialization as MultiPart Form Data (multipart/form-data)
				 */
				formData.append(attr, v);
				
			}
			
			/*
			 * Manter este teste assim, com 'true' explicito
			 */
			if(isFormData === true) {
				return formData;
			} else {
				return parms;
			}
			
		}
		
		/**
		 * Função genérica para requisições GET via AJAX.
		 * 
		 * @param {String} rootContext
		 * @param {String} nomeServico
		 * @param {String} metodoHTTP (GET | DELETE)
		 * @param {String} queryParam Parâmetros da requisição
		 * @param {Function} callback Função chamada em caso de sucesso
		 * @param {Function} errorback Função chamada em caso de falha
		 * @param {Object} configService Parâmetros diversos para configuração da chamada da requisição
		 */
		function $$getGenerico(rootContext, nomeServico, metodoHTTP, queryParam, callback, errorback, configService) {
			
			configService = $$$montaConfiguracaoPadrao(configService);
			
			var paramData = new Date().getTime();
			
			
			var parms = $$serializeParams(queryParam);
			var urlRecurso = rootContext + nomeServico + '/' + (parms != '' ? '?'+parms : '');
			
			if( configService.mostrarAguarde ) {
				window.getPortal().abrirAguardar();
			}
			
			return $http({
	
				method: metodoHTTP,
				url: urlRecurso,
				cache : false,
				headers: { 'Cache-Control' : 'no-cache' }
				
			}).success(function(data, status, headers, config){
				
				if(typeof(callback) == 'function') {
					callback(data, status, headers, config);
				} else {
					console.error("Function callback not defined!");
				}
				
			}).error(function(data, status, headers, config){
				
				if( GpiHttpStatus.NOT_FOUND == status ) {
					if( new String(headers['Content-Type']).indexOf("/html") >= 0 ) {
						console.error("Recurso n\u00E3o localizado: '%s'", urlRecurso);
						return;
					}
				}
				
				if(GpiHttpStatus.UNAUTHORIZED == status) {
					var w = window.parent || window;
					w.location.href = getContextoRaiz();
					return;
				}
				
				if(typeof(errorback) == 'function') {
					errorback(data, status, headers, config);
				}

				if( configService.exibirMensagemErro ) {
					window.getPortal().enviarMensagemErro(data);
				}
				
			})['finally'](function() {
				if(configService.mostrarAguarde){
					window.getPortal().fecharAguardar();
				}
			});
			
		}
		
		/**
		 * Função genérica para requisições POST via AJAX.
		 * 
		 * @param {String} rootContext
		 * @param {String} nomeServico
		 * @param {String} metodoHTTP (POST | PUT)
		 * @param {String} postData "Parâmetros" ou "objeto" da requisição
		 * @param {String} contentType Tipo de Media do parâmetro "postData"
		 * @param {Function} callback Função chamada em caso de sucesso
		 * @param {Function} errorback Função chamada em caso de falha
		 * @param {Object} configService Parâmetros diversos para configuração da chamada da requisição
		 */
		function $$postGenerico(rootContext, nomeServico, metodoHTTP, postData, contentType, callback, errorback, configService) {
			
			configService = $$$montaConfiguracaoPadrao(configService);
			
			var urlRecurso = rootContext + nomeServico;
			
			if( configService.mostrarAguarde ) {
				window.getPortal().abrirAguardar();
			}
			
			if(contentType == null) {
				// define tipo de contéudo padrão
				contentType = MediaType.FORM_URLENCODED;
			}
			
			var parms = null;
			if(contentType.toLowerCase() == MediaType.FORM_URLENCODED) {
				// serialização padrão (application/x-www-form-urlencoded)
				parms = $$serializeParams(postData);
			} else if(contentType.toLowerCase() == MediaType.MULTIPART_FORMDATA) {
				// serialização como multipart/form-data
				parms = $$serializeParams(postData, true);
			} else {
				// sem serialização; mantém o 'postData' como está; normalmente para tipo 'application/json' ou 'text/*' 
				parms = postData;
			}
			
			var requestData = {
					
				method: metodoHTTP,
				url: urlRecurso,
				headers: {
					'Content-type' : contentType
				},
				timeout: 600000,
				data: parms
				
			};
			
			if(contentType.toLowerCase() == MediaType.MULTIPART_FORMDATA) {
				requestData['transformRequest'] = angular.identity,
				requestData.headers['Content-type'] = undefined; 
			}
			
			return $http(requestData)
			.success(function(data, status, headers, config) {
				
				if(typeof(callback) === 'function') {
					callback(data, status, headers, config);
				}
				
				if(configService.exibirMensagemSucesso) {
					window.getPortal().enviarMensagemInfo($rootScope.MENSAGEM.OPERACAO_REALIZADA_COM_SUCESSO);
				}

			}).error(function(data, status, headers, config) {
				
				if( GpiHttpStatus.ABORTED == status ) {
					window.getPortal().enviarMensagemErro("A opera\u00E7\u00E3o foi cancelada por motivo desconhecido. Favor, tente novamente!");
					return;
				}
				
				if( GpiHttpStatus.UNAUTHORIZED == status ) {
					var w = window.parent || window;
					w.location.href = getContextoRaiz();
					return;
				}
				
				if( GpiHttpStatus.BAD_GATEWAY == status ) {
					window.getPortal().enviarMensagemErro("A opera\u00E7\u00E3o n\u00E3o foi encerrada corretamente. Favor, tente novamente!");
					return;
				}
				
				if(typeof(errorback) == 'function') {
					errorback(data, status, headers, config);
				}
				
				if(configService.exibirMensagemErro) {
					window.getPortal().enviarMensagemErro(data);
				}

			})['finally'](function(){
				if(configService.mostrarAguarde){
					window.getPortal().fecharAguardar();
				}
			});
		}
		
		return {
			
			query: function(rootContext, nomeServico, parms, callback, errorback, config) {
				$$getGenerico(rootContext, nomeServico, GPIHttpMetodo.GET, parms, callback, errorback, config);
			},
			
			//listar
			listarTodos: function(rootContext, nomeServico, callback, errorback, config) {
				config = $$$montaConfiguracaoPadrao(config);
				if(!config.mostrarAguarde) {
					config.mostrarAguarde = true;
				}
				$$getGenerico(rootContext, nomeServico + "/listar", GPIHttpMetodo.GET, { "indicadorAtivo" : "T" }, callback, errorback, config);
			},
			
			//listarAtivo
			listar: function(rootContext, nomeServico, queryParam, callback, errorback, config) {
				config = $$$montaConfiguracaoPadrao(config);
				if(!config.mostrarAguarde) {
					config.mostrarAguarde = true;
				}
				$$getGenerico(rootContext, nomeServico + "/listar", GPIHttpMetodo.GET, queryParam, callback, errorback, config);
			},
			
			filtrar: function(rootContext, nomeServico, queryParam, callback, errorback, config) {
				config = $$$montaConfiguracaoPadrao(config);
				if(!config.mostrarAguarde) {
					config.mostrarAguarde = true;
				}
				$$getGenerico(rootContext, nomeServico + "/filtrar", GPIHttpMetodo.GET, queryParam, callback, errorback, config);
			},
			
			buscar: function(rootContext, nomeServico, id, callback, errorback, config) {
				$$getGenerico(rootContext, nomeServico + "/" + id, GPIHttpMetodo.GET, null, callback, errorback, config);
			},
			
			buscarComParametros: function(rootContext, nomeServico, queryParams, callback, errorback, config) {
				config = $$$montaConfiguracaoPadrao(config);
				if(!config.mostrarAguarde) {
					config.mostrarAguarde = true;
				}
				$$getGenerico(rootContext, nomeServico, GPIHttpMetodo.GET, queryParams, callback, errorback, config);
			},
			
			excluir: function(rootContext, nomeServico, id, callback, errorback, config) {
				config = $$$montaConfiguracaoPadrao(config);
				if(!config.exibirMensagemErro) {
					config.exibirMensagemErro = true;
				}
				$$getGenerico(rootContext, nomeServico + "/" + id, GPIHttpMetodo.DELETE, null, callback, errorback, config);
			},
			
			excluirComParametros: function(rootContext, nomeServico, id, deleteParam, callback, errorback, config) {
				config = $$$montaConfiguracaoPadrao(config);
				if(!config.exibirMensagemErro) {
					config.exibirMensagemErro = true;
				}
				$$postGenerico(rootContext, nomeServico + "/" + id, GPIHttpMetodo.DELETE, deleteParam, MediaType.FORM_URLENCODED, callback, errorback, config);
			},
			
			incluirFormData: function(rootContext, nomeServico, postParam, callback, errorback, config) {
				config = $$$montaConfiguracaoPadrao(config);
				config.mostrarAguarde = true;
				$$postGenerico(rootContext, nomeServico, GPIHttpMetodo.POST, postParam, MediaType.FORM_URLENCODED, callback, errorback, config);
			},
			
			incluirMultipartFormData: function(rootContext, nomeServico, postParam, callback, errorback, config) {
				config = $$$montaConfiguracaoPadrao(config);
				config.mostrarAguarde = true;
				$$postGenerico(rootContext, nomeServico, GPIHttpMetodo.POST, postParam, MediaType.MULTIPART_FORMDATA, callback, errorback, config);
			},
			
			incluirJSON: function(rootContext, nomeServico, postData, callback, errorback, config) {
				config = $$$montaConfiguracaoPadrao(config);
				config.mostrarAguarde = true;
				$$postGenerico(rootContext, nomeServico, GPIHttpMetodo.POST, postData, MediaType.JSON, callback, errorback, config);
			},
			
			atualizarFormData: function(rootContext, nomeServico, id, putParam, callback, errorback, config) {
				config = $$$montaConfiguracaoPadrao(config);
				config.mostrarAguarde = true;
				$$postGenerico(rootContext, nomeServico + "/" + id, GPIHttpMetodo.PUT, putParam, MediaType.FORM_URLENCODED, callback, errorback, config);
			},
			
			atualizarMultipartFormData: function(rootContext, nomeServico, id, putParam, callback, errorback, config) {
				config = $$$montaConfiguracaoPadrao(config);
				config.mostrarAguarde = true;
				$$postGenerico(rootContext, nomeServico + "/" + id, GPIHttpMetodo.PUT, putParam, MediaType.MULTIPART_FORMDATA, callback, errorback, config);
			},
			
			atualizarJSON: function(rootContext, nomeServico, id, putData, callback, errorback, config) {
				config = $$$montaConfiguracaoPadrao(config);
				config.mostrarAguarde = true;
				$$postGenerico(rootContext, nomeServico + "/" + id, GPIHttpMetodo.PUT, putData, MediaType.JSON, callback, errorback, config);
			},
			
			excluirJSON: function(rootContext, nomeServico, id, putData, callback, errorback, config) {
				config = $$$montaConfiguracaoPadrao(config);
				config.mostrarAguarde = true;
				$$postGenerico(rootContext, nomeServico + "/" + id, GPIHttpMetodo.DELETE, putData, MediaType.JSON, callback, errorback, config);
			}
			
		};
		
	}]);
	
})();

/**
 * @param {Object} config
 */
function $$$montaConfiguracaoPadrao(config) {
	
	if( config === undefined ) {
		config = {};
	}
	
	if(config.mostrarAguarde === undefined) {
		config.mostrarAguarde = false;
	}
	
	if(config.exibirMensagemSucesso === undefined) {
		config.exibirMensagemSucesso = true;
	}
	
	if(config.exibirMensagemErro === undefined) {
		config.exibirMensagemErro = true;
	}
	
	return config;
	
}