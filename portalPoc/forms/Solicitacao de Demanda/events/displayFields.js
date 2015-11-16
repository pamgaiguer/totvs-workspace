function displayFields(form, customHTML) {
	log.info("---> SOLICITACAO DE DEMANDA - displayFields");

	var atividade = getValue("WKNumState");
	var usuario = getValue("WKUser");
	
	var SOL_INICIO = 2;
	var LID_AVALIAR_DEMANDA = 13;
	var SOL_CORRIGIR_SOLICITACAO = 3;
	var LID_DISTRIBUIR_DEMANDAS = 34;
	var PMO_ASSOCIAR_DEMANDA_CFP = 25;
	var GES_ESCLARECER_DUVIDA = 38;
	var GES_APROVAR_DEMANDA = 39;
	var SOL_AVALIAR_SOLUCAO = 5;
	var LID_VALIDAR_SOLUCAO = 54;
	var LID_AVALIAR_REPROVACAO = 60;
	var PMO_AGUARDAR_APROVACAO = 28;
	var ANA_EXECUTAR_DEMANDA = 50;
	var ANA_APONTAR_HORAS = 52;
	var LID_QUALIFICAR_DEMANDA = 68;
	
	if(form.getFormMode() != "ADD" && form.getFormMode() != "MOD"){
		form.setShowDisabledFields(true);
		
		customHTML.append("<script>");
		customHTML.append("CDF.Utils.hideAsterisk();");
		customHTML.append("CDF.Utils.reloadOptions();");
		customHTML.append("</script>");
	}
	if (atividade == 0 || atividade == SOL_INICIO) 
	{
		var username = getUsername(usuario);
		
		customHTML.append("<script>");
		customHTML.append("CDF.Inicio.username = '" + username + "';");
		customHTML.append("CDF.Inicio.init();");
		customHTML.append("</script>");
	} 
	else if(atividade == LID_AVALIAR_DEMANDA)
	{
		var username = getUsername(usuario);
		
		customHTML.append("<script>");
		customHTML.append("CDF.Lid_Avaliar_Demanda.username = '" + username + "';");
		customHTML.append("CDF.Lid_Avaliar_Demanda.init();");
		customHTML.append("</script>");
		
		form.setHidePrintLink(true);
	}
	else if(atividade == SOL_CORRIGIR_SOLICITACAO)
	{
		customHTML.append("<script>");
		customHTML.append("CDF.Sol_Corrigir_Solicitacao.init();");
		customHTML.append("</script>");
		
		form.setHidePrintLink(true);
	}
	else if(atividade == GES_APROVAR_DEMANDA)
	{
		var username = getUsername(usuario);
		
		customHTML.append("<script>");
		customHTML.append("CDF.Ges_Aprovar_Demanda.username = '" + username + "';");
		customHTML.append("CDF.Ges_Aprovar_Demanda.init();");
		customHTML.append("</script>");
		
		form.setHidePrintLink(true);
	}
	else if(atividade == GES_ESCLARECER_DUVIDA)
	{
		var username = getUsername(usuario);
		
		customHTML.append("<script>");
		customHTML.append("CDF.Ges_Esclarecer_Duvida.username = '" + username + "';");
		customHTML.append("CDF.Ges_Esclarecer_Duvida.init();");
		customHTML.append("</script>");
		
		form.setHidePrintLink(true);
	}
	else if(atividade == PMO_ASSOCIAR_DEMANDA_CFP)
	{
		var username = getUsername(usuario);
		
		customHTML.append("<script>");
		customHTML.append("CDF.Pmo_Associar_Demanda_Cfp.username = '" + username + "';");
		customHTML.append("CDF.Pmo_Associar_Demanda_Cfp.init();");
		customHTML.append("</script>");
		
		form.setHidePrintLink(true);
	}
	else if(atividade == LID_DISTRIBUIR_DEMANDAS)
	{
		customHTML.append("<script>");
		customHTML.append("CDF.Lid_Distribuir_Demandas.init();");
		customHTML.append("</script>");
		
		form.setHidePrintLink(true);
	}
	else if(atividade == PMO_AGUARDAR_APROVACAO)
	{
		customHTML.append("<script>");
		customHTML.append("CDF.Pmo_Aguardar_Aprovacao.init();");
		customHTML.append("</script>");
		
		form.setHidePrintLink(true);
	}
	else if(atividade == ANA_EXECUTAR_DEMANDA)
	{
		var username = getUsername(usuario);
		
		customHTML.append("<script>");
		customHTML.append("CDF.Ana_Executar_Demanda.username = '" + username + "';");
		customHTML.append("CDF.Ana_Executar_Demanda.init();");
		customHTML.append("</script>");
		
		form.setHidePrintLink(true);
	}
	else if(atividade == ANA_APONTAR_HORAS)
	{
		customHTML.append("<script>");
		customHTML.append("CDF.Ana_Apontar_Horas.init();");
		customHTML.append("</script>");
		
		form.setHidePrintLink(true);
	}
	else if(atividade == LID_VALIDAR_SOLUCAO)
	{
		customHTML.append("<script>");
		customHTML.append("CDF.Lid_Validar_Solucao.init();");
		customHTML.append("</script>");
		
		form.setHidePrintLink(true);
	}
	else if(atividade == SOL_AVALIAR_SOLUCAO)
	{
		customHTML.append("<script>");
		customHTML.append("CDF.Sol_Avaliar_Solucao.init();");
		customHTML.append("</script>");
		
		form.setHidePrintLink(true);
	}
	else if(atividade == LID_QUALIFICAR_DEMANDA)
	{
		customHTML.append("<script>");
		customHTML.append("CDF.Lid_Qualificar_Demanda.init();");
		customHTML.append("</script>");
		
		form.setHidePrintLink(true);
	}
}

function getUsername(usuario) {
	var c1 = DatasetFactory.createConstraint("active", "true", "true", ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("login", usuario, usuario, ConstraintType.MUST);
	var colunasColleague = new Array("active", "colleagueName", "login");
	var constraintsColleague = new Array(c1, c2);
	var orderColleague = new Array("colleagueName")
	var datasetColleague = DatasetFactory.getDataset("colleague", colunasColleague, constraintsColleague, orderColleague);
	
	if (datasetColleague.rowsCount == 0) {
		return "Erro no evento displayFields. O nome do usuário não foi encontrado."
	}

	return datasetColleague.getValue(0, "colleagueName");
}