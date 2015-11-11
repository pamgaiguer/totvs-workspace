function createDataset(fields, constraints, sortFields) {

	var dataset = DatasetBuilder.newDataset();
	var dataset_Auxiliar = new Array();
	dataset.addColumn("Resp_PA");
	dataset.addColumn("Quantidade");

	var cst_1 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
	var constraints = new Array(cst_1);
	log.info("PETER " + fields);
	if (fields != null && fields != "") {
		
		log.info("PETER " + fields[0]);
		
		var totalUsers = fields[0].split(",");
		
		log.info("PETER " + totalUsers);
		
		
		for (var i = 0; i < totalUsers.length; i++) {
			// Adiciona uma constraint para pesquisar Planos de Ação por Usuários
        	constraints.push( DatasetFactory.createConstraint("hiddenMatResponsavel", totalUsers[i], totalUsers[i], ConstraintType.SHOULD) );
        }
	}

	var dtsRelatorio = DatasetFactory.getDataset("ecm_kgq_pa", null, constraints, null);

	for (var i = 0; i < dtsRelatorio.values.length; i++) {
		var Adicionar_linha = true;

		if (fields != null && fields != "") {
        	// Adiciona uma constraint para pesquisa por periodo - Data - De/Até
			Adicionar_linha = CompareDate(dtsRelatorio.getValue(i, "nmDataPA"), fields[1], fields[2]);
		}

		if (Adicionar_linha) {
			dataset_Auxiliar.push( dtsRelatorio.getValue(i, "nmResponsavelPA") );
		}
	}

	// Transforma o Array em um Objeto - Semelhante ao Group By do SQL Server.
	var hist = {};
	dataset_Auxiliar.map( function (a) { if (a in hist) hist[a] ++; else hist[a] = 1; } );
	
	for (var key in hist) {
		 dataset.addRow( new Array(key, hist[key]) );
	}

	return dataset;
}

function CompareDate(data_dataset, data_solicitada_Ini, data_solicitada_Fim) {

	var objDate_dataset = new Date();
	var objDate_solicitada_Ini = new Date();
	var objDate_solicitada_Fim = new Date();
	
	// Data retornada no Dataset
	objDate_dataset.setYear(data_dataset.split("/")[2]);
	objDate_dataset.setMonth(data_dataset.split("/")[1]  - 1);//- 1 pq em js é de 0 a 11 os meses
	objDate_dataset.setDate(data_dataset.split("/")[0]);

	// Data solicitada para Filtro
	objDate_solicitada_Ini.setYear(data_solicitada_Ini.split("/")[2]);
	objDate_solicitada_Ini.setMonth(data_solicitada_Ini.split("/")[1]  - 1);//- 1 pq em js é de 0 a 11 os meses
	objDate_solicitada_Ini.setDate(data_solicitada_Ini.split("/")[0]);
	
	// Data solicitada para Filtro
	objDate_solicitada_Fim.setYear(data_solicitada_Fim.split("/")[2]);
	objDate_solicitada_Fim.setMonth(data_solicitada_Fim.split("/")[1]  - 1);//- 1 pq em js é de 0 a 11 os meses
	objDate_solicitada_Fim.setDate(data_solicitada_Fim.split("/")[0]);
	
	
	if( (objDate_dataset.getTime() >= objDate_solicitada_Ini.getTime()) && (objDate_dataset.getTime() <= objDate_solicitada_Fim.getTime()) ){
		return true;
	} else {
		return false;
	}
}