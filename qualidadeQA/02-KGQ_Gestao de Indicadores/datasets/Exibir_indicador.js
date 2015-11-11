function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
	var campos = new Array("goalLine", "data_indicador", "appointmentValue", "occurrenceNumber", "obs"); 

	//var fields = new Array("634");

	if (fields == null) {
		mensagemErro = "É necessário informar um código de algum documento de Indicadores.";
		log.error(mensagemErro);
		dataset.addColumn("erro");
		dataset.addRow (new Array(mensagemErro));
		return dataset;
	}

	for (var i = 0; i < campos.length; i++){
		dataset.addColumn(campos[i]);
	}
	
	try {
		var documentId = new java.lang.Integer(fields[0]);
		
		var cst_1 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
		var cst_2 = DatasetFactory.createConstraint("documentid", documentId, documentId, ConstraintType.MUST);
		var constraints = new Array(cst_1, cst_2);

		var datasetPrincipal = DatasetFactory.getDataset("ds_indicadores", null, constraints, null);

		for (var i = 0; i < datasetPrincipal.values.length; i++) {
	        var documentId = datasetPrincipal.getValue(i, "metadata#id");
	        var documentVersion = datasetPrincipal.getValue(i, "metadata#version");

	        //Cria as constraints para buscar os campos filhos, passando o tablename, número da formulário e versão
	        var c1 = DatasetFactory.createConstraint("tablename", "tabIndicadores" ,"tabIndicadores", ConstraintType.MUST);
	        var c2 = DatasetFactory.createConstraint("documentId", documentId, documentId, ConstraintType.MUST);
	        var c3 = DatasetFactory.createConstraint("version", documentVersion, documentVersion, ConstraintType.MUST);
	        var constraintsFilhos = new Array(c1, c2, c3);

	        //Busca o dataset
	        var datasetFilhos = DatasetFactory.getDataset("ds_indicadores", null, constraintsFilhos, null);

	        for (var j = 0; j < datasetFilhos.values.length; j++) {
	            //Adiciona os valores nas colunas respectivamente.
	        	dataset.addRow(
	        		new Array(   
	    				datasetFilhos.getValue(j, "goalLine"   ),
	    				datasetFilhos.getValue(j, "data_indicador"   ),
	    				datasetFilhos.getValue(j, "appointmentValue"   ),
	    				datasetFilhos.getValue(j, "occurrenceNumber"   ),
	    				datasetFilhos.getValue(j, "obs"   )
					)
	        	);
	        }
	    }
	
	} catch (e) {
		mensagemErro = "Erro ao consultar o Indicador solicitado: " + e;
		log.error(mensagemErro);
		dataset.addColumn("erro");
		dataset.addRow (new Array(mensagemErro));
	}

	return dataset;
}