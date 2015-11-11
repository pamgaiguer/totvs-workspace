function createDataset(fields, constraints, sortFields) {

	var datasetFicha = DatasetBuilder.newDataset();
	var datasetPaiFilho = DatasetBuilder.newDataset();
	
	
	/* Campos referentes a Ficha */
	datasetFicha.addColumn("Nome_indicador");
    datasetFicha.addColumn("Descricao");
    datasetFicha.addColumn("Meta");
    datasetFicha.addColumn("Data_inicio");
    datasetFicha.addColumn("Data_fim");
    
    /* Campos referentes ao PAI x FILHO */
    /*
    dataset.addColumn("Data_indicador");
    dataset.addColumn("Valor");
    dataset.addColumn("Numero_ocorrencia");
    dataset.addColumn("Observacao");
    */
	
	var cst = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
	var constraints = new Array(cst);
	
	var datasetPrincipal = DatasetFactory.getDataset("ds_indicadores", null, constraints, null);

	for (var i = 0; i < datasetPrincipal.values.length; i++) {
		datasetFicha.addRow(
	    		new Array(   
    				datasetPrincipal.getValue(i, "name"   ),
    				datasetPrincipal.getValue(i, "description"   ),
    				datasetPrincipal.getValue(i, "goal"   ),
    				datasetPrincipal.getValue(i, "startDate"   ),
    				datasetPrincipal.getValue(i, "finishDate"   )
				)
	    );
	}
	
	log.info(" PETER " + datasetFicha);
	
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
        
        
        if (datasetFilhos.values.length > 0) {
        	log.info(" PETER      " + datasetFicha.rowsCount);
        	
        	datasetPaiFilho.addColumn("Data_indicador");
        	datasetPaiFilho.addColumn("Valor");
        	datasetPaiFilho.addColumn("Numero_ocorrencia");
        	datasetPaiFilho.addColumn("Observacao");
        	log.info(" PETER   " + datasetPaiFilho.rowsCount);
        	
        }
        
        for (var j = 0; j < datasetFilhos.values.length; j++) {
            //Adiciona os valores nas colunas respectivamente.
        	datasetPaiFilho.addRow(
        		new Array(   
    				datasetFilhos.getValue(j, "data_indicador"   ),
    				datasetFilhos.getValue(j, "appointmentValue"   ),
    				datasetFilhos.getValue(j, "occurrenceNumber"   ),
    				datasetFilhos.getValue(j, "obs"   )
				)
        	);
        }
    }
	
	
	log.info(" PETER FIM " + datasetPaiFilho);
	log.info(" PETER FIM " + datasetFicha);
	
	var dataset = DatasetBuilder.newDataset();
	dataset = datasetFicha.push(datasetPaiFilho);
	
	//return datasetPaiFilho;
	//return datasetFicha;
	return dataset;
}