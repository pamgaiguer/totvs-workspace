function validateForm(form){
	
	var numAtividade = getValue("WKNumState");

	if (numAtividade <= 1){
		if (form.getValue("fgTipoSolicitacao") == null) {
			throw "� necess�rio selecionar um Tipo de Solicita��o.";
		}
		
		if (form.getValue("dsMotivo") == "") {
			throw "� necess�rio preencher o campo Motivo.";
		}
		
		if (form.getValue("fgTipoSolicitacao") == "fgTipoSolicRevis" && (form.getValue("nmDocumento") == "" || form.getValue("nmVersao") == "")) {
			throw "� necess�rio selecionar um Documento para Revis�o.";
		}
	}
}