var CDF = CDF || {};

CDF.Inicio = {
	initCalendar : function() {
		FLUIGC.calendar('#sol_ex_pr_sugerido', {
			minDate: new Date()
		});
		
		$('#sol_data').val(CDF.Utils.now());
	},
	showFields : function() {
		$('fieldset').hide();
		$('#iniciar-solicitacao').show();
	},
	setMascaras : function() {
		$('#sol_ori_tel_contato').mask('(99) 9999-9999?9');
		$('#sol_ex_cli_tel_contato').mask('(99) 9999-9999?9');
	},
	setNomeSolicitante : function() {
		$('#sol_nome').val(CDF.Inicio.username);
	},
	setEventos : function() {
		$('#sol_tipo_demanda').change(function() {
			var pool = $(this).val();
			$('#atribuicao_para_pool').val('Pool:Role:' + pool);
		});
		
		$('[name=sol_ex_cliente]').change(function(){
			if ($(this).val() == 'sim') {
				$('#dados_cliente').removeClass('hide');
			}
			else {
				$('#dados_cliente').addClass('hide');
			};
		});
	},
	init : function() {
		CDF.Utils.addDefaultOption($('#sol_tipo_demanda'));
		this.setMascaras();
		this.initCalendar();
		this.setNomeSolicitante();
		this.showFields();
		this.setEventos();
	}
};

CDF.Lid_Avaliar_Demanda = {
	initCalendar : function() {
		FLUIGC.calendar('#lid_pr_execucao', {
			minDate: new Date()
		});

		$('#lid_dt_recebimento').val(CDF.Utils.now());
	},
	showFields : function() {
		var fs = [ '#avaliar-demanda' ];
		CDF.Utils.showFieldset(fs);
		
		var el = [ '#_sol_tipo_demanda', '#_sol_ori', '#_sol_pag_origem' ];
		CDF.Utils.cssReadonly(el);
	},
	setMascaras : function() {
		$('#lid_qtd_horas').mask('9?99999');
		$('#lid_vl_total').mask('R$ 9?999999');
	},
	setNomeLider: function() {
		$('#lid_nome').val(CDF.Lid_Avaliar_Demanda.username);
	},
	setEventos : function() {
		$('input[name=lid_inconsistencia]').change(function() {
			if ($(this).val() == 'sim') {
				if ($('#div_tipo_acao').is(':visible')) {
					$('#div_tipo_acao').addClass('hide');
				}
				if ($('#div_urgencia').is(':visible')) {
					$('#div_urgencia').addClass('hide');
				}
			} else {
				$('#div_tipo_acao').removeClass('hide');
				$('#div_urgencia').removeClass('hide');
			}
		});
	},
	init : function() {
		CDF.Utils.setActiveDiv($('#avaliar-demanda').parent());
		this.setMascaras();
		this.initCalendar();
		this.setNomeLider();
		this.showFields();
		this.setEventos();
		CDF.Utils.reloadOptions();
	}
};

CDF.Sol_Corrigir_Solicitacao = {
	initCalendar : function() {
		FLUIGC.calendar('#sol_ex_pr_sugerido', {
			minDate: new Date()
		});
		
		$('#sol_data').val(CDF.Utils.now());
	},
	showFields : function() {
		$('fieldset').hide();
		$('#iniciar-solicitacao').show();
	},
	setMascaras : function() {
		$('#sol_ori_tel_contato').mask('(99) 9999-9999?9');
		$('#sol_ex_cli_tel_contato').mask('(99) 9999-9999?9');
	},
	setEventos : function() {
		$('#sol_tipo_demanda').change(function() {
			var pool = $(this).val();
			$('#atribuicao_para_pool').val('Pool:Role:' + pool);
		});
		
		$('[name=sol_ex_cliente]').change(function(){
			if ($(this).val() == 'sim') {
				$('#dados_cliente').removeClass('hide');
			}
			else {
				$('#dados_cliente').addClass('hide');
			};
		});
	},
	init : function() {
		this.setMascaras();
		this.initCalendar();
		this.showFields();
		this.setEventos();
	}
};

CDF.Ges_Esclarecer_Duvida = {
	initCalendar : function() {
		$('#ges_duv_dt_recebimento').val(CDF.Utils.now());
	},
	showFields : function() {
		var fs = [ '#esclarecer-duvida' ];
		CDF.Utils.showFieldset(fs);
		
		var el = [ '#_sol_tipo_demanda', '#_sol_ori', '#_sol_pag_origem' ];
		CDF.Utils.cssReadonly(el);
	},
	setNomeGestor: function() {
		$('#ges_duv_nome').val(CDF.Ges_Esclarecer_Duvida.username);
	},
	init : function() {
		CDF.Utils.setActiveDiv($('#esclarecer-duvida').parent());
		this.initCalendar();
		this.setNomeGestor();
		this.showFields();
		CDF.Utils.reloadOptions();
	}
};

