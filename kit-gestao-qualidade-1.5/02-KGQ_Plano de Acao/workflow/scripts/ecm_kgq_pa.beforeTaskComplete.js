function beforeTaskComplete(colleagueId,nextSequenceId,userList){
	log.info("============================= beforeTaskComplete() =============================");
	if (nextSequenceId == 3) {
		var numAtividade = nextSequenceId;
		var numProcess = getValue("WKNumProces").toString();
		var filter = new java.util.HashMap();	
		filter = hAPI.getCardData(parseInt(numProcess));
		var it = filter.keySet().iterator();
		log.info("=========================== " + filter + " ==================================");
		//Hash Map para armazenamento de Filhos...
		var hpFilhos = new java.util.HashMap();
		while (it.hasNext()) {	
			var key = it.next();
			if (key.indexOf('hiddenIndexMat___') >= 0) {
				//Incliu no hash map de filhos
				hpFilhos.put(key, filter.get(key));
				log.info(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>right here<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
				log.info("key "+key+" value "+filter.get(key));
			} 
		}
		//var quantidade = hpFilhos.size();
		//var qntdLinhas = quantidade / 7;
		var qntdLinhas = hpFilhos.size();
		log.info("======================== LINHAS " + qntdLinhas + " ================");
		
		
		log.info("======================== hiddenLinhasGrid had: " + hAPI.getCardValue("hiddenLinhasGrid") + " ================");
		log.info("======================== SETTING  hiddenLinhasGrid: " + qntdLinhas + " ================");
		try{
			hAPI.setCardValue("hiddenLinhasGrid", qntdLinhas);
		}catch(e){
			log.info(e);
		}
		
		
		log.info("============================= STARTING ACTIVITIES =============================");
		//INICIANDO ATIVIDADES
		var campoIndex = 1;
		while (campoIndex <= qntdLinhas) {
			var campoValue = hAPI.getCardValue("nmOqueComo___" + campoIndex);
			log.info("============================= campoValue : " + campoValue + "=============================");
			if (campoValue == null) {
				log.info("============================= campoValue IS NULL! LET'S TRY IT AGAIN =============================");
				campoIndex = campoIndex + 1;
				qntdLinhas = qntdLinhas + 1;
			} else {
				statusAtiv = hAPI.getCardValue("nmStatus___" + campoIndex);
				if (statusAtiv == "") {
					initActivityPlanAction(campoIndex);
				}
				campoIndex = campoIndex + 1;
			}
		}
	}
}