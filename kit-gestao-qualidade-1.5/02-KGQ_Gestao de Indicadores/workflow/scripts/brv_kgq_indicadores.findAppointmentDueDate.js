function findAppointmentDueDate(){
	
	
	//aqui é um exemplo tem que colocar isso dentro do fonte, ok ? chama este método lá, ok ?
			/*hAPI.getCardValue("index_campo");
			var filhos = new Array();
			for(var i=0;i<index;i++){
				filhos[i] = hAPI.getCardValue("");
			}
			hAPI.getCardValue();
			*/
	
	var startDate = new Date();	
	var datas = hAPI.getCardValue("startDate").split("");	
	var dia = parseInt(datas[1]+datas[2],10);	
	var mes = parseInt(datas[4]+datas[5],10) - 1;	
	var ano = parseInt(datas[7]+datas[8]+datas[9]+datas[10],10);			
	log.info(startDate.toString());
	startDate.setFullYear(ano,mes,dia);
	log.info(startDate.toString());
	startDate.setHours(23);
	log.info(startDate.toString());
	startDate.setMinutes(59);	
	startDate.setSeconds(0);
	
	
	var finishDate = new Date(); 
	var datas = hAPI.getCardValue("finishDate").split("");	
	var dia = parseInt(datas[1]+datas[2],10);	
	var mes = parseInt(datas[4]+datas[5],10) - 1;	
	var ano = parseInt(datas[7]+datas[8]+datas[9]+datas[10],10);			
	log.info(finishDate.toString());
	finishDate.setFullYear(ano,mes,dia);
	log.info(finishDate.toString());
	finishDate.setHours(23);
	log.info(finishDate.toString());
	finishDate.setMinutes(59);	
	finishDate.setSeconds(0);

	
	var differenceType = parseInt(hAPI.getCardValue("periodicity"),10);
	var amount = getCountDays();	
	
	log.info(String(dateDiffence(startDate,finishDate,differenceType,amount)));	
	
	return dateDiffence(startDate,finishDate,differenceType,amount);
	
}





/*
 * Retorna o número de apontamentos necessários para fechar o indicador
 * startDate date 
 * finishDate date 
 * differenceType int 
 * amount int
	const DAILY:int = 0;
	const WEEKLY:int = 1;
	const BIWEEKLY:int = 2;
	const MONTHLY:int = 3;
	const BIMONTHLY:int = 4;
	const QUARTERLY:int = 5; //Trimestral
	const SEMIANNUAL:int = 6; //Semestral
	const YEARLY:int = 7;
 * */

function dateDiffence(startDate, finishDate, differenceType, amount)
{
	var difference = 0;

	var startDateClone = new Date(startDate);
	
	var finishDateClone = new Date(finishDate);

	while(startDateClone < finishDateClone){
		difference++;	
		startDateClone = AddDate(differenceType,startDateClone,amount);		
	}

	return difference;
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


	