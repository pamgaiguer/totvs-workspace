function validateForm(form){

	if (form.getValue("nmAssunto") == null) {
		throw "É necessário preencher o campo Assunto.";
	}
	
	if (form.getValue("nmParticipantes") == "") {
		throw "É necessário selecionar os usuários Participantes.";
	}
	
	if (form.getValue("nmPauta") == "") {
		throw "É necessário preencher o campo Pauta.";
	}
	
	if (form.getValue("nmDefinicoes") == "") {
		throw "É necessário preencher o campo Definições.";
	}

	/* Validação de preenchimento de 1 registro  Pai x Filho */	
	if (form.getValue("nmOqueComo___1") == null ||
		form.getValue("nmResponsavelAtiv___1") == null  ||
		form.getValue("nmDtInicial___1") == null   || 
		form.getValue("nmDtFinalPrev___1") == null ||
		form.getValue("nmDtFinalReal___1") == null)
	{
		throw "É necessário Inserir ao menos 1 atividade para o Plano de Ação.";
	}
	
	if (form.getValue("nmOqueComo___1") == "" ||
		form.getValue("nmResponsavelAtiv___1") == "" ||
		form.getValue("nmDtInicial___1") == "" || 
		form.getValue("nmDtFinalPrev___1") == "")
	{
		throw "É necessário preencher todos os campos da Ativ. do Plano de Ação.";
	}
	
	
	
}