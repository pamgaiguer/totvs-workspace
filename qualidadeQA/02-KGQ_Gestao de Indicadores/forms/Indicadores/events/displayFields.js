function displayFields(form,customHTML){
	
	customHTML.append("<script>var WKNumState = '" + getValue("WKNumState") + "';</script>");
	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);
}

