function beforeCancelProcess(colleagueId,processId){
	var numSolic = getValue("WKNumProces");
	var constraint1 = DatasetFactory.createConstraint("cdPlanoAcao", numSolic, numSolic, ConstraintType.MUST);
	var constraint2 = DatasetFactory.createConstraint("metadata#active", "true", "true",ConstraintType.MUST);
		
	log.info("Pesquisa");	
	var constraints = new Array(constraint1, constraint2);
	log.info("Constraints");	
	var actPlanAction = DatasetFactory.getDataset("ecm_kgq_atividadepa", null, constraints, null);	
		
	if(actPlanAction!=null){
		log.info("Numero de atividades do plano de acao: " + actPlanAction.rowsCount);
		for(var i=0; i < actPlanAction.rowsCount; i++) {
			var state = actPlanAction.getValue(i, "status"); 
			log.info("Numero Atividade PA: " + actPlanAction.getValue(i, "idAtividatePA"));	
			log.info("Estado da AtividadePA: " + actPlanAction.getValue(i, "status")); 	  	
			if (state != "Finalizado" && state != "Cancelado" && state != "finalizado" && state != "cancelado"){
				throw "Você não pode cancelar o Plano de Ação, pois existem atividades do plano não finalizadas!";
			}
		}
	}
	return true;
}