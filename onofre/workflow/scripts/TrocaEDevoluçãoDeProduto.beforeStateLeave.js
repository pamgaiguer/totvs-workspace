function beforeStateLeave(sequenceId){
	
	log.info("-------------------------------------------------------------------------------------");
	log.info("BARBARA - ENTROU NO BEFORE STAT LEAVE");
	log.info("-------------------------------------------------------------------------------------");
	
	var fimRejeitado = 11;
	var fimAprovLoja = 16;
	var fimAprovCD = 14;
	var gateway = 9;
	
	var atividade = getValue("WKNumState");
	var proxAtiv = getValue("WKNextState");
	
	log.info("-------------------------------------------------------------------------------------");
	log.info("BARBARA - ATIVIDADE: " + atividade);
	log.info("BARBARA - PROX ATIVIDADE: " + proxAtiv);
	log.info("-------------------------------------------------------------------------------------");
	
	if (atividade == gateway && proxAtiv == fimRejeitado) {
		log.info("-------------------------------------------------------------------------------------");
		log.info("BARBARA - ENTROU REJEITADO");
		log.info("-------------------------------------------------------------------------------------");
	
		hAPI.setCardValue("statusPedido", "Rejeitado");
	}
	
	if (atividade == gateway && proxAtiv == fimAprovLoja) {
		log.info("-------------------------------------------------------------------------------------");
		log.info("BARBARA - ENTROU APROVADO LOJA");
		log.info("-------------------------------------------------------------------------------------");	
		
		hAPI.setCardValue("statusPedido", "Produto encaminhado para a loja");
	}

	if (atividade == gateway && proxAtiv ==  fimAprovCD) {
		log.info("-------------------------------------------------------------------------------------");
		log.info("BARBARA - ENTROU APROVADO CD");
		log.info("-------------------------------------------------------------------------------------");
		
		hAPI.setCardValue("statusPedido", "Produto encaminhado para o CD");
	}
	
}