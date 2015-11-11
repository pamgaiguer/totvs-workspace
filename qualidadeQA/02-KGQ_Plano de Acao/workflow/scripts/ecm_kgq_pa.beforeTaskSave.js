function beforeTaskSave(colleagueId,nextSequenceId,userList){
	
	log.info("===================================== userList size "+userList.size());
	log.info("===================================== contains "+!userList.contains(colleagueId));
	if(userList.size() != 1 || !userList.contains(colleagueId)){
		throw "O usu&aacute;rio respons&aacute;vel por gerenciar as atividades deve ser o solicitante";
	}
	
}