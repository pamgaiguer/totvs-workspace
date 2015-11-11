function validateForm(form){
	if (form.getValue("nmCriticidade") == "") {
		throw "Preencha o campo Criticidade.";
	}
}