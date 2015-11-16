function mostraZoom(dataset, campos, resultFields, type, titulo) {
	window.open("/webdesk/zoom.jsp?datasetId="+dataset+"&dataFields="+campos+"&resultFields="+resultFields+"&filterValues=workflowRolePK.companyId,1"+"&type="+type+"&title="+titulo, "zoom", "status, scrollbars=no, width=600, height=350, top=0, left=0");
}

function setSelectedZoomItem(selectedItem) {
    if(selectedItem.type == "papel"){
    	$("#hd_pool").val(selectedItem["workflowRolePK.roleId"]);
    	$("#pool").val(selectedItem["roleDescription"]);
    }
}