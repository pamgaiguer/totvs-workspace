function beforeStateLeave(sequenceId) {
	log.info("---> SOLICITACAO DE DEMANDA - beforeStateLeave: " + sequenceId);
	
	var USER_ID = getValue("WKUser");
	var NUM_PROCESSO = getValue("WKNumProces");
	var NUM_EMPRESA = getValue("WKCompany");
	var NUM_THREAD = hAPI.getActualThread(NUM_EMPRESA, NUM_PROCESSO, sequenceId);
	
	var LID_AVALIAR_DEMANDA = 13;
	var PMO_ASSOCIAR_DEMANDA_CFP = 25;
	var GES_ESCLARECER_DUVIDA = 38;
	var GES_APROVAR_DEMANDA = 39;
	var LID_VALIDAR_SOLUCAO = 54;
	var LID_AVALIAR_REPROVACAO = 60;
	var SOL_AVALIAR_SOLUCAO = 5;
	
	var obs = "";
	
	/*
	 * Set comentarios na aba Observações do formulario
	 */
	if (sequenceId == LID_AVALIAR_DEMANDA) {
		obs = hAPI.getCardValue("lid_obs");
	}
	else if (sequenceId == PMO_ASSOCIAR_DEMANDA_CFP) {
		obs = hAPI.getCardValue("pmo_obs");
	}
	else if (sequenceId == GES_ESCLARECER_DUVIDA) {
		obs = hAPI.getCardValue("ges_duv_respostas");
	}
	else if (sequenceId == GES_APROVAR_DEMANDA) {
		obs = hAPI.getCardValue("ges_obs");
	}
	else if (sequenceId == LID_VALIDAR_SOLUCAO) {
		obs = hAPI.getCardValue("lid_ap_sol_obs");
	}
	else if (sequenceId == LID_AVALIAR_REPROVACAO) {
		obs = hAPI.getCardValue("lid_ar_obs");
	}
	else if (sequenceId == SOL_AVALIAR_SOLUCAO) {
		obs = hAPI.getCardValue("sol_ap_sol_obs");
	}
	
	hAPI.setTaskComments(USER_ID, NUM_PROCESSO, NUM_THREAD, obs);
}