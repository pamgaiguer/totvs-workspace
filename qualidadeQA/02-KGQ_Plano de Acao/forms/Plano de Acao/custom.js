function openZoomResponsavel(object) {				
	document.getElementById("hiddenIndex").value = getIndexGrid(object);
	openZoom("Responsável", "colleague", "colleagueName,Colaborador", "colleagueName,colleagueId", "addResp", "550", "500");
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
	var numOcorrencia = document.getElementById("cdOcorrencia").value;
	var posicao = window.top.location.href.indexOf("pagecentraltask?");
	var url = window.top.location.href.substr(0, posicao) + "pagecentraltask?app_ecm_centraltask_detailsProcessInstanceID=";

	window.open(url + numOcorrencia, "_new");
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