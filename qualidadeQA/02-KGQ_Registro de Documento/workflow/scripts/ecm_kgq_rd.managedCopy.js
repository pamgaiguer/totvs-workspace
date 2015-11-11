function managedCopy(){
	var checked = hAPI.getCardValue("fgDistCopControl")=="on";

	log.info("================NECESSITA DISTRIBUICAO DE COPIA CONTROLADA?  " + checked + " ==================");
	return checked;
}