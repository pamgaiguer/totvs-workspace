function validateForm(form){
	if (form.getValue("nmArea") == "") {
		throw "Preencha o campo �rea.";
	} else if (form.getValue("nmResponsavelArea") == "") {
		throw "Informe o respons�vel pela �rea.";
	}
}