function validateForm(form) {
	var msg = "";
	
	if(form.getValue("nome") == ""){
		msg += "<br>Por favor, preencha o campo <strong>Nome da Demanda</strong>";
	}
	if(form.getValue("pool") == ""){
		msg += "<br>Por favor, preencha o campo <strong>Pool Respons�vel pela Demanda</strong>";
	}
	
	if (msg != "") {
		throw msg;
	}
}