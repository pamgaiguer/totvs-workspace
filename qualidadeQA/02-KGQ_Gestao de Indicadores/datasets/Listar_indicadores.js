function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();

	/* Campos referentes a Ficha */
	dataset.addColumn("ID_Documento");
	dataset.addColumn("Nome_indicador");
    dataset.addColumn("Descricao");
    dataset.addColumn("Meta");
    dataset.addColumn("Data_inicio");
    dataset.addColumn("Data_fim");
    
    var cst = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
	var constraints = new Array(cst);
	
	var datasetPrincipal = DatasetFactory.getDataset("ds_indicadores", null, constraints, null);

	for (var i = 0; i < datasetPrincipal.values.length; i++) {
		dataset.addRow(
	    		new Array(   
    				datasetPrincipal.getValue(i, "documentid"),
    				datasetPrincipal.getValue(i, "name"),
    				datasetPrincipal.getValue(i, "description"),
    				datasetPrincipal.getValue(i, "goal"),
    				datasetPrincipal.getValue(i, "startDate"),
    				datasetPrincipal.getValue(i, "finishDate")
				)
	    );
	}

	return dataset;
}