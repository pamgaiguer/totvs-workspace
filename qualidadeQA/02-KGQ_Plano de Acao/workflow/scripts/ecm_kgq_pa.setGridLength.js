function setGridLength(){

	log.info("===================== using the automatic task to set grid length =====================");

	try{
		hAPI.setCardValue("hiddenLinhasGrid", 50);
		log.info(hAPI.getCardValue("hiddenLinhasGrid"));
	}catch(e){
		log.info("===================== error: " + e);
	}

	log.info("using the automatic task");

}