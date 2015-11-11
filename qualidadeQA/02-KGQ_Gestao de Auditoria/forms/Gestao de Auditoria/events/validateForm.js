function validateForm(form) {
	
	if (getValue("WKCompletTask") == "true"){
		
		if ( form.getValue('dsComunicado') == "" ){
			throw "O campo Comunicado é de preenchimento obrigatório";
		}
		if ( form.getValue('fgTipoAuditoria') == ""){
			throw "O campo Tipo de Auditoria é de preenchimento obrigatório";
		}
		if ( form.getValue('dsObjetivoAuditoria') == ""){
			throw "O campo Objetivo da Auditoria é de preenchimento obrigatório";
		}
		if ((form.getValue('dtDataInicioAudit')== "") || (form.getValue('dtDataFimAudit')== "")) {
			throw "O campo Período de Auditoria é de preenchimento obrigatório";
		}
		//Validação dos campos
		var x = 1;
		var rows = parseInt(form.getValue("hiddenLineCount"));
		while (x <= rows) {
			var field = form.getValue("nmAreaGrid___" + x);
			if (field == null) { 
				x = x + 1;
				rows = rows + 1;
			} else {
				if (field == "") throw "Preencha os campos de áreas notificadas corretamente.";
				x = x + 1;
			}
		}
		//validação do periodo
		var dataInicial = form.getValue('dtDataInicioAudit');
		var dataFinal = form.getValue('dtDataFimAudit');
		var dia = dataInicial.substring(0,2);
		var mes = dataInicial.substring(3,5);
		var ano = dataInicial.substring(6,10);
		
		var dataInicialConvertida = new Date();
		dataInicialConvertida.setFullYear(ano,mes,dia);
		
		dia = dataFinal.substring(0,2);
		mes = dataFinal.substring(3,5);
		ano = dataFinal.substring(6,10);

		var dataFinalConvertida = new Date();
		dataFinalConvertida.setFullYear(ano,mes,dia);
		
		
		if(dataInicialConvertida > dataFinalConvertida){
			throw "Data da Auditoria Final é maior que a data inicial da auditoria";
		}
		var y = 1;
		var linhas = parseInt(form.getValue("hiddenLineCount"))
		while (y <= linhas) {
			var campos = form.getValue("dtDataInicioAuditArea___" + y);
			if (campos == null) { 
				y = y + 1;
				linhas = linhas + 1;
			} else {
				if (campos == "") throw "Preencha os campos de PERIODO CORRETAMENTE.";
				y = y + 1;
			}
		}
	}
}