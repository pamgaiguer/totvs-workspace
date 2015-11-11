/**
 * Busca todos os índices das linhas do pai x filho
 * @param numProc Número do processo
 * @returns {Array} Retorna um array com os índices
 */
function getIndex(form){
	var hashFields = form.getCardData();
	var iterate = hashFields.keySet().iterator();
	var arrayIds = new Array();
	
	while (iterate.hasNext()) {
		var key = iterate.next();
		if (key.indexOf("___") > 0) {
			var id = key.split("___");
			if(!exist(arrayIds,id[1])) arrayIds.push(id[1]);
		}
	}
	
	return arrayIds;
}