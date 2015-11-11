function init(){
	var INICIO_SOLICITACAO = "0";
	var ATIVIDADE_INICIO   = "1";		
	var ANALISE_AUDITORIA = "5";
	var activity = getWKNumState();			
	
	if (activity != ATIVIDADE_INICIO && activity != INICIO_SOLICITACAO) {
		setVisible("addSolicitante" ,false);
		setVisible("addArea" ,false);
		setVisible("btCalendarDataIniAudit" ,false);
		setVisible("btCalendarDataFimAudit" ,false);
		setVisible("btIncluirArea" ,false);
		setVisible("zoomAuditor" ,false);
		
		var tableGrid = document.getElementById("areaAuditada");
		
		if (activity != null) 			
			trashDisappearsGrid(tableGrid);
		
		scramWithButtonsButtonGrid(tableGrid, true);	
	}
	
	if(activity == 3){
		if(document.getElementById("lineCount").value == null || document.getElementById("lineCount").value == ""){
			document.getElementById("lineCount").value=04;
		}
		var linhasContador = document.getElementById("lineCount").value;
		document.getElementById("lineCount").value=(parseInt(linhasContador))+1;
	}
}

function setVisible(idObject, visible){
	document.getElementById(idObject).style.visibility = visible?"visible":"hidden";
}

function openZoomArea() {		
	openZoom("Area", "ecm_kgq_areas", "nmArea,Areas", "nmArea", "addArea", "400", "250", "metadata_active", "true");
}

function openZoomSolicitante() {		
	window.open("/webdesk/zoom.jsp?datasetId=colleague&dataFields=colleagueId,Matricula,colleagueName,Nome&resultFields=colleagueId,colleagueName&type=addSolicitante", "zoom" , "status, scrollbars=no , width=600 , heigth=550, top=0 , left=0");
}

function openZoomAreaGrid(object) {
	document.getElementById("hiddenIndex").value = getIndexGrid(object);		
	openZoom("Area", "ecm_kgq_areas", "nmArea,Areas,nmResponsavelArea,Responsaveis", "nmArea,nmResponsavelArea,nmMatricRespArea", "addAreaGrid", "600", "550", "metadata_active", "true");
}

function openZoomAuditor(object) {
	document.getElementById("hiddenIndex").value = getIndexGrid(object);
	openZoom("Auditor", "colleague", "colleagueId,Matricula,colleagueName,Nome", "colleagueId,colleagueName", "addAuditor", "600", "550");
}

function setSelectedZoomItem(selectedItem){
	var tipo = selectedItem.type;
	var index = document.getElementById("hiddenIndex").value;
	
	if (tipo == "addArea") {
		document.getElementById('nmArea').value = selectedItem.nmArea;
	}
	
	if (tipo == "addAreaGrid") {
		document.getElementById("nmAreaGrid___" + index).value = selectedItem.nmArea;
		document.getElementById("nmResponsavelArea___" + index).value = selectedItem.nmResponsavelArea;
		document.getElementById("hiddenRespArea___" + index).value = selectedItem.nmMatricRespArea;
	} 
	
	if(tipo == "addSolicitante") {
		document.getElementById('nmMatricSolicitante').value = selectedItem.colleagueId;
		document.getElementById('nmSolicitante').value = selectedItem.colleagueName;
	} 
	
	if (tipo == "addAuditor") {
		document.getElementById("nmMatriculaAuditor___" + index).value = selectedItem.colleagueId;
		document.getElementById("nmAuditor___" + index).value = selectedItem.colleagueName;
	}
}

function getIndexGrid(buttonSelected){
	var indexInit = 0;
	if ( buttonSelected.id.indexOf('__') > -1 ) {
		var indexInit = buttonSelected.id.indexOf('__') + 3;
	}
	var size = buttonSelected.id.length;
	var number = buttonSelected.id.substring(indexInit, size);
	return number;
}

function selectDateData(object, oldDates, futureDates){
	var objectDate = document.getElementById("dtData");
	displayDatePicker(objectDate, 'dmy', undefined, futureDates, oldDates );	
}

function selectDateInicioAudit(campo, object, oldDates, futureDates){
	var objectDate = document.getElementById(campo);
	displayDatePicker(objectDate, 'dmy', undefined, futureDates, oldDates );	
}

function clearGridAreasAudit(object) {
	var index = getIndexGrid(object);
	document.getElementById("nmAreaGrid___" + index).value=" ";
	document.getElementById("nmResponsavelArea___" + index).value=" ";
	document.getElementById("hiddenRespArea___" + index).value=" ";
}
function clearGridAuditor(object) {
	var index = getIndexGrid(object);
	document.getElementById("nmAuditor___" + index).value=" ";
	document.getElementById("hiddenAukditArea___" + index).value=" ";
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
function clearField(object_name) {
	var object;
	object = document.getElementsByName(object_name)[0];
	var index = getIndexGrid(object);
	document.getElementById("dtDataInicioAuditArea___" + index).value=" ";
	document.getElementById("dtDataFimAuditArea___" + index).value=" ";
}
function linhasGrid() {
	fieldsCount = 0;
	var elemen = document.form.elements;
	for (var x = 0; x < elemen.length; x++) {
		var field = elemen[x].id.match(/[a-zA-Z]+___\d/gi);
		if (field != null) {
			fieldsCount = fieldsCount + 1;
		}
	}
	lineCount = fieldsCount / 17;
	document.getElementById("hiddenLineCount").value = lineCount;
}

function scramWithButtonsButtonGrid(grid, scram){
	var inputs = grid.getElementsByTagName("input");
	for(var i=0;i<inputs.length;i++){		
		if(inputs[i].type=="button")					
			inputs[i].style.display = scram?"none":"block";
	}
}
function selectDateInicioAuditPai(object, oldDates, futureDates){
	var index = getIndexGrid(object);
	var objectDateQuery = jQuery(object).siblings('input[name^="dtDataInicioAuditArea"]');
	displayDatePicker(objectDateQuery[0], 'dmy', undefined, futureDates, oldDates );	
}
function selectDateInicioAuditPai2(object, oldDates, futureDates){
	var index = getIndexGrid(object);
	var objectDateQuery = jQuery(object).siblings('input[name^="dtDataFimAuditArea"]');
	displayDatePicker(objectDateQuery[0], 'dmy', undefined, futureDates, oldDates );	
}