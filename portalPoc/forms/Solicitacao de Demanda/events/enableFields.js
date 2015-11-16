function enableFields(form) {
	log.info("---> SOLICITACAO DE DEMANDA - enableFields");
	
	var atividade = getValue("WKNumState");
	var fields = new Array('atividade_ultima', 'atividade_penultima', 'atribuicao_para_pool');
	
	var SOL_INICIO = 2;
	var LID_AVALIAR_DEMANDA = 13;
	var SOL_CORRIGIR_SOLICITACAO = 3;
	var LID_DISTRIBUIR_DEMANDAS = 34;
	var PMO_ASSOCIAR_DEMANDA_CFP = 25;
	var GES_ESCLARECER_DUVIDA = 38;
	var GES_APROVAR_DEMANDA = 39;
	var SOL_AVALIAR_SOLUCAO = 5;
	var LID_VALIDAR_SOLUCAO = 54;
	var LID_AVALIAR_REPROVACAO = 60;
	var PMO_AGUARDAR_APROVACAO = 28;
	var ANA_EXECUTAR_DEMANDA = 50;
	var ANA_APONTAR_HORAS = 52;
	var LID_QUALIFICAR_DEMANDA = 68;

	if (atividade == SOL_INICIO || atividade == 0 || atividade == SOL_CORRIGIR_SOLICITACAO) {
		fields.push('sol_nome', 'sol_data', 'sol_tipo_demanda', 'sol_descricao', 'sol_ori', 'sol_ori_nm_empresa', 'sol_ori_nm_contato', 'sol_ori_tel_contato', 'sol_ori_email_contato', 'sol_ex_pr_sugerido', 'sol_ex_forma', 'sol_ex_cliente', 'sol_ex_cli_nome', 'sol_ex_cli_nm_contato', 'sol_ex_cli_tel_contato', 'sol_ex_cli_mail_contato', 'sol_pag_origem', 'sol_pag_cc', 'sol_pag_cfp');
	}
	else if (atividade == LID_AVALIAR_DEMANDA) {
		fields.push('lid_nome', 'lid_dt_recebimento', 'lid_pr_execucao', 'lid_qtd_horas', 'lid_vl_total', 'lid_inconsistencia', 'lid_tipo_acao', 'lid_urgencia', 'lid_obs');
	}
	else if (atividade == GES_ESCLARECER_DUVIDA) {
		fields.push('ges_duv_nome', 'ges_duv_dt_recebimento', 'ges_duv_respostas');
	}
	else if (atividade == GES_APROVAR_DEMANDA) {
		fields.push('ges_nome', 'ges_dt_recebimento', 'ges_ap_demanda', 'ges_obs', 'lid_pr_execucao', 'lid_qtd_horas', 'lid_vl_total', 'lid_urgencia');
	}
	else if (atividade == PMO_ASSOCIAR_DEMANDA_CFP) {
		fields.push('pmo_nome', 'pmo_dt_recebimento', 'pmo_cfp', 'pmo_pro_investimento', 'pmo_inconsistencia', 'pmo_obs');
	}
	else if (atividade == PMO_AGUARDAR_APROVACAO) {
		fields.push('pmo_ap_nome');
	}
	else if (atividade == ANA_EXECUTAR_DEMANDA) {
		fields.push('ana_nome', 'ana_dt_recebimento');
	}
	else if (atividade == ANA_APONTAR_HORAS) {
		fields.push('ana_jira');
	}
	else if (atividade == LID_VALIDAR_SOLUCAO) {
		fields.push('lid_ap_solucao', 'lid_ap_sol_obs');
	}
	else if (atividade == SOL_AVALIAR_SOLUCAO) {
		fields.push('sol_ap_solucao', 'sol_ap_sol_obs');
	}
	else if (atividade == LID_AVALIAR_REPROVACAO) {
		fields.push('lid_ace_reprovacao', 'lid_ar_obs');
	}
	else if (atividade == LID_QUALIFICAR_DEMANDA) {
		fields.push('av_prod_gap', 'av_prod_gap_o', 'av_prod_bug', 'av_prod_bug_o', 'av_prod_chamado', 'av_prod_chamado_o', 'av_prod_envolvimento', 'av_prod_envolvimento_o', 'av_prod_percepcao', 'av_prod_percepcao_o', 'av_can_prf_gp', 'av_can_prf_gp_o', 'av_can_prf_tec', 'av_can_prf_tec_o', 'av_can_prf_prod', 'av_can_prf_prod_o', 'av_can_prf_venda', 'av_can_prf_venda_o', 'av_can_cert', 'av_can_cert_o', 'av_cl_envolvimento', 'av_cl_envolvimento_o', 'av_cl_banco', 'av_cl_banco_o', 'av_cl_aplicacao', 'av_cl_aplicacao_o', 'av_cl_rede', 'av_cl_rede_o', 'av_cl_operacional', 'av_cl_operacional_o', 'av_cl_chamado', 'av_cl_chamado_o', 'av_cl_cliente', 'av_cl_cliente_o');
	}
	
	disableAllFields(form);
	enableSelectedFields(form, fields);
}

function disableAllFields(form) {
	var fields = form.getCardData();
	var iterator = fields.keySet().iterator();
	while (iterator.hasNext()) {
		var curField = iterator.next();
		form.setEnabled(curField, false);
	}
}

function enableSelectedFields(form, fields) {
	for (var i = 0; i < fields.length; i++) {
		form.setEnabled(fields[i], true);
	}
}