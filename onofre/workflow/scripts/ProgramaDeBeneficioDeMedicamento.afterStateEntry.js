function afterStateEntry(sequenceId){
	
	log.info("-------------------------------------------------------------------------------------");
	log.info("BARBARA - ENTROU NO AFTER STATE ENTRY");
	log.info("BARBARA - SEQUENCE ID: " + sequenceId);
	log.info("-------------------------------------------------------------------------------------");
	
	if(sequenceId == 18){
        
		log.info("-------------------------------------------------------------------------------------");
		log.info("BARBARA - ENTROU NO IF");
		log.info("-------------------------------------------------------------------------------------");
		
		var users = new java.util.ArrayList();
         
        //Caso a próxima atividade seja uma automática utilizar users.add("System:Auto");
        users.add("System:Auto");
 
        hAPI.setAutomaticDecision(33, users, "Decisao tomada automaticamente pelo Fluig");
         
    }
	
}