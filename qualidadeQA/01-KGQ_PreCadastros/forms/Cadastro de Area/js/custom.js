function openZoomRespArea() {	
	openZoom("Responsavel", "colleague", "colleagueId,Matricula,colleagueName,Autor", "colleagueName,colleagueId", "addRespArea", "550", "550");
}

function setSelectedZoomItem(selectedItem){
	var tipo = selectedItem.type;
	if (tipo == "addRespArea") {
		document.getElementById('nmResponsavelArea').value = selectedItem.colleagueName;
		document.getElementById('nmMatricRespArea').value = selectedItem.colleagueId;
	}
}

function clearFields(){
	document.getElementById("nmResponsavelArea").value='';
	document.getElementById("nmMatricRespArea").value='';	
}