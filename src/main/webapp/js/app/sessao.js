'use strict';

( function() {
	
	angular.module('GpiSessionModule', [])
	
	.controller('GpiSessaoController', [ '$rootScope', '$scope', '$http', function($rootScope, $scope, $http) {
		
		$rootScope.usuarioSessao = null;
		$rootScope.tokenSessao = "";
		
		$rootScope.$watch('usuarioSessao', function(value) {
			if(value == null) return;
			window.getPortal().setUsuarioSessao(value);
		});
		
		$rootScope.$watch('tokenSessao', function(value) {
			window.getPortal().setTokenSessao(value);
		});
		
		$http({ method : 'GET', url: getContextoRaiz() + '/ws/apps/sessao/usuario' })
		.success(function(data, status, headers, config) {
			$rootScope.usuarioSessao = data;
		});
		
		$http({ method : 'GET', url: getContextoRaiz() + '/ws/apps/sessao/tokenSessao' })
		.success(function(data, status, headers, config) {
			$rootScope.tokenSessao = data;
		});
		
		$scope.efetuarLogout = function() {
			location.href = getContextoRaiz() + "/Logout";
		};
		
	} ] )

	;

} )();
