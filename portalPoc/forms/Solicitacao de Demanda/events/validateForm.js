function validateForm(form) {
	log.info("---> SOLICITACAO DE DEMANDA - validateForm");
	
	var atividade = getValue("WKNumState");
	var msg = "";
	
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
	
	//ATIVIDADES DO SOLICITANTE
	if (atividade == SOL_INICIO || atividade == 0 || atividade == SOL_CORRIGIR_SOLICITACAO) {
		if(form.getValue("sol_tipo_demanda") == ""){
			msg += "<br>Por favor, preencha o campo <strong>Tipo da Demanda</strong>";
		}
		if(form.getValue("sol_descricao") == ""){
			msg += "<br>Por favor, preencha o campo <strong>Descrição da Demanda</strong>";
		}
		if(form.getValue("sol_ori") == ""){
			msg += "<br>Por favor, preencha o campo <strong>Origem</strong>";
		}
		if(form.getValue("sol_ori_nm_empresa") == ""){
			msg += "<br>Por favor, preencha o campo <strong>Nome da Empresa</strong>";
		}
		if(form.getValue("sol_ori_nm_contato") == ""){
			msg += "<br>Por favor, preencha o campo <strong>Nome da Pessoa de Contato</strong>";
		}
		if(form.getValue("sol_ori_tel_contato") == ""){
			msg += "<br>Por favor, preencha o campo <strong>Telefone do Contato</strong>";
		}
		if(form.getValue("sol_ori_email_contato") == ""){
			msg += "<br>Por favor, preencha o campo <strong>E-mail do Contato</strong>";
		}
		if(form.getValue("sol_ex_pr_sugerido") == ""){
			msg += "<br>Por favor, preencha o campo <strong>Prazo Sugerido</strong>";
		}
		if(form.getValue("sol_ex_forma") == ""){
			msg += "<br>Por favor, preencha o campo <strong>Forma de Execução</strong>";
		}
		if(form.getValue("sol_ex_cliente") == ""){
			msg += "<br>Por favor, preencha o campo <strong>Tem Cliente Envolvido</strong>";
		}
		else {
			if(form.getValue("sol_ex_cliente") == "sim"){
				if(form.getValue("sol_ex_cli_nome") == ""){
					msg += "<br>Por favor, preencha o campo <strong>Nome do Cliente</strong>";
				}
				if(form.getValue("sol_ex_cli_nm_contato") == ""){
					msg += "<br>Por favor, preencha o campo <strong>Nome da Pessoa de Contato do Cliente</strong>";
				}
				if(form.getValue("sol_ex_cli_tel_contato") == ""){
					msg += "<br>Por favor, preencha o campo <strong>Telefone</strong>";
				}
				if(form.getValue("sol_ex_cli_mail_contato") == ""){
					msg += "<br>Por favor, preencha o campo <strong>E-mail</strong>";
				}
			}
		}
		if(form.getValue("sol_pag_origem") == ""){
			msg += "<br>Por favor, preencha o campo <strong>Origem</strong>";
		}
	}
	if (atividade == SOL_AVALIAR_SOLUCAO) {
		if(form.getValue("sol_ap_solucao") == ""){
			msg += "<br>Por favor, preencha o campo <strong>Solução Validada</strong>";
		}
		if(form.getValue("sol_ap_sol_obs") == ""){
			msg += "<br>Por favor, preencha o campo <strong>Observações</strong>";
		}
	}
	
	//ATIVIDADES DO LIDER
	if (atividade == LID_AVALIAR_DEMANDA) {
		if(form.getValue("lid_pr_execucao") == ""){
			msg += "<br>Por favor, preencha o campo <strong>Prazo de Execução</strong>";
		}
		if(form.getValue("lid_qtd_horas") == ""){
			msg += "<br>Por favor, preencha o campo <strong>Quantidade de Horas</strong>";
		}
		if(form.getValue("lid_vl_total") == ""){
			msg += "<br>Por favor, preencha o campo <strong>Valor Total</strong>";
		}
		if(form.getValue("lid_inconsistencia") == ""){
			msg += "<br>Por favor, preencha o campo <strong>Possui Inconsistência</strong>";
		}
		else {
			if(form.getValue("lid_inconsistencia") == "nao"){
				if(form.getValue("lid_tipo_acao") == ""){
					msg += "<br>Por favor, preencha o campo <strong>Tipo de Ação</strong>";
				}
				if(form.getValue("lid_urgencia") == ""){
					msg += "<br>Por favor, preencha o campo <strong>Urgência</strong>";
				}
			}
		}
		if(form.getValue("lid_obs") == ""){
			msg += "<br>Por favor, preencha o campo <strong>Observações</strong>";
		}
	}
	if (atividade == LID_VALIDAR_SOLUCAO) {
		if(form.getValue("lid_ap_solucao") == ""){
			msg += "<br>Por favor, preencha o campo <strong>Solução Aprovada</strong>";
		}
		if(form.getValue("lid_ap_sol_obs") == ""){
			msg += "<br>Por favor, preencha o campo <strong>Observações</strong>";
		}
	}
	
	//ATIVIDADES DO PMO
	if (atividade == PMO_ASSOCIAR_DEMANDA_CFP) {
		if(form.getValue("pmo_inconsistencia") == ""){
			msg += "<br>Por favor, preencha o campo <strong>Possui Inconsistência</strong>";
		}
		if(form.getValue("pmo_obs") == ""){
			msg += "<br>Por favor, preencha o campo <strong>Observações</strong>";
		}
		else {
			if(form.getValue("pmo_inconsistencia") == "nao"){
				if(form.getValue("pmo_cfp") == ""){
					msg += "<br>Por favor, preencha o campo <strong>Código CFP</strong>";
				}
				if(form.getValue("pmo_pro_investimento") == ""){
					msg += "<br>Por favor, preencha o campo <strong>Projeto de Investimento</strong>";
				}
			}
		}
	}
	if (atividade == PMO_AGUARDAR_APROVACAO) {
		if(form.getValue("pmo_ap_nome") == ""){
			msg += "<br>Por favor, preencha o campo <strong>Nome do Aprovador</strong>";
		}
	}

	//ATIVIDADES DO GESTOR
	if (atividade == GES_APROVAR_DEMANDA) {
		if(form.getValue("ges_ap_demanda") == ""){
			msg += "<br>Por favor, preencha o campo <strong>Aprovar Demanda</strong>";
		}
		if(form.getValue("ges_obs") == ""){
			msg += "<br>Por favor, preencha o campo <strong>Observações</strong>";
		}
	}
	if (atividade == GES_ESCLARECER_DUVIDA) {
		if(form.getValue("ges_duv_respostas") == ""){
			msg += "<br>Por favor, preencha o campo <strong>Respostas</strong>";
		}
	}
	
	if (msg != "") {
		throw msg;
	}
}