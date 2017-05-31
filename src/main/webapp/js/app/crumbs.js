function crumbs() {
	var objCrumbs = new Array();
	objCrumbs['index'] = [
		{url: '/', nome: 'P\u00E1gina Inicial'}
	];
	objCrumbs['/parametro/listaParametro'] = [
		{url: 'parametro/listaParametro', nome: 'Par\u00E2metro'}
	];
	objCrumbs['/parametro/parametrosc1'] = [
		{url: 'parametro/parametrosc1', nome: 'Par\u00E2metro - Cen\u00E1rio 1'}
	];
	objCrumbs['/parametro/parametrosc2'] = [
		{url: 'parametro/parametrosc2', nome: 'Par\u00E2metro - Cen\u00E1rio 2'}
	];
	objCrumbs['/parametro/parametrosc3'] = [
		{url: 'parametro/parametrosc3', nome: 'Par\u00E2metro - Cen\u00E1rio 3'}
	];
	objCrumbs['/parametro/visualizarPar_c1'] = [
		{url: 'parametro/visualizarPar_c1', nome: 'Editar Par\u00E2metro'}
	];
	objCrumbs['/parametro/editarPar_c1'] = [
		{url: 'parametro/editarPar_c1', nome: 'Editar Par\u00E2metro'}
	];
	objCrumbs['/parametro/cadastrarPar_c1'] = [
		{url: 'parametro/cadastrarPar_c1', nome: 'Cadastrar Par\u00E2metro'}
	];
	objCrumbs['/parametro/visualizarPar_c2'] = [
		{url: 'parametro/visualizarPar_c2', nome: 'Editar Par\u00E2metro'}
	];
	objCrumbs['/parametro/editarPar_c2'] = [
		{url: 'parametro/editarPar_c2', nome: 'Editar Par\u00E2metro'}
	];
	objCrumbs['/parametro/cadastrarPar_c2'] = [
		{url: 'parametro/cadastrarPar_c2', nome: 'Cadastrar Par\u00E2metro'}
	];
	objCrumbs['/parametro/visualizarPar_c3'] = [
		{url: 'parametro/visualizarPar_c3', nome: 'Editar Par\u00E2metro'}
	];
	objCrumbs['/parametro/editarPar_c3'] = [
		{url: 'parametro/editarPar_c3', nome: 'Editar Par\u00E2metro'}
	];
	objCrumbs['/parametro/cadastrarPar_c3'] = [
		{url: 'parametro/cadastrarPar_c3', nome: 'Cadastrar Par\u00E2metro'}
	];
	objCrumbs['/programa/visualizarPrograma'] = [
		{url: 'programa/visualizarPrograma', nome: 'Editar Programa'}
	];
	objCrumbs['/programa/visualizarPrograma2'] = [
		{url: 'programa/visualizarPrograma2', nome: 'Editar Programa'}
	];
	objCrumbs['/programa/editarPrograma'] = [
		{url: 'programa/editarPrograma', nome: 'Editar Programa'}
	];
	objCrumbs['/programa/editarPrograma2'] = [
		{url: 'programa/editarPrograma2', nome: 'Editar Programa'}
	];
	objCrumbs['/programa/cadastrarPrograma'] = [
		{url: 'programa/cadastrarPrograma', nome: 'Cadastrar Programa'}
	];
	objCrumbs['/programa/cadastrarPrograma2'] = [
		{url: 'programa/cadastrarPrograma2', nome: 'Cadastrar Programa'}
	];
	objCrumbs['/programa/listaPrograma'] = [
		{url: 'programa/listaPrograma', nome: 'Programa'}
	];
	objCrumbs['/programa/solicitantesCampos'] = [
		{url: 'programa/solicitantesCampos', nome: 'Solicitantes'}
	];
	objCrumbs['/programa/solicitantesLista'] = [
		{url: 'programa/solicitantesLista', nome: 'Solicitantes'}
	];
	objCrumbs['/programa/gerentePrograma'] = [
		{url: 'programa/gerentePrograma', nome: 'Gerente do Programa'}
	];
	objCrumbs['/programa/operadoresPrograma'] = [
		{url: 'programa/operadoresPrograma', nome: 'Operadores do Programa'}
	];
	objCrumbs['/programa/outrosPrograma'] = [
		{url: 'programa/outrosPrograma', nome: 'Outros'}
	];
	objCrumbs['/portfolio/listaPortfolio'] = [
		{url: 'portfolio/listaPortfolio', nome: 'Portf\u00F3lio'}
	];
	objCrumbs['/projetos/listaProjeto'] = [
		{url: 'projetos/listaProjeto', nome: 'Projetos'}
	];
	objCrumbs['/subProjeto/listaSubProjeto'] = [
		{url: '/subProjeto/listaSubProjeto', nome: 'Subprojetos'}
	];
	objCrumbs['/portfolio/visualizarPortfolio'] = [
		{url: 'portfolio/visualizarPortfolio', nome: 'Editar Portf\u00F3lio'}
	];
	objCrumbs['/portfolio/visualizarPortfolio2'] = [
		{url: 'portfolio/visualizarPortfolio2', nome: 'Editar Portf\u00F3lio'}
	];
	objCrumbs['/portfolio/editarPortfolio'] = [
		{url: 'portfolio/editarPortfolio', nome: 'Editar Portf\u00F3lio'}
	];
	objCrumbs['/portfolio/editarPortfolio2'] = [
		{url: 'portfolio/editarPortfolio2', nome: 'Editar Portf\u00F3lio'}
	];
	objCrumbs['/portfolio/cadastrarPortfolio'] = [
		{url: 'portfolio/cadastrarPortfolio', nome: 'Cadastrar Portf\u00F3lio'}
	];
	objCrumbs['/portfolio/cadastrarPortfolio2'] = [
		{url: 'portfolio/cadastrarPortfolio2', nome: 'Cadastrar Portf\u00F3lio'}
	];
	objCrumbs['/portfolio/gerentePortfolio'] = [
		{url: 'portfolio/gerentePortfolio', nome: 'Gerente do Portf\u00F3lio'}
	];
	objCrumbs['/portfolio/operadoresPortfolio'] = [
		{url: 'portfolio/operadoresPortfolio', nome: 'Operadores do Portf\u00F3lio'}
	];
	objCrumbs['/portfolio/outrosPortfolio'] = [
		{url: 'portfolio/outrosPortfolio', nome: 'Outros'}
	];
	objCrumbs['/projetos/pesquisa'] = [
		{url: 'projetos/pesquisa', nome: 'Pesquisar Projeto'}
	];
	objCrumbs['/projetos/dados_basicos'] = [
		{url: 'projetos/dados_basicos', nome: 'Dados B\u00E1sicos'}
	];
	objCrumbs['/projetos/pesquisa_avancada'] = [
		{url: 'projetos/pesquisa', nome: 'Pesquisar Projeto'}, {url: 'projetos/pesquisa_avancada', nome: 'Pesquisar Avan\u00E7ada Projeto'}
	];
	objCrumbs['/contratante/listaContratante'] = [
		{url: 'contratante/listaContratante', nome: 'Contratante'}
	];
	objCrumbs['/projetos/listaSubProjeto'] = [
		{url: 'projetos/listaSubProjeto', nome: 'Pesquisar Subprojeto'}
	];
	objCrumbs['/projetos/cadastrarSubProjeto'] = [
		{url: 'projetos/cadastrarSubProjeto', nome: 'Cadastrar Subprojeto'}
	];
	
	//FINANCEIRO
	objCrumbs['/recebimento/'] = [
		{url: 'recebimento', nome: 'Recebimento de Recursos'}
	];
	objCrumbs['/finalidade/lista'] = [
		{url: 'finalidade/lista', nome: 'Finalidades de Recebimento'}
	];
	objCrumbs['/cadastrarFinalidade/'] = [
		{url: 'finalidade/lista', nome: 'Finalidades de Recebimento'},
		{url: 'cadastrarFinalidade', nome: 'Cadastro de Finalidade'}
	];
	objCrumbs['/dadosFinalidade/'] = [
		{url: 'finalidade/lista', nome: 'Finalidades de Recebimento'},
		{url: 'dadosFinalidade', nome: 'Dados da Finalidade'}
	];
	
	//PROCESSOS ADMINISTRATIVOS

	objCrumbs['/solicitacao/consultar'] = [
		{url: '/solicitacao/consultar', nome: 'Solicita\u00e7\u00e3o'}
	];

	objCrumbs['/instrutor/consultar'] = [
		{url: '/instrutor/consultar', nome: 'Instru\u00E7\u00E3o'}
	];

	objCrumbs['/instrucao/'] = [
		{url: '/instrucao/', nome: 'Instru\u00E7\u00E3o'}
	];

	objCrumbs['/instauracao/consultar'] = [
		{url: '/gerente/consultar', nome: 'Instaura\u00E7\u00E3o'}
	];
	
	objCrumbs['/instauracao/consultar'] = [
		{url: '/gerente/consultar', nome: 'Instaura\u00E7\u00E3o'}
	];
	
	objCrumbs['/conducao/consultar'] = [
		{url: '/conducao/consultar', nome: 'Condu\u00e7\u00e3o'}
	];

	
	// SUPRIMENTOS
	objCrumbs['/ambientePrograma/consultar'] = [ 
	  {url:'/ambientePrograma/consultar', nome:'Ambiente de Programa'}
	 ];
	 
	 objCrumbs['/enxoval/consultar'] = [ 
	  {url:'/enxoval/consultar', nome:'Enxoval do Programa'}
	 ];
	 
	 objCrumbs['/cestaProjeto/consultar'] = [ 
	  {url:'/cestaProjeto/consultar', nome:'Bolsa do Projeto de Programa'}
	 ];
	 
	 objCrumbs['/cestaProjeto/atualizarEmMassa'] = [ 
	  {url:'/cestaProjeto/atualizarEmMassa/', nome:'Atualizar Bolsas em Massa'}
	 ];
	
	 objCrumbs['/aquisicaoPrograma/consultar'] = [
	  {url:'/aquisicaoPrograma/consultar', nome:'Aquisições do Programa'}
	 ];
	 
	return objCrumbs;
}