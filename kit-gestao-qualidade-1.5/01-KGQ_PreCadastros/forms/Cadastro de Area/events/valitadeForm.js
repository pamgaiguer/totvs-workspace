function validateForm(form){
	if (form.getValue("nmArea") == "") {
		throw "Preencha o campo Área.";
	} else if (form.getValue("nmResponsavelArea") == "") {
		throw "Informe o responsável pela área.";
	}
}