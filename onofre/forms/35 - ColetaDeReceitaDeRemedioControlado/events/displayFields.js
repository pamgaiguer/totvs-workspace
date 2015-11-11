function displayFields(form,customHTML){ 
	
	customHTML.append('<script>');
	
	var teste = form.getFormMode();
	customHTML.append(" function GetStatusPage() { return '" + teste + "'; } ");
	
	
	var numAtividade = getValue("WKNumState");
	log.info("(BARBARA) ENTROU NO DISPLAY FIELDS: " + numAtividade);
	
	var numProcesso;
	var inicio = 0;
			
	var preencherFormulario = 4
	var realizarColetaReceita = 5
	var ReagendarColetaReceita = 13
	var realizarUploadReceita = 15
	
	
	if (numAtividade == inicio || numAtividade == preencherFormulario) {
		
        customHTML.append("document.getElementById('dadosDaColeta_FieldSet').style.display='none';");
        customHTML.append("document.getElementById('dadosDaReceita_FieldSet').style.display='none';");
       // customHTML.append("document.getElementById('reagendamento_FieldSet').style.display='none';");
	}
	
	if (numAtividade == preencherFormulario) {
		
		numProcesso = getValue("WKNumProces");
		form.setValue('numProcesso', numProcesso);
		
		log.info("NUMERO DO PROCESSO: " + numProcesso);
	    	        
	}
	
	if (numAtividade == realizarColetaReceita ) {
		//Desaparecer
		customHTML.append("document.getElementById('dadosDaReceita_FieldSet').style.display='none';");
        //customHTML.append("document.getElementById('reagendamento_FieldSet').style.display='none';");
        
        //Aparecer
        customHTML.append("document.getElementById('dadosDaColeta_FieldSet').style.display='block';");
	}
	
	if (numAtividade == ReagendarColetaReceita ) {
		
		//Desaparecer
		customHTML.append("document.getElementById('dadosDaReceita_FieldSet').style.display='none';");
		
		//Aparecer
		//customHTML.append("document.getElementById('reagendamento_FieldSet').style.display='block';");
	}
	
	if (numAtividade == realizarUploadReceita ) {
		
		//Aparecer
		customHTML.append("document.getElementById('dadosDaReceita_FieldSet').style.display='block';");
	}
	
	
	
	customHTML.append('</script>');
}