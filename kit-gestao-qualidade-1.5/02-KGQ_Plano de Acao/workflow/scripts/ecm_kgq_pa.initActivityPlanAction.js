function initActivityPlanAction(posicao){

    log.info("============================ initActivityPlanAction() ============================");
    var PROCESSO_PA = "ecm_kgq_apa";
    var userList = new java.util.ArrayList();
    var card = new java.util.HashMap();

    log.info("============================ PROCESSO A SER INICIADO: " + PROCESSO_PA + " ============================");
 
    var nomeResponsavelPA = hAPI.getCardValue("nmResponsavelPA");
    var nomeResponsavel = hAPI.getCardValue("nmResponsavelAtiv___" + posicao);
    var matriculaResponsavel  = hAPI.getCardValue("hiddenIndexMat___" + posicao);
    var oQueComo = hAPI.getCardValue("nmOqueComo___" + posicao);
    var prazoConclusao = hAPI.getCardValue("nmDtFinalPrev___" + posicao);
    var processo= getValue("WKNumProces").toString();
    var matResponsavelPA = hAPI.getCardValue("hiddenMatResponsavel");

    userList.add(matriculaResponsavel);

    log.info("USUARIO RESPONSAVEL PELA ATIVIDADE: " + nomeResponsavel);
    log.info("MATRICULA RESPONSAVEL PELA ATIVIDADE: " + matriculaResponsavel);
    log.info("O QUE COMO: " + oQueComo);
    log.info("PRAZO DE CONCLUSAO: " + prazoConclusao);

    var filtro = DatasetFactory.createConstraint("colleagueName", nomeResponsavel, nomeResponsavel, ConstraintType.MUST);
    var filtrando = new Array(filtro);
    var colaborador = DatasetFactory.getDataset("colleague", null, filtrando, null);

    card.put('hiddenMatResponsavel',colaborador.getValue(0,"colleaguePK.colleagueId"));
    card.put("cdPlanoAcao", processo);
    card.put("nmResponsavelPA", nomeResponsavelPA);
    card.put("nmOquCom", oQueComo);
    card.put("nmResponsavel", nomeResponsavel);
    card.put("nmPrazoDeConclusao", prazoConclusao);
    card.put("matResponsavelPA", matResponsavelPA);

    log.info("============================ INICIANDO PROCESSO DE ATIVIDADE ============================");
    hAPI.startProcess(PROCESSO_PA, 0, userList , "Iniciado automaticamente", true, card, true);
}