$(document).ready(function () {
	
	$("input[name='fgTipoSolicitacao']").click(function(){
		if ( ($(this).val() == "fgTipoSolicElab")) {
			$("#rev_doc").hide();
			$("#rev_doc_ver").hide();
		} else if ($(this).val() == "fgTipoSolicRevis") {
			$("#rev_doc").show();
			$("#rev_doc_ver").show();
		}
	});
	
	if ($('#fgTipoSolicitacaoElab').is(':checked')){
		$("#rev_doc").hide();
		$("#rev_doc_ver").hide();
	}

	if ($('#fgTipoSolicitacaoRevis').is(':checked')){
		$("#rev_doc").show();
		$("#rev_doc_ver").show();
	}	
	
	if ( $("input[name='fgTipoSolicitacao']:checked") ) {
		$("#rev_doc").hide();
		$("#rev_doc_ver").hide();
	}
});

function zoomDocumentos() {
	window.open("/webdesk/zoom.jsp?datasetId=document" +
			"&dataFields=documentPK.documentId,"+escape("C�digo")+",documentDescription,"+escape("Descri��o")+",documentPK.version,"+escape("Vers�o") +
			"&resultFields=documentPK.documentId,documentDescription,documentPK.version" +
			"&type=documentos" +
			"&filterValues=documentType,2", "zoom", "status, scrollbars=no, width=650, height=500, top=0, left=0");
}

function setSelectedZoomItem(selectedItem) {
	if (selectedItem.type == "documentos") {
		document.getElementById("nmVersao").value = selectedItem["documentPK.version"];
		document.getElementById("nmDocumento").value = selectedItem["documentDescription"];
	}
}

function init() {
	var INICIO_SOLICITACAO = "0";
	var ATIVIDADE_INICIO   = "1";		
	var activity = getWKNumState();
	if (activity != ATIVIDADE_INICIO && activity != INICIO_SOLICITACAO) {
		setVisible("addDocument" ,false);
		setVisible("clearFieldDocument" ,false);
	}
}

function setVisible(idObject, visible){
	document.getElementById(idObject).style.visibility = visible ? "visible" : "hidden";
}
