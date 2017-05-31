'use strict';

(function () {

	angular.module("GpiComponentesModule", [])

		.directive('gpiOnlyDigits', function () {
			return {
				restrict: 'A',
				link: function (scope, element, attrs) {
					$(element).numeric();
				}
			};
		})

		.directive('gpiAlfaNumerico', function () {
			return {
				restrict: 'A',
				link: function (scope, element, attrs) {
					$(element).blur(function () {
						var v = $(this).val();
						v = v.replace(/[^A-Za-z\u00C0-\u00FC0-9 ]/g, "");
						$(this).val(v.toUpperCase());
					});
				}
			};
		})

		.directive('gpiNumbersOnly', function() {
			return {
				require : 'ngModel',
				link : function(scope, element, attrs, modelCtrl) {
					modelCtrl.$parsers.push(function(inputValue) {
						if (inputValue == undefined) {
							return '';
						}
						var transformedInput = inputValue.replace(/[^0-9]/g, '');
						if (transformedInput != inputValue) {
							modelCtrl.$setViewValue(transformedInput);
							modelCtrl.$render();
						}
						return transformedInput;
					});
				}
			};
		})
		.directive('gpiMaskMoeda', function ($parse) {
			return {
				restrict: 'A',
				link: function (scope, element, attrs) {
					var parsed = $parse(attrs['ngModel']);
					element.bind('blur', function(e){
						if(parsed.assign) {
							scope.$apply(function(){
								parsed.assign(scope, element.val());
							});
						}
					});
					
					$(element).priceFormat({
						prefix: '',
						centsSeparator: ',',
						thousandsSeparator: '.'
					});
				}
			};
		})

				.directive('gpiMaskMoeda12Positions', function ($parse) {
			return {
				restrict: 'A',
				link: function (scope, element, attrs) {
					var parsed = $parse(attrs['ngModel']);
					element.bind('blur', function(e){
						if(parsed.assign) {
							scope.$apply(function(){
								parsed.assign(scope, element.val());
							});
						}
					});
					
					$(element).priceFormat({
						prefix: '',
						centsSeparator: ',',
						thousandsSeparator: '.',
						limit:12,
						centsLimit:2
					});
				}
			};
		})

		
		
		.directive('gpiTelefoneMask', function ($parse) {
			return {
				restrict: 'A',
				link: function (scope, element, attrs) {
					var parsed = $parse(attrs['ngModel']);
					element.bind('keypress', function(e) {

						if (e.keyCode != 8) {
							var transformedInput = e.key.replace(/[^0-9]/g, '');
							
							var numbers = $(element).val()+transformedInput;
							var phoneNumber = numbers.replace('-', '');
							
							if (phoneNumber.length >= 9) {
								$(element).mask("00000-0000");
							} else {
								$(element).mask("0000-0000");
							}
							
						} else {
							$(element).setVal("") ;
						}
						if (parsed.assign) {
							scope.$apply(function(){
								parsed.assign(scope, element.val());
							});
						}
					})
				}
			}
		})
		
		.directive('gpiInputFile', ['$parse', function ($parse) {
			return {
					restrict : 'A',
					link : function(scope, element, attrs) {
						var model = $parse(attrs.gpiInputFile);
						var modelSetter = model.assign;

						element.bind('change', function() {
							scope.$apply(function() {
								modelSetter(scope, element[0].files[0]);
							});
						});
					}
				};
		} ])
		
		.directive('gpiInputCnpj', ['$timeout', function ($timeout) {
			return {
					restrict : 'A',
					link : function(scope, element, attrs) {
						$timeout(function(){
							$(element).mask("00.000.000/0000-00");
							$(element).attr("maxlength", "18");
						})
					}
				};
		} ])
		
		.directive('autoComplete', function ($timeout) {
			return function (scope, iElement, iAttrs) {
				iElement.autocomplete({
					source: scope[iAttrs.uiItems],
					select: function () {
						$timeout(function () {
							iElement.trigger('input');
						}, 0);
					}
				});
			};
		})

		.directive('gpiDateMask', function () {
			return {
				restrict: 'A',
				link: function (scope, element, attrs) {
					$(element).mask("99/99/9999");
				}
			}
		})
		
		.directive('gpiLongitudeMask', function () {
			return {
				restrict: 'A',
				link: function (scope, element, attrs) {
					$(element).mask("999º 99' 99'' ");
				}
			}
		})
		
		.directive('gpiLatitudeMask', function () {
			return {
				restrict: 'A',
				link: function (scope, element, attrs) {
					$(element).mask("99º 99' 99'' ");
				}
			}
		})

		.directive('gpiDddMask', function () {
			return {
				restrict: 'A',
				link: function (scope, element, attrs) {
					$(element).mask("(00)");
				}
			}
		})

//		.directive('gpiTelefoneMask', function () {
//			return {
//				restrict: 'A',
//				link: function (scope, element, attrs) {
//					$(element).mask("00000-0000");
//				}
//			}
//		})
		
		.directive('gpiNumeroContratoMask', function () {
			return {
				restrict: 'A',
				link: function (scope, element, attrs) {
					$(element).mask("9999/9999-9999");
				}
			};
		})
		
		.directive('gpiLatitudeLongitudeMask', function () {
			return {
				restrict: 'A',
				link: function (scope, element, attrs) {
					 $(element).inputmask( 'decimal', {rightAlign: false, radixPoint: '.', autoGroup: true, groupSeparator: '.', groupSize: 5 } );
				}
			}
		})

		.directive('showtab',
			function () {
				return {
					link: function (scope, element, attrs) {
						element.click(function (e) {
							e.preventDefault();
							$(element).tab('show');
						});
					}
				};
			})

		.directive('gpiDatePicker', function () {
			return {
				restrict: 'A',
				link: function (scope, element, attrs) {

					var componentType = element.attr("type");
					var componentTagName = element[0].tagName;

					if (componentTagName.toUpperCase() == 'INPUT' &&
						(componentType == undefined || componentType.toUpperCase() === 'TEXT' || componentType.toUpperCase() === 'DATE'))
					{

						var $container = angular.element(document.createElement("span"));
						$container.css({"position": "relative", "margin": "0"});

						var $icone = angular.element(document.createElement("img"));
						$icone.attr("alt", "Calendario");
						$icone.attr("src", getContextoRaiz() + "/img/Calendario_-_20x20.png");

						var $link = angular.element(document.createElement("a"));
						$link.css({"position": "absolute", "left": "-25px", "top": "-1px"});
						$link.attr("href", "javascript:");
						$link.append($icone);
						$link.on('click', function () {

							element[0].focus();

						});

						var $c_link = angular.element(document.createElement("span"));
						$c_link.css({"position": "relative", "margin": "0"});
						$c_link.append($link);

						var $input = angular.element(document.createElement("span"));
						$input.css({"position": "relative", "margin": "0"});

						element.after($container);
						//element.remove();

						$input.append(element);

						$container.append($input);
						$container.append($c_link);

						$(element).datepicker(
							{
								dayNamesMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'S\u00E1b'],
								monthNames: ['Janeiro', 'Fevereiro', 'Mar\u00E7o', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
								dateFormat: 'dd/mm/yy',
								prevText: "Anterior",
								nextText: "Pr\u00F3ximo"
							});

						$(element).mask("99/99/9999");

						//	$(element).attr("readonly", "readonly");

					}

				}
			};
		})
		.directive('gpiThSort', function () {
			return {
				restrict: 'A',
				templateUrl: getContextoRaiz() + '/templates/ui/uiThSort.html',
				scope: {
					direcao: "@gpiThSort"
				},
				link: function (scope, element, attrs) {
					console.log(element.innerHtml);
					$(element).css('cursor', 'pointer');
				}
			};
		})
		
		.directive('gpiUiMonthPicker', function () {

			return {
				restrict: 'A',
				templateUrl: getContextoRaiz() + '/templates/ui/uiMonthPicker.html',
				
				scope: {
					dataEntrada: "=ngModel",
					dataClass: "=ngClass",
					dataDisabled: "=?ngDisabled",
					dataName: "@gpiName",
					dataId: "@gpiId",
				},
				
				link: function (scope, element, attrs) {

					var inputDate = $(element).find(".inputMonthPicker");
					
					$(inputDate).attr('name', scope.dataName);
					$(inputDate).attr('id', scope.dataId);

					var spanDate = $(element).find(".spanMonthPicker");

					$(inputDate).MonthPicker(
						{
							i18n: {
								year: "ano",
								prevYear: "ano anterior",
								nextYear: "ano seguinte",
								months: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
							},
							Button: false
						});
					
					$(inputDate).mask("99/9999");

					$(spanDate).on('click', function () {
						inputDate.click();
						return false;
					});
					
					$(inputDate).on('blur', function () {
						
						scope.$apply(function(){
							var dateSplit = inputDate.val().split("/");
							if (dateSplit.length == 2 && dateSplit[1] != null && dateSplit[1]<100) {
								var dateVal = dateSplit[0]+"/"+"/20"+dateSplit[1];
								scope.dataEntrada = dateVal;
							}
						});
						
					});

					scope.$watch("dataDisabled",
						function() {
							if(scope.dataDisabled) {
								$(inputDate).MonthPicker('Disable');
							} else {
								$(inputDate).MonthPicker('Enable');
							}
						}
					);
				}
			};
		})
		
		.directive('gpiUiDatePicker', function () {
			return {
				restrict: 'A',
				templateUrl: getContextoRaiz() + '/templates/ui/uiDatePicker.html',
				scope: {
					dataEntrada: "=ngModel",
					dataClass: "=ngClass",
					dataDisabled: "=?ngDisabled",
					dataName: "@gpiName",
					dataId: "@gpiId",
					dateMin: "=",
					dateMax: "="
				},
				link: function (scope, element, attrs) {

					var inputDate = $(element).find(".inputDatePicker");
					
					$(inputDate).attr('name', scope.dataName);
					$(inputDate).attr('id', scope.dataId);

					var spanDate = $(element).find(".spanDatePicker");

					$(inputDate).datepicker(
						{
							dayNamesMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'S\u00E1b'],
							monthNames: ['Janeiro', 'Fevereiro', 'Mar\u00E7o', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
							dateFormat: 'dd/mm/yy',
							prevText: "Anterior",
							nextText: "Pr\u00F3ximo"
						});
					
					scope.$watch('dateMin', function(){
						if(scope.dateMin != undefined && scope.dateMin != ""){
							$(inputDate).datepicker('option', 'minDate', scope.dateMin);
						}
					});
					
					scope.$watch('dateMax', function(){
						if(scope.dateMax != undefined && scope.dateMin != ""){
							$(inputDate).datepicker('option', 'maxDate', scope.dateMax);
						}
					});
					
					$(inputDate).mask("99/99/9999");

					$(spanDate).on('click', function () {
						inputDate.focus();
					});
					
					$(inputDate).on('blur', function () {
						
						scope.$apply(function(){
							var dateSplit = inputDate.val().split("/");
							if (dateSplit.length == 3 && dateSplit[2] != null && dateSplit[2]<100) {
								var dateVal = dateSplit[0]+"/"+dateSplit[1]+"/20"+dateSplit[2];
								scope.dataEntrada = dateVal;
							}
						});
						
					});

				}
			};
		})
		
		.directive('gpiListaDados', ['$rootScope', '$timeout', function ($rootScope, $timeout) {

				return {
					restrict: 'A',
					templateUrl: getContextoRaiz() + '/templates/componentes/gpiListaDadosTemplate.html',
					transclude: true,
					scope: {
						listaDados: '=gpiListaDados',
						cachePagina: '=gpiCacheDados',
						reverse: '=?gpiReverse',
						campoOrdenado: '=?gpiCampoOrdenado',
						identificadorTabelaOrdenacao: '=?gpiIdentificadorTabelaOrdenacao'
					},
					controller: function ($scope) {
						
						// Copia legendas dinamicas
						$scope.LABEL = $rootScope.LABEL;
						gpiListaDadosControllerFN($scope, $timeout);
                                            	
					},
					link: function (scope, element, attrs) {
						gpiListaDadosLinkFN(scope, element, attrs);
					}

				};
			}])

		.directive('gpiComboUnidadeFederativa', function ($timeout) {

			return {
				restrict: 'A',
				template: '<select class=\'form-control\' data-ng-model=\'source\' data-ng-options=\'uf.nome for uf in listaUf track by uf.codigo\'><option value=\'\'> Selecione... </option></select>',
				scope: {
					source: '=ngModel'
				},
				controller: function ($scope) {
					$scope.listaUf = getComboCacheUF();
				},
				link: function (scope, element, attrs) {
				}

			};
		})		
		.directive('checklistModel', ['$parse', '$compile', function($parse, $compile) {
		  // contains
		  function contains(arr, item, comparator) {
		    if (angular.isArray(arr)) {
		      for (var i = arr.length; i--;) {
		        if (comparator(arr[i], item)) {
		          return true;
		        }
		      }
		    }
		    return false;
		  }
		
		  // add
		  function add(arr, item, comparator) {
		    arr = angular.isArray(arr) ? arr : [];
		      if(!contains(arr, item, comparator)) {
		          arr.push(item);
		      }
		    return arr;
		  }  
		
		  // remove
		  function remove(arr, item, comparator) {
		    if (angular.isArray(arr)) {
		      for (var i = arr.length; i--;) {
		        if (comparator(arr[i], item)) {
		          arr.splice(i, 1);
		          break;
		        }
		      }
		    }
		    return arr;
		  }
		
		  // http://stackoverflow.com/a/19228302/1458162
		  function postLinkFn(scope, elem, attrs) {
		     // exclude recursion, but still keep the model
		    var checklistModel = attrs.checklistModel;
		    attrs.$set("checklistModel", null);
		    // compile with `ng-model` pointing to `checked`
		    $compile(elem)(scope);
		    attrs.$set("checklistModel", checklistModel);
		
		    // getter / setter for original model
		    var getter = $parse(checklistModel);
		    var setter = getter.assign;
		    var checklistChange = $parse(attrs.checklistChange);
		    var checklistBeforeChange = $parse(attrs.checklistBeforeChange);
		
		    // value added to list
		    var value = attrs.checklistValue ? $parse(attrs.checklistValue)(scope.$parent) : attrs.value;
		
		
		    var comparator = angular.equals;
		
		    if (attrs.hasOwnProperty('checklistComparator')){
		      if (attrs.checklistComparator[0] == '.') {
		        var comparatorExpression = attrs.checklistComparator.substring(1);
		        comparator = function (a, b) {
		          return a[comparatorExpression] === b[comparatorExpression];
		        };
		        
		      } else {
		        comparator = $parse(attrs.checklistComparator)(scope.$parent);
		      }
		    }
		
		    // watch UI checked change
		    scope.$watch(attrs.ngModel, function(newValue, oldValue) {
		      if (newValue === oldValue) { 
		        return;
		      } 
		
		      if (checklistBeforeChange && (checklistBeforeChange(scope) === false)) {
		        scope[attrs.ngModel] = contains(getter(scope.$parent), value, comparator);
		        return;
		      }
		
		      setValueInChecklistModel(value, newValue);
		
		      if (checklistChange) {
		        checklistChange(scope);
		      }
		    });
		
		    function setValueInChecklistModel(value, checked) {
		      var current = getter(scope.$parent);
		      if (angular.isFunction(setter)) {
		        if (checked === true) {
		          setter(scope.$parent, add(current, value, comparator));
		        } else {
		          setter(scope.$parent, remove(current, value, comparator));
		        }
		      }
		      
		    }
		
		    // declare one function to be used for both $watch functions
		    function setChecked(newArr, oldArr) {
		      if (checklistBeforeChange && (checklistBeforeChange(scope) === false)) {
		        setValueInChecklistModel(value, scope[attrs.ngModel]);
		        return;
		      }
		      scope[attrs.ngModel] = contains(newArr, value, comparator);
		    }
		
		    // watch original model change
		    // use the faster $watchCollection method if it's available
		    if (angular.isFunction(scope.$parent.$watchCollection)) {
		        scope.$parent.$watchCollection(checklistModel, setChecked);
		    } else {
		        scope.$parent.$watch(checklistModel, setChecked, true);
		    }
		  }
		
		  return {
		    restrict: 'A',
		    priority: 1000,
		    terminal: true,
		    scope: true,
		    compile: function(tElement, tAttrs) {
		      if ((tElement[0].tagName !== 'INPUT' || tAttrs.type !== 'checkbox') && (tElement[0].tagName !== 'MD-CHECKBOX') && (!tAttrs.btnCheckbox)) {
		        throw 'checklist-model should be applied to `input[type="checkbox"]` or `md-checkbox`.';
		      }
		
		      if (!tAttrs.checklistValue && !tAttrs.value) {
		        throw 'You should provide `value` or `checklist-value`.';
		      }
		
		      // by default ngModel is 'checked', so we set it if not specified
		      if (!tAttrs.ngModel) {
		        // local scope var storing individual checkbox model
		        tAttrs.$set("ngModel", "checked");
		      }
		
		      return postLinkFn;
		    }
		  };
		}])	
		.directive('gpiFiltroPesquisa', ['$rootScope', function($rootScope) {
			
			return {
				
				restrict: 'A',
				
				templateUrl: getContextoRaiz() + '/templates/ui/uiFiltroPesquisa.html',
				
				scope: {
					onExpandido: '&?',
					onContraido: '&?'
				},
				
				controller: function ($scope) {
					
					$scope.LABEL = $rootScope.LABEL;
					
					$scope.telaFiltroPesquisaExpandido = true;
					
					$scope.atualizar = function() {
						$scope.telaFiltroPesquisaExpandido = !$scope.telaFiltroPesquisaExpandido;
						if($scope.telaFiltroPesquisaExpandido) {
							$scope.onExpandido();
						} else {
							$scope.onContraido();
						}
					};
					
					$scope.atualizar();
					
				},
				
			}
			
		} ] )
		
		
	;

})();

