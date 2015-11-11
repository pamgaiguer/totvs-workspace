function needEffectiveness(){
	var checked = hAPI.getCardValue("fgVerifEficacia")=="on";
	log.info("================ PRECISA ANALISE DE EFICACIA?  " + checked + " ==================");
	return checked;
}