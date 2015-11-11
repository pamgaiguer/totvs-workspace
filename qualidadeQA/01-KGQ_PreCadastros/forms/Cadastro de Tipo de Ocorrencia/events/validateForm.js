function validateForm(form){
	if (form.getValue("nmTipoOcorrencia") == "") {
		throw "Preencha o campo Tipo de Ocorrência.";
	}
}