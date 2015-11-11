function validateForm(form){

	if (form.getValue("nmAssunto") == null) {
		throw "� necess�rio preencher o campo Assunto.";
	}
	
	if (form.getValue("nmParticipantes") == "") {
		throw "� necess�rio selecionar os usu�rios Participantes.";
	}
	
	if (form.getValue("nmPauta") == "") {
		throw "� necess�rio preencher o campo Pauta.";
	}
	
	if (form.getValue("nmDefinicoes") == "") {
		throw "� necess�rio preencher o campo Defini��es.";
	}

	/* Valida��o de preenchimento de 1 registro  Pai x Filho */	
	if (form.getValue("nmOqueComo___1") == null ||
		form.getValue("nmResponsavelAtiv___1") == null  ||
		form.getValue("nmDtInicial___1") == null   || 
		form.getValue("nmDtFinalPrev___1") == null ||
		form.getValue("nmDtFinalReal___1") == null)
	{
		throw "� necess�rio Inserir ao menos 1 atividade para o Plano de A��o.";
	}
	
	if (form.getValue("nmOqueComo___1") == "" ||
		form.getValue("nmResponsavelAtiv___1") == "" ||
		form.getValue("nmDtInicial___1") == "" || 
		form.getValue("nmDtFinalPrev___1") == "")
	{
		throw "� necess�rio preencher todos os campos da Ativ. do Plano de A��o.";
	}
	
	
	
}