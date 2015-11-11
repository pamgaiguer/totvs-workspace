/**
 * Valida no array passado se o elemento existe
 * @param list Array com os elementos
 * @param value Elemento para comparação
 * @returns {Boolean} Retorna <b><i>true</i></b> caso exista
 */
function exist(list,value){
	for(var i in list){
		if(list[i] == value){
			return true;
		}
	}
	return false;
}