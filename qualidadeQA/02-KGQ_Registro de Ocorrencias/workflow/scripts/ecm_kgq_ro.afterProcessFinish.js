function afterProcessFinish(processId){
	hAPI.setCardValue("status", "Finalizado");
	log.info("Finalizando processo de ocorrência....");
}