CDF.Ges_Aprovar_Demanda = {
	initCalendar : function() {
		FLUIGC.calendar('#lid_pr_execucao', {
			minDate: new Date()
		});
		
		$('#ges_dt_recebimento').val(CDF.Utils.now());
	},
	showFields : function() {
		var fs = [ '#aprovar-demanda' ];
		CDF.Utils.showFieldset(fs);
		
		var el = [ '#_sol_tipo_demanda', '#_sol_ori', '#_sol_pag_origem' ];
		CDF.Utils.cssReadonly(el);
	},
	setMascaras : function() {
		$('#lid_qtd_horas').mask('9?99999');
		$('#lid_vl_total').mask('R$ 9?999999');
	},
	setNomeGestor: function() {
		$('#ges_nome').val(CDF.Ges_Aprovar_Demanda.username);
	},
	init : function() {
		CDF.Utils.setActiveDiv($('#aprovar-demanda').parent());
		this.setMascaras();
		this.initCalendar();
		this.setNomeGestor();
		this.showFields();
		CDF.Utils.reloadOptions();
	}
};

CDF.Pmo_Associar_Demanda_Cfp = {
	initCalendar : function() {
		$('#pmo_dt_recebimento').val(CDF.Utils.now());
	},
	showFields : function() {
		var fs = [ '#associar-demanda' ];
		CDF.Utils.showFieldset(fs);
		
		var el = [ '#_sol_tipo_demanda', '#_sol_ori', '#_sol_pag_origem' ];
		CDF.Utils.cssReadonly(el);
	},
	setNomePmo: function() {
		$('#pmo_nome').val(CDF.Pmo_Associar_Demanda_Cfp.username);
	},
	setEventos : function() {
		$('input[name=pmo_inconsistencia]').change(function() {
			if ($(this).val() == 'sim') {
				if ($('#pmo_sem_inconsistencia').is(':visible')) {
					$('#pmo_sem_inconsistencia').addClass('hide');
				}
			} else {
				$('#pmo_sem_inconsistencia').removeClass('hide');
			}
		});
	},
	init : function() {
		CDF.Utils.setActiveDiv($('#associar-demanda').parent());
		this.initCalendar();
		this.setNomePmo();
		this.showFields();
		this.setEventos();
		CDF.Utils.reloadOptions();
	}
};

CDF.Lid_Distribuir_Demandas = {
	showFields : function() {
		CDF.Utils.showFieldset();
		
		var el = [ '#_sol_tipo_demanda', '#_sol_ori', '#_sol_pag_origem' ];
		CDF.Utils.cssReadonly(el);
	},
	init : function() {
		this.showFields();
		CDF.Utils.reloadOptions();
	}
};

CDF.Pmo_Aguardar_Aprovacao = {
	showFields : function() {
		var fs = [ '#aguardar-aprovacao' ];
		CDF.Utils.showFieldset(fs);
		
		var el = [ '#_sol_tipo_demanda', '#_sol_ori', '#_sol_pag_origem' ];
		CDF.Utils.cssReadonly(el);
	},
	init : function() {
		CDF.Utils.setActiveDiv($('#aguardar-aprovacao').parent());
		
		this.showFields();
		CDF.Utils.reloadOptions();
	}
};

CDF.Ana_Executar_Demanda = {
	initCalendar : function() {
		$('#ana_dt_recebimento').val(CDF.Utils.now());
	},
	showFields : function() {
		var fs = [ '#executar-demanda' ];
		CDF.Utils.showFieldset(fs);
		
		var el = [ '#_sol_tipo_demanda', '#_sol_ori', '#_sol_pag_origem' ];
		CDF.Utils.cssReadonly(el);
	},
	setNomeAnalista: function() {
		$('#ana_nome').val(CDF.Ana_Executar_Demanda.username);
	},
	init : function() {
		CDF.Utils.setActiveDiv($('#executar-demanda').parent());
		
		this.initCalendar();
		this.setNomeAnalista();
		this.showFields();
		CDF.Utils.reloadOptions();
	}
};

CDF.Ana_Apontar_Horas = {
	showFields : function() {
		var fs = [ '#apontar-horas' ];
		CDF.Utils.showFieldset(fs);
		
		var el = [ '#_sol_tipo_demanda', '#_sol_ori', '#_sol_pag_origem' ];
		CDF.Utils.cssReadonly(el);
	},
	init : function() {
		CDF.Utils.setActiveDiv($('#apontar-horas').parent());
		
		this.showFields();
		CDF.Utils.reloadOptions();
	}
};

