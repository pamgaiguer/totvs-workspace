function createDataset(fields, constraints, sortFields){
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("Codigo");
	newDataset.addColumn("Nome");
	
	var datasetPadrao = DatasetFactory.getDataset("colleague", null, null, null);
	for(i = 0; i < datasetPadrao.rowsCount; i++){
		newDataset.addRow(new Array(datasetPadrao.getValue(i, "colleaguePK.colleagueId"), datasetPadrao.getValue(i, "colleagueName")));
	}
	return newDataset;
}