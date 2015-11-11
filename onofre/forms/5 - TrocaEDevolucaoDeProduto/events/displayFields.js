function displayFields(form,customHTML){ 
	
	customHTML.append('<script>');
	
	var numAtividade = getValue("WKNumState");
	log.info("(BARBARA) ENTROU NO DISPLAY FIELDS: " + numAtividade);
	
	var numProcesso;
	var inicio = 0;
			
	var preencherFormulario = 4
	var analisarPedidoTrocaDevol = 5
	
	
	if (numAtividade == inicio || numAtividade == preencherFormulario) {
		
        customHTML.append("document.getElementById('analiseDoPedido_FieldSet').style.display='none';");
       
	}
	
	if (numAtividade == preencherFormulario) {
		
		numProcesso = getValue("WKNumProces");
		form.setValue('numProcesso', numProcesso);
		
		log.info("NUMERO DO PROCESSO: " + numProcesso);
	    	        
	}
	
	if (numAtividade == analisarPedidoTrocaDevol ) {
		        
        //Aparecer
        customHTML.append("document.getElementById('analiseDoPedido_FieldSet').style.display='block';");
	}
	
	
	customHTML.append('</script>');
	
}