CDF.Lid_Validar_Solucao = {
	showFields : function() {
		var fs = [ '#validar-solucao' ];
		CDF.Utils.showFieldset(fs);
		
		var el = [ '#_sol_tipo_demanda', '#_sol_ori', '#_sol_pag_origem' ];
		CDF.Utils.cssReadonly(el);
	},
	init : function() {
		CDF.Utils.setActiveDiv($('#validar-solucao').parent());
		
		this.showFields();
		CDF.Utils.reloadOptions();
	}
};

CDF.Sol_Avaliar_Solucao = {
	showFields : function() {
		$('fieldset').hide();
		$('#iniciar-solicitacao').show();
		$('#avaliar-solucao').show();
		
		var el = [ '#_sol_tipo_demanda', '#_sol_ori', '#_sol_pag_origem' ];
		CDF.Utils.cssReadonly(el);
	},
	init : function() {
		CDF.Utils.setActiveDiv($('#avaliar-solucao').parent());
		
		this.showFields();
		CDF.Utils.reloadOptions();
	}
};

CDF.Lid_Qualificar_Demanda = {
	showFields : function() {
		var fs = [ '#qualificar-demanda' ];
		CDF.Utils.showFieldset(fs);
		
		var el = [ '#_sol_tipo_demanda', '#_sol_ori', '#_sol_pag_origem' ];
		CDF.Utils.cssReadonly(el);
	},
	init : function() {
		CDF.Utils.setActiveDiv($('#qualificar-demanda').parent());
		
		this.showFields();
		CDF.Utils.reloadOptions();
	}
};

CDF.Utils = {
	showFieldset : function(fieldsets) {
		$('fieldset').hide();

		var fs = [ '#iniciar-solicitacao' ];
		
		if (fieldsets !== undefined) {
			for (var f in fieldsets) {
				fs.push(fieldsets[f]);
			}
		}
		
		if ($('#lid_nome').val() != '' || $('#_lid_nome').val() != '') {
			fs.push('#avaliar-demanda');
		}
		if ($('#ges_duv_respostas').val() != '' || $('#_ges_duv_respostas').val() != '') {
			fs.push('#esclarecer-duvida');
		}
		if ($('#ges_nome').val() != '' || $('#_ges_nome').val() != '') {
			fs.push('#aprovar-demanda');
		}
		if ($('#pmo_nome').val() != '' || $('#_pmo_nome').val() != '') {
			fs.push('#associar-demanda');
		}
		if ($('#pmo_ap_nome').val() != '' || $('#_pmo_ap_nome').val() != '') {
			fs.push('#aguardar-aprovacao');
		}
		if ($('#ana_nome').val() != '' || $('#_ana_nome').val() != '') {
			fs.push('#executar-demanda');
		}
		if ($('#ana_jira').val() != '' || $('#_ana_jira').val() != '') {
			fs.push('#apontar-horas');
		}
		if ($('[name=lid_ap_solucao]').val() != '' && $('[name=lid_ap_solucao]').val() !== undefined) {
			fs.push('#validar-solucao');
		}
		if ($('[name=lid_ace_reprovacao]').val() != '' && $('[name=lid_ace_reprovacao]').val() !== undefined) {
			fs.push('#avaliar-reprovacao');
		}
		if ($('[name=sol_ap_solucao]').val() != '' && $('[name=sol_ap_solucao]').val() !== undefined) {
			fs.push('#avaliar-solucao');
		}
		
		for (f in fs) {
			$(fs[f]).show();
		}
	},
	cssReadonly : function(elems) {
		var styles = {
			'cursor' : 'not-allowed',
			'background-color' : '#eee',
			'opacity' : '1'
		};
		for (e in elems) {
			$(elems[e]).css(styles);
		}
	},
	now : function() {
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth() + 1;
		var yyyy = today.getFullYear();

		if (dd < 10) {
			dd = '0' + dd
		}

		if (mm < 10) {
			mm = '0' + mm
		}

		today = dd + '/' + mm + '/' + yyyy;

		return today;
	},
	reloadOptions : function() {
		if ($('[name=sol_ex_cliente]:checked').val() == 'sim' || $('[name=_sol_ex_cliente]:checked').val() == 'sim') {
			$('#dados_cliente').removeClass('hide');
		}
		
		if ($('[name=lid_inconsistencia]:checked').val() == 'nao' || $('[name=_lid_inconsistencia]:checked').val() == 'nao') {
			$('#div_tipo_acao').removeClass('hide');
			$('#div_urgencia').removeClass('hide');
		}
		
		if ($('input[name=pmo_inconsistencia]:checked').val() == 'nao' || $('input[name=_pmo_inconsistencia]:checked').val() == 'nao') {
			$('#pmo_sem_inconsistencia').removeClass('hide');
		}
	},
	hideAsterisk: function() {
		$('.is-required').each(function() {
			$(this).toggle();
		});
	},
	setActiveDiv : function(divElement) {
		divElement.addClass('active');
	},
	addDefaultOption: function(select) {
		select.prepend('<option value=\'\'>Selecione</option>');
		select.val('');
	}
};