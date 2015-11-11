function afterStateEntry(sequenceId){
    var THREAD_SEQUENCE = 0;
    var ULTIMO_SEGUNDO = 86399;
   
    log.info ("=========================== afterStateEntry() =============================");
   
    var dataPrazoForm = hAPI.getCardValue("nmPrazoDeConclusao");
    log.info("received dataPrazoFrom "+dataPrazoForm);
    var responsavel   = hAPI.getCardValue("hiddenMatResponsavel");
    log.info("received responsavel "+responsavel);
    var codigoSolicitacao = getValue("WKNumProces");
    log.info("received codigoSolicitacao "+codigoSolicitacao);

    var arrayData = dataPrazoForm.split("/", 3);
   
    var dataPrazo = java.util.Calendar.getInstance();
   
    dataPrazo.set(java.util.Calendar.DAY_OF_MONTH, new java.lang.Integer(arrayData[0]));
    dataPrazo.set(java.util.Calendar.MONTH, new java.lang.Integer(arrayData[1]) -1);
    dataPrazo.set(java.util.Calendar.YEAR, new java.lang.Integer(arrayData[2]));
   
    log.info("PETER 1 " + codigoSolicitacao);
    log.info("PETER 2 " + THREAD_SEQUENCE);
    log.info("PETER 3 " + responsavel);
    log.info("PETER 4 " + dataPrazo.getTime());
    log.info("PETER 5 " + ULTIMO_SEGUNDO);
    
    
    try {   
        hAPI.setDueDate(codigoSolicitacao, THREAD_SEQUENCE, responsavel, dataPrazo.getTime(), ULTIMO_SEGUNDO);
    } catch (e) {
        log.info ("================== afterStateEntry deu erro ===> " + e);
    }
}