function gpiListaDadosControllerFN($scope, $timeout) {

	var grupoQuantidade = 0;
//	var DEFAULT_TIMEOUT = 25;

	$scope.CACHE_LIMITE = 20;

	$scope.cachePagina = [];

	$scope.paginas = [];
	$scope.paginaAtual = 0;

	$scope.paginarPrimeiro = function (e) {
		$scope.paginaAtual = 0;
        $scope.populaLista();
//		$timeout(function () {
//                    $scope.populaLista();	
//		}, DEFAULT_TIMEOUT);
	};

	$scope.paginarAnterior = function (e) {
		if ($scope.paginaAtual == 0)
			return;
		--$scope.paginaAtual;
        $scope.populaLista();
//		$timeout(function () {
//			$scope.populaLista();
//		}, DEFAULT_TIMEOUT);
	};

	$scope.paginarProximo = function (e) {
		if ($scope.paginaAtual >= (grupoQuantidade - 1))
			return;
		++$scope.paginaAtual;
        $scope.populaLista();
//		$timeout(function () {
//			$scope.populaLista();
//		}, DEFAULT_TIMEOUT);
	};

	$scope.paginarUltimo = function (e) {
		$scope.paginaAtual = (grupoQuantidade - 1);
        $scope.populaLista();
//		$timeout(function () {
//			$scope.populaLista();
//		}, DEFAULT_TIMEOUT);
	};

	$scope.setPagina = function (pagina) {
		$scope.paginaAtual = (pagina - 1);
        $scope.populaLista();
//		$timeout(function () {
//			$scope.populaLista();
//		}, DEFAULT_TIMEOUT);
	};

	$scope.$watchCollection(function(scope){
		return scope.listaDados;}, 
	 function () {
		$scope.montarLista();
	});
	
	$scope.$on("atualizaListaOrdenada", function (event, args) {
		if(args.identificadorTabelaOrdenacao && args.identificadorTabelaOrdenacao !== $scope.identificadorTabelaOrdenacao) return false;
		$scope.listaDados = args.value;
		$scope.reverse = args.reverse;
		$scope.campoOrdenado = args.campoOrdenado;
	});

	//==============================
	//===== FUNCOES AUXILIARES =====
	//==============================

	$scope.populaLista = function() {

		if ($scope.listaDados === undefined || $scope.listaDados === null)
			return;

		$scope.cachePagina = [];

		for (var i = 0; i < $scope.CACHE_LIMITE; ++i) {
			var bean = $scope.listaDados[ ($scope.paginaAtual * $scope.CACHE_LIMITE) + i ];
			if (bean == null)
				break;
			bean.hashId = i;
			$scope.cachePagina.push(bean);
		}

//		while($scope.cachePagina.length < $scope.CACHE_LIMITE) {
//			$scope.cachePagina.push({"vazio": true});
//		} 

	}

	$scope.montarLista = function () {

		if ($scope.listaDados === undefined || $scope.listaDados === null)
			return;       
            
		$scope.paginas = [];

		grupoQuantidade = Math.ceil($scope.listaDados.length * 1.00 / $scope.CACHE_LIMITE);

		for (var ix = 1; ix <= grupoQuantidade; ++ix) {
			$scope.paginas.push(ix);
		}

		$scope.paginarPrimeiro();

	};

}

