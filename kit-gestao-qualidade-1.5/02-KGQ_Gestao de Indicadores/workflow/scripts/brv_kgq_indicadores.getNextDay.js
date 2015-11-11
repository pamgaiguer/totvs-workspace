function getNextDay(){
	var itens = new Array();
	var index = hAPI.getCardValue("index_campo");
	var data; 
	for(i=0;i<index;i++){
		var campo_form = parseInt(i,10) + 1;		
		itens[i] = hAPI.getCardValue("data_indicador___"+ campo_form);	
	}	
	
	
	if(itens.length == 0){
		data = getMoreDate(itens);
	}
	
	data = AddDate(parseInt(hAPI.getCardValue("periodicity"),10),getMoreDate(itens),getCountDays());	
	return data;
	
}

function getMoreDate(itens){

	var maior  = new Date();

	if(itens.length == 0){
		
		
		var datas = hAPI.getCardValue("startDate").split("");		
		
		var dia = parseInt(datas[1]+datas[2],10);
		
		var mes = parseInt(datas[4]+datas[5],10) - 1;
		
		var ano = parseInt(datas[7]+datas[8]+datas[9]+datas[10],10);
				
		log.info(maior.toString());
		maior.setFullYear(ano,mes,dia);
		log.info(maior.toString());
		maior.setHours(23);
		log.info(maior.toString());
		maior.setMinutes(50);
		
		maior.setSeconds(0);
		
		log.info(maior.toString());
		
		return maior;
	}
		
	var maior  = new Date();
		
	var datas = itens[0].split("");		
					
	maior.setFullYear(parseInt(datas[7]+datas[8]+datas[9]+datas[10],10) ,parseInt(datas[4]+datas[5],10) - 1,parseInt(datas[1]+datas[2],10) );
			
	for(i in itens){	
		
		var datas = itens[i].split("");	
		
		
		var dia = parseInt(datas[1]+datas[2],10);
		
		var mes = parseInt(datas[4]+datas[5],10) - 1;
		
		var ano = parseInt(datas[7]+datas[8]+datas[9]+datas[10],10);
		
		if(maior < new Date().setFullYear(ano,mes,dia) ){
		
			maior.setFullYear(ano,mes,dia);
			maior.setHours(23); 
			maior.setMinutes(50);
			maior.setSeconds(0);
		
		}
	}	
	
	return maior;
}

function AddDate(differenceType,date,amount){
	var day = new Date(date);		
	if((differenceType >= 0) && (differenceType < 3)){		
		day.setDate(day.getDate() + parseInt(amount,10));		
	}else{
		if((differenceType >= 3) && (differenceType < 7)) {
			day.setMonth(day.getMonth() + parseInt(amount,10));
		}else{
			if(differenceType == 7){				
				day.setFullYear(day.getFullYear() + parseInt(amount,10));		
			}
		}
	}	
	return day;	
}