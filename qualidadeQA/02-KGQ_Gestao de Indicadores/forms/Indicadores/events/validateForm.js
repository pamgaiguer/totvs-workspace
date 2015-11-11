function validateForm(form) {
	if(getValue("WKCompletTask") == "true"){
		var msgErro = "";
	
		var numActivity = getValue("WKNumState");
		//var numActivity = 1;
	
		if ((numActivity == 1) || (numActivity == 6)) {
			
			var hoje = new Date();
			hoje.setHours(0);
			hoje.setMilliseconds(0);
			hoje.setMinutes(0);
			hoje.setMinutes(0);
	
			if (form.getValue('startDate') == "")
				msgErro = msgErro + " <br> -Informe a data de início da vigência.";
			
			if (form.getValue('finishDate') == "")
				msgErro = msgErro + " <br> -Informe a data de fim da vigência.";
	
			if (numActivity == 1 && form.getValue('startDate') != "" && getDate(form.getValue('startDate')) <= hoje.getTime()) {
				msgErro = msgErro + " <br> -A data de início da vigência deve ser maior que a data de hoje.";
			}		
			
			if ((form.getValue('finishDate') != "") && (getDate(form.getValue('finishDate')) < hoje.getTime())){			
				msgErro = msgErro + " <br> -A data de término da vigência deve ser maior que a data de hoje.";
			}
			 
			if ((form.getValue('finishDate') != "" && form.getValue('startDate') != "") && (getDate(form.getValue('finishDate')) <= getDate(form.getValue('startDate')))){			
				msgErro = msgErro + " <br> -A data de término da vigência deve ser maior que a data de início da vigência.";
			}	
			
			if(form.getValue('txtAppointmentUserId') == ""){
				msgErro = msgErro + " <br> -O Usuário Apurador deve ser informado.";
			}
	
			if(form.getValue('txtIndicatorManagerId') == ""){			
				msgErro = msgErro + " <br> -O Gestor do Indicador deve ser informado.";
			}	
			
			if(form.getValue('name') == ""){			
				msgErro = msgErro + " <br> -Você deve informar o nome do Indicador.";
			}	

			if(form.getValue('goal') == ""){			
				msgErro = msgErro + " <br> -Você deve informar a meta do Indicador.";
			}	
			
			
			
			
		}
		if(numActivity == 3){
			var indice = new Array();
			var index = form.getValue("index_campo");
			var indexFor = parseInt(index,10)+1;
			log.info("+++++++++++++++++++++++++++++++++++++++++++++ indexFor"+indexFor);
			log.info(form.getValue("appointmentValue___1"));
			for(var i=1;i<indexFor;i++){
				if(form.getValue("appointmentValue___"+[i]) == ""){
					log.info(indice[i]);
					throw "Informe um valor para a Apuração";
				}
			}
		}
		if (msgErro != "")
			throw msgErro;
	}
}


function getDate(dataString) {

	itens = dataString.split("");

	var dia = parseInt(itens[1] + itens[2], 10);
	var mes = parseInt(itens[4] + itens[5], 10) - 1;
	var ano = parseInt(itens[7] + itens[8] + itens[9] + itens[10], 10);

	var data = new Date();
	data.setFullYear(ano, mes, dia);
	data.setHours(0);
	data.setMilliseconds(0);
	data.setMinutes(0);
	data.setMinutes(0);	

	return data.getTime();
}