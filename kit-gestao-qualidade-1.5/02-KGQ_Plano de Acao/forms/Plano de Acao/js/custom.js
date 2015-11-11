$(document).on("click", "#goToOccurrence", function(e) {
	e.preventDefault();
	openOccurrence();
});

function openZoomResponsavel(object) {				
	document.getElementById("hiddenIndex").value = getIndexGrid(object);
	openZoom("Respons�vel", "colleague", "colleagueName,Colaborador", "colleagueName,colleagueId", "addResp", "550", "500");
}

function openZoomParticipantes() {
	openZoom("Participantes", "colleague", "colleagueName,Colaborador", "colleagueName", "addPart", "550", "500");
}

function disableCheckbox(checkboxName) {
	var INICIO_SOLICITACAO = "0";
	var ATIVIDADE_INICIO = "1";
	var activity = getWKNumState();
	
	if (activity != INICIO_SOLICITACAO && activity != ATIVIDADE_INICIO) {
		var estado = eval("document.form." + checkboxName + ".checked");
		if (estado == true) {
			eval("document.form." + checkboxName + ".checked = false");
	    } else {
	    	eval("document.form." + checkboxName + ".checked = true");
	    }
	}
}

function setSelectedZoomItem(selectedItem){
	var tipo = selectedItem.type;
	var index = document.getElementById("hiddenIndex").value;
	if (tipo == "addPart" && document.getElementById('nmParticipantes').value.indexOf(selectedItem.colleagueName) == -1) {
		document.getElementById('nmParticipantes').value += selectedItem.colleagueName+";";
	}
	if (tipo == "addResp") {                  
		document.getElementById("nmResponsavelAtiv___" + index).value = selectedItem.colleagueName;
		document.getElementById("hiddenIndexMat___" + index).value = selectedItem.colleagueId;            	
	}
}

function init(){
	var INICIO_SOLICITACAO = "0", 
		ATIVIDADE_INICIO   = "1";		
	var activity = getWKNumState();
	showRedirectButton();
	if (activity != ATIVIDADE_INICIO && activity != INICIO_SOLICITACAO) {
		enableButtons('false', document.getElementById("formPA"));
		if (activity != null) {
			var tableGrid = document.getElementById("ativPlano");
			trashDisappearsGrid(tableGrid);	
		}
	} else if (activity == ATIVIDADE_INICIO) {
		disableTrashOldActivities();
	}
}

function disableTrashOldActivities() {
	var qtRows = document.getElementById("ativPlano").rows.length-2;
	var x = 1;
	var indexExists = 1;
	while (indexExists <= qtRows) {
		var campo = document.getElementById("nmOqueComo___" + indexExists);
		if (campo == null) {
			indexExists = indexExists + 1;
			qtRows = qtRows + 1;
		} else {
			document.images[x].style.visibility = "hidden";
			x = x + 1;
			indexExists = indexExists + 1;
		}
	}
}

function openOccurrence() {
	  var numRO = document.getElementById("cdOcorrencia").value;
	  var numEmpresa = window.parent.WCMAPI.getTenantId();
	  var usuarioLogado = window.parent.WCMAPI.getUserCode();
	  
	  var NrDocto = "";
	  var versaoDoc = "";

	  var ProcessRO = DatasetFactory.getDataset("processAttachment", null, new Array(DatasetFactory.createConstraint("processAttachmentPK.processInstanceId", numRO, numRO, ConstraintType.MUST)), null);

	  if(ProcessRO.values.length > 0){
	    NrDocto = ProcessRO.values[0]["documentId"];
	  }
	  
	  var ArrayDoc = DatasetFactory.getDataset("document", null, new Array(DatasetFactory.createConstraint("documentPK.documentId", NrDocto, NrDocto, ConstraintType.MUST)), null);
	  
	  if(ArrayDoc.values.length > 0){
	    versaoDoc = ArrayDoc.values[0]["documentPK.version"];
	  }

	  console.log(numRO, numEmpresa, NrDocto);
	  var url =
	    window.location.origin 
	    + '/portal/p/' 
	    + numEmpresa
	    + '/pageworkflowview?app_ecm_workflowview_processInstanceId=' + numRO
	    + '&app_ecm_workflowview_currentMovto=2'
	    + '&app_ecm_workflowview_taskUserId='+ usuarioLogado
	    + '&app_ecm_workflowview_managerMode=false'
	    + '&app_ecm_workflowview_nrDoc=' + NrDocto
	    + '&app_ecm_workflowview_versionDoc=' + versaoDoc;
	  
/*	  portal/p/1/pageworkflowview?app_ecm_workflowview_processInstanceId=53&app_ecm_workflowview_currentMovto=2&app_ecm_workflowview_taskUserId=admin.kgq&app_ecm_workflowview_managerMode=false&app_ecm_workflowview_nrDoc=114&app_ecm_workflowview_versionDoc=1000	  
	  
	  portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=53&app_ecm_workflowview_taskUserId=admin.kgq	  */
	  
	  var url2 =
		  window.location.origin
	    + '/portal/p/' 
	    + numEmpresa
	    + '/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=' + numRO
	    + '&app_ecm_workflowview_taskUserId=' + usuarioLogado;
	    

	  window.open(url2, "Registro de Ocorrência", "toolbar=no,scrollbars=yes,resizable=yes,width=1024,height=768");
}

function getIndexGrid(buttonSelected){				
	var indexInit = buttonSelected.id.indexOf('__') + 3;							
	var size = buttonSelected.id.length;
	var number = buttonSelected.id.substring(indexInit, size);								
	return number;				
}

function trashDisappearsGrid(tableGrid){		
	var tBody = tableGrid.getElementsByTagName("tbody")[0];	
	var tds = tBody.getElementsByTagName("td");	
	var trs = tBody.getElementsByTagName("tr");			
	var rowsTBody = tBody.rows.length;
	var tdsFirstRow = tds.length /rowsTBody;
	var indexTD = 0;
	
	for(var i=1;i< rowsTBody;i++){ 
		indexTD += tdsFirstRow;		
	 	tds[indexTD].style.visibility = 'hidden';			
	}	
}

function clearInputFromTable(object, fieldId){
	var index = getIndexGrid(object);
	var objectDate = document.getElementById(fieldId + index);
	objectDate.value = "";	
}

function selectDate(object, oldDates, futureDates){
	var index = getIndexGrid(object);
	var objectDate = document.getElementById("nmDtInicial___" + index);
	displayDatePicker(objectDate, 'dmy', undefined, futureDates, oldDates );	
}
function selectDatePrev(object, oldDates, futureDates){
	var index = getIndexGrid(object);
	var objectDate = document.getElementById("nmDtFinalPrev___" + index);
	displayDatePicker(objectDate, 'dmy', undefined, futureDates, oldDates );	
}
function selectDateReal(object, oldDates, futureDates){
	var index = getIndexGrid(object);
	var objectDate = document.getElementById("nmDtFinalReal___" + index);
	displayDatePicker(objectDate, 'dmy', undefined, futureDates, oldDates );	
}
function showRedirectButton() {
	var INICIO_SOLICITACAO = "0";
	var activity = getWKNumState();
	var numOcorrencia = document.getElementById("cdOcorrencia").value;
	if (activity == INICIO_SOLICITACAO || numOcorrencia == "" || numOcorrencia == "0") {
		document.getElementById("goToOccurrence").style.visibility = "hidden";
	} else {
		document.getElementById("goToOccurrence").style.visibility = "visible";
	}
}

function clearField(field){
	document.getElementById(field).value='';
}