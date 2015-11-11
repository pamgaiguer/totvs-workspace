function init(){
	var INICIO_SOLICITACAO = "0", 
		ATIVIDADE_INICIO = "1";
	var activity = getWKNumState();
	
	if (activity != ATIVIDADE_INICIO && activity != INICIO_SOLICITACAO) {
		enableButtons('false', document.getElementById("formOccurrence"));
	}
	
	var fgOcorrenciaReincidente = document.getElementById("fgOcorrenciaReincidente");
	if(fgOcorrenciaReincidente.value == "Nao"){
		enabledFieldCdOccurrenceRecidivist("Nao");
	}
	else if(fgOcorrenciaReincidente.value == "Sim"){
		fgOcorrenciaReincidente.checked = true;
	}
	
	buildTab();
}		

function openZoomArea() {
	openZoom("Area", "ecm_kgq_areas", "nmArea,Areas", "nmArea", "addArea", "600", "550", "metadata_active", "true");
}

function openZoomOrigin() {
	openZoom("Origem", "ecm_kgq_origem", "nmOrigem,Origem", "nmOrigem", "addOrigin", "600", "550", "metadata_active", "true");
}

function setSelectedZoomItem(selectedItem){
	var tipo = selectedItem.type;
	if (tipo == "addArea") {
		document.getElementById('nmArea').value = selectedItem.nmArea;
	} else if (tipo == "addOrigin") {
		document.getElementById('nmOrigem').value = selectedItem.nmOrigem;
	} else if(tipo == "addSolicReinc") {
		document.getElementById("cdOcorrenciaReincidente").value = selectedItem.cdOcorrencia;
	}
}

function clearField(field){
	document.getElementById(field).value='';
}

function enabledFieldCdOccurrenceRecidivist(value){
	var input = document.getElementById("cdOcorrenciaReincidente");
	//var btZoom = document.getElementById("btZoomOcorrenciaReincidente");
	if (value == "Sim") {
		//btZoom.style.display = "table-cell";
		document.getElementById("ocorrencia_reinc").style.display = "block";
		input.disabled = false;
	}
	else {
		//btZoom.style.display = "none";
		document.getElementById("ocorrencia_reinc").style.display = "none";
		input.value = '';
		input.disabled = true;
	}
}

function openZoomRequest(){
	var input = document.getElementById("cdOcorrenciaReincidente");
	if(!input.disabled){
		openZoom("Ocorrencia", "ecm_kgq_ro", "cdOcorrencia,Solicitacao,dsOcorrencia,Descricao,cdOcorrencia,dsOcorrencia", "cdOcorrencia,dsOcorrencia", "addSolicReinc", "600", "550", "metadata_active", "true");
	}
}


function buildTab() {
	//When page loads...
	$(".tab_content").hide(); //Hide all content
	$("ul.tabs li:first").addClass("active").show(); //Activate first tab
	$(".tab_content:first").show(); //Show first tab content

	//On Click Event
	$("ul.tabs li").click(function() {
		$("ul.tabs li").removeClass("active"); //Remove any "active" class
		$(this).addClass("active"); //Add "active" class to selected tab
		$(".tab_content").hide(); //Hide all tab content
		var activeTab = $(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
		$(activeTab).show(); //Fade in the active ID content
		return false;
	});
}