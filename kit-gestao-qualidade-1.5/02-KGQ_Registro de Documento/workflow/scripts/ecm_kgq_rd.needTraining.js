function needTraining(){
	var checked = hAPI.getCardValue("fgNecessitaCapacit")=="on";

	log.info("================NECESSITA CAPACITACAO?  " + checked + " ==================");
	return checked;
}