function gpiListaDadosLinkFN(scope, element, attrs) {

	if (attrs['gpiTamanhoPagina'] !== undefined) {
		try {
			scope.CACHE_LIMITE = new Number(attrs['gpiTamanhoPagina']);
		} catch (e) {
			console.error(e);
			scope.CACHE_LIMITE = 20;
		}
	}

	scope.montarLista();

}

function getComboCacheUF() {

	var listaUf = [];

	listaUf.push({codigo: 'AC', nome: 'Acre'});
	listaUf.push({codigo: 'AL', nome: 'Alagoas'});
	listaUf.push({codigo: 'AP', nome: 'Amap\u00E1'});
	listaUf.push({codigo: 'AM', nome: 'Amazonas'});
	listaUf.push({codigo: 'BA', nome: 'Bahia'});
	listaUf.push({codigo: 'CE', nome: 'Cear\u00E1'});
	listaUf.push({codigo: 'DF', nome: 'Distrito Federal'});
	listaUf.push({codigo: 'ES', nome: 'Esp\u00EDrito Santo'});
	listaUf.push({codigo: 'GO', nome: 'Goi\u00E1s'});
	listaUf.push({codigo: 'MA', nome: 'Maranh\u00E3o'});
	listaUf.push({codigo: 'MT', nome: 'Mato Grosso'});
	listaUf.push({codigo: 'MS', nome: 'Mato Grosso do Sul'});
	listaUf.push({codigo: 'MG', nome: 'Minas Gerais'});
	listaUf.push({codigo: 'PA', nome: 'Par\u00E1'});
	listaUf.push({codigo: 'PB', nome: 'Para\u00EDba'});
	listaUf.push({codigo: 'PR', nome: 'Paran\u00E1'});
	listaUf.push({codigo: 'PE', nome: 'Pernambuco'});
	listaUf.push({codigo: 'PI', nome: 'Piau\u00ED'});
	listaUf.push({codigo: 'RJ', nome: 'Rio de Janeiro'});
	listaUf.push({codigo: 'RN', nome: 'Rio Grande do Norte'});
	listaUf.push({codigo: 'RS', nome: 'Rio Grande do Sul'});
	listaUf.push({codigo: 'RO', nome: 'Rond\u00F4ndia'});
	listaUf.push({codigo: 'RR', nome: 'Roraima'});
	listaUf.push({codigo: 'SC', nome: 'Santa Catarina'});
	listaUf.push({codigo: 'SP', nome: 'S\u00E3o Paulo'});
	listaUf.push({codigo: 'SE', nome: 'Sergipe'});
	listaUf.push({codigo: 'TO', nome: 'Tocantins'});

	return listaUf;

}
