var applicationCodeObj = SuperWidget.extend({
	instanceId: null,
	sociableId: null,
	divContainerElement: null,
	identification: 'applicationCodeObj_',
	
	init: function() {
		var $this = this;
		
		$this.csClearInterface();

		if ($this.getContext().hasClass('is_view')) {
			$this.LoadGraphics(
				$('#PA_ms_colleague', $this.getContext()).val(), 
				$("#PA_titulo", $this.getContext()).val(), 
				$("#PA_subtitulo", $this.getContext()).val(), 
				$("#PA_tipo", $this.getContext()).val(),
				$("#PA_estilo", $this.getContext()).val()
			);
		}
		
		if ($this.getContext().hasClass('is_edit')) {
			
			$('.datepicker', $this.getContext()).datepicker();
			
			// Inclui mascara nos campos de data 
			var mensagemPlaceholder = "DD/MM/YYYY";
		  	
		  	$(".maskDate", $this.getContext()).each(function() {
		  		var $this = $(this);
		  		var valor = $this.val().trim();
		  		
		  		if (valor == '') {
		  			$this.val(mensagemPlaceholder);
		  		}
		  		
		  		$this.bind({
			  		'blur': function() {
			  			if ($this.val().trim() == "") {
			  				$this.val(mensagemPlaceholder);
			  			}
			  		},
			  		'focus': function() {
			  			if ($this.val() == mensagemPlaceholder) {
			  				$this.val("");
			  			}
			  		}
			  	});
		  	});
		  	
		  	$("#cbo_tipo", $this.getContext()).change(function() {
		  		if ( $(this).val() == "lista" ) {
		  			$("#td_grafico_por_status").hide();
		  		} else {
		  			$("#td_grafico_por_status").show();
		  		}
		  	});
		  	
			
			$this.LoadEditPage();
		}
    },
    
    /**
	 * Load Edit Page
	 */
	LoadEditPage: function() {
		var $this = this;
		
		// Carregar Usuários no Select Option
		$this.LoadFluigUser();
		
		//$('#txt_titulo', $this.getContext()).val( $('#PA_titulo', $this.getContext()).val() );
		//$('#txt_subtitulo', $this.getContext()).val( $('#PA_subtitulo', $this.getContext()).val() );
		
		
		//$("#por_status", $this.getContext()).attr("checked", $("#PA_por_status", $this.getContext()).val());
		
		//$('#txt_dataIni', $this.getContext()).val( $('#PA_txt_dataIni', $this.getContext()).val() );
		//$('#txt_dataFim', $this.getContext()).val( $('#PA_txt_dataFim', $this.getContext()).val() );
		
		
		$('#previsualizar_grafico', $this.getContext()).click(function() {
			
			
			
			if ( $("#cbo_ms_colleague", $this.getContext()).val() == "" || $("#cbo_tipo", $this.getContext()).val() == "" ) {
				WCMC.messageInfo("É preciso selecionar um Usuário e um Tipo para gerar o Gráfico.");	
			} else if ( $("#txt_dataIni", $this.getContext()).val().replace("DD/MM/YYYY", "").trim() == "" || $("#txt_dataFim", $this.getContext()).val().replace("DD/MM/YYYY", "").trim() == "" ) {
				WCMC.messageInfo("É preciso preencher uma data inicial e final gerar o Gráfico.");
			} else {
				$this.LoadGraphics( 
					$("#cbo_ms_colleague").multipleSelect("getSelects").join(","), 
					$('#txt_titulo', $this.getContext()).val(), 
					$('#txt_subtitulo', $this.getContext()).val(), 
					$("#cbo_tipo", $this.getContext()).val(), 
					$("#cbo_estilo", $this.getContext()).val()
				);
			}
        });
		
		// Carrega a função que transforma o select option em Multiple Selection
		$this.LoadMultipleSelect();
	},
    
    
    /**
	 * Load Colleague - Multiple Select
	 */
	LoadMultipleSelect: function() {
		var $this = this;

		// Carrega Plugin Multiple Select
		
		$('#cbo_ms_colleague', $this.getContext()).change(function() {
	        //console.log($(this).val());
	    }).multipleSelect({
            placeholder: "Selecione..."
        });

		var filtro_usuarios = $("#filtro_usuarios", $this.getContext()).val().split(",");

		if ( filtro_usuarios != "" ) {
			$('#cbo_ms_colleague', $this.getContext()).multipleSelect("setSelects", filtro_usuarios);
		} else {
			$('#cbo_ms_colleague', $this.getContext()).change(function() {
		        //console.log($(this).val());
		    }).multipleSelect().multipleSelect("checkAll");
		}

		// Código usando para retornar o código dos itens selecionados.
		// $("#ms_colleague").multipleSelect("getSelects"));
		
		// Código usado para retornar a descrição dos itens selecionados.
        // $("#ms_colleague").multipleSelect("getSelects", "text"));
	},
	/**
	 * Bindings
	 */
	bindings: {
		local: {
			'cssave': ['click_csSave']
		}
	},
	
	/**
	 * Call Function to remove Title
	 */
	LoadFluigUser: function() {
		var $this = this;
		
		var cst_1 = DatasetFactory.createConstraint("active", true, true, ConstraintType.MUST);
		var constraints = new Array(cst_1);
		
		var ds_Colleagues = DatasetFactory.getDataset("colleague", null, constraints, null);
		var select = $('#cbo_ms_colleague', $this.getContext());
		
		$.each(ds_Colleagues.values, function(key, text) {
		    var option = new Option(text["colleagueName"], text["colleaguePK.colleagueId"]);
		    select.append($(option));
		});

	},
	
	
	/**
	 * Call Function to remove Title
	 */
	csClearInterface: function() {
		var $this = this;
		$this.csRemoveItem("wcm_title_widget");
	},
	
	/**
	 * Remove Title
	 */
	csRemoveItem: function(classe) {		
		var $this = this;
		var divPai = $("#wcm_widget_" + $this.instanceId);
		
		$('div', divPai).each(function(key, value) {
			value = $(value);
			if (value.is('[class]') && value.attr('class') == classe) {
				value.css('display', 'none');
			}
		});
	},
	
	/**
	 * Search Data To create the specific Graph
	 */
	SearchData: function (usuarios){
		
		var $this = this;
		var All_Objects = new Array();
		var fields = null;
		
		if ( $this.getContext().hasClass('is_view') ) {
			fields = [	
			          	usuarios,
			            $("#PA_txt_dataIni", $this.getContext()).val().replace("DD/MM/YYYY", ""), 
				        $("#PA_txt_dataFim", $this.getContext()).val().replace("DD/MM/YYYY", "")
				     ];
		} else if ( $this.getContext().hasClass('is_edit') ){
			fields = [	
			          	usuarios,
			            $("#txt_dataIni", $this.getContext()).val().replace("DD/MM/YYYY", ""), 
				        $("#txt_dataFim", $this.getContext()).val().replace("DD/MM/YYYY", "")
				     ];
		}
		

		if ( $("#por_status", $this.getContext()).is(":checked") || $("#PA_por_status", $this.getContext()).val() == "por_status" ) {
			var ds_exib_PA = DatasetFactory.getDataset("Rel_PA_Status", fields, null, null);
			
			var Status_PA = new Array();
			var Quantidade_PA = new Array();
			var Pie_Resp_Qtt_PA = new Array();
			
			$.each(ds_exib_PA.values, function(key, text) {
				Status_PA.push(text.Status);
				Quantidade_PA.push(text.Quantidade);
				Pie_Resp_Qtt_PA.push( [text.Status, text.Quantidade] );
			});
			
			All_Objects.push( Status_PA, Quantidade_PA, Pie_Resp_Qtt_PA );
			
		} else {
			var ds_exib_PA = DatasetFactory.getDataset("Rel_PA_Pessoa", fields, null, null);
			
			var Resp_PA = new Array();
			var Quantidade_PA = new Array();
			var Pie_Resp_Qtt_PA = new Array();
			
			$.each(ds_exib_PA.values, function(key, text) {
				Resp_PA.push(text.Resp_PA);
				Quantidade_PA.push(text.Quantidade);
				Pie_Resp_Qtt_PA.push( [text.Resp_PA, text.Quantidade] );
			});
			
			All_Objects.push( Resp_PA, Quantidade_PA, Pie_Resp_Qtt_PA );
		}
		
		return All_Objects;
		
	},
	
	
	/**
	 * Load CUSTOM Graphics
	 */
	LoadGraphics: function(usuarios, titulo, descricao, tipo, estilo) {
		var $this = this;

		var obj_estilo = null;
		var customChart = {};
		var customYAxis = null;
		var customPlotOptions = {};
		var customTooltip = null;
		var customLegend = {};
		var customSeries = null;
		
		var Resp_PA = new Array();
		var Quantidade_PA = new Array();
		var Pie_Resp_Qtt_PA = new Array();
		
		// SEARCH DATA TO CREATE SPECIFIC GRAPH
		var All_Objects = $this.SearchData(usuarios);
		
		Resp_PA = All_Objects[0];
		Quantidade_PA = All_Objects[1]; 
		Pie_Resp_Qtt_PA = All_Objects[2];

		if ( estilo != "" ) {
			switch (estilo) {
			case "azul_gradiente":
				obj_estilo = 
					{
			        	linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
			            stops: [
			                [0, '#FFFFFF'],
			             	[1, '#E6E6FF']
			            ]
					};
				break;
			case "cinza_gradiente":
				obj_estilo = 
					{
			        	linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
			            stops: [
			                [0, 'rgb(255, 255, 255)'],
			             	[1, '#CFCFCF']
			            ]
					};
				break;
			case "marrom_gradiente":
				obj_estilo = 
					{
			        	linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
			            stops: [
			                [0, '#FFFFFF'],
			             	[1, '#E08566']
			            ]
					};
				break;
			case "verde_gradiente":
				obj_estilo = 
					{
			        	linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
			            stops: [
			                [0, 'rgb(255, 255, 255)'],
			             	[1, '#D1FFD1']
			            ]
					};
				break;
			case "amarelo_gradiente":
				obj_estilo = 
					{
			        	linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
			            stops: [
			                [0, 'rgb(255, 255, 255)'],
			             	[1, '#FFFFC2']
			            ]
					};
				break;
			default:
				break;
			}
		}

		switch(tipo) {
		    case "colunas":
		    	
		    	customChart = {
		    		type: 'column', 
		    		backgroundColor: obj_estilo
		    	};
		    	
		    	customYAxis = {
	                min: 0,
	                allowDecimals: false,
	                title: {
	                    text: 'Quantidade'
	                }
		        };
		    	
		    	customLegend = {
	    		};
		    	
		    	customPlotOptions = {
	                column: {
	                    pointPadding: 0.2,
	                    borderWidth: 0
	                }
	            };
		    	
		    	customTooltip = {
	                formatter: function () {
	                    return '<b>' + this.point.y + ' Solicitações' +  '</b>';
	                }
		        };
		    	
		    	customSeries = [{
		    		data: Resp_PA,
		    		showInLegend: false
		    	}, {
		    		name: 'Quantidade de Solicitações',
		    		data: Quantidade_PA,
		    		color: "#7cb5ec"
		    	}];
		    	
		    	$this.ShowGraph(customChart, titulo, descricao, Resp_PA, customYAxis, customPlotOptions, customTooltip, customLegend, customSeries);
		    	
		        break;
		    case "lista":
		    	var Rel_linhas = [];
				var Rel_colunas = [];
				var vAOColumns = [];
				
				var definirColunas = {
					cdPlanoAcao	: "Código PA",
					status : "Status",
					nmResponsavel : "Resp. PA",
					dsAtividade	: "Desc. do PA",
					cdAtividadePA : "Ativ. PA",
					nmResponsavelPA : "Resp. APA",
					nmOquCom : "O que/Como",
					nmPrazoDeConclusao : "Prazo",
					Fake_nmPrazoDeConclusao : "Prazo",
					dtConclusaoReal	: "Entrega Real"
				};

				var cst_1 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
				var constraints = new Array(cst_1);
			
				var dtsRelatorio = DatasetFactory.getDataset("ecm_kgq_atividadepa", null, constraints, null);
				var Exibir_coluna = 0;
				
				for(var col = 0; col < dtsRelatorio.columns.length; col++ ) {
					if (definirColunas.hasOwnProperty( dtsRelatorio.columns[col] )) {
						Rel_colunas.push({ "title": dtsRelatorio.columns[col] });
						Exibir_coluna++;
					}
				}
				
				for (var linha = 0; linha < dtsRelatorio.values.length; linha++ ){
					var linhaDinamica = [];
					for (var i = 0; i < Rel_colunas.length; i++) {
						var nomeDaColuna = Rel_colunas[i].title;
						linhaDinamica.push( dtsRelatorio.values[linha][nomeDaColuna] );
						
						if (nomeDaColuna == 'nmPrazoDeConclusao') {
							linhaDinamica.push( dtsRelatorio.values[linha][nomeDaColuna].split('/').reverse().join('') );
						}
					}
					Rel_linhas.push(linhaDinamica);
				}
				
				// substituindo os nomes das colunas
				
				for (var i = 0; i < Rel_colunas.length; i++) {
					var nome = Rel_colunas[i].title;
					Rel_colunas[i].title = definirColunas[ Rel_colunas[i].title ];
					
					if (nome == 'nmPrazoDeConclusao') {						
						Rel_colunas.push({title: definirColunas.Fake_nmPrazoDeConclusao});
						
						vAOColumns.push({ 
							"sTitle": Rel_colunas[i].title,
							"iDataSort": 6
						});
						
						vAOColumns.push({ 
							"sTitle": definirColunas.Fake_nmPrazoDeConclusao,
							"bVisible": false
						});						
					}
					else {
						vAOColumns.push({ 
							'sTitle': Rel_colunas[i].title
						});
					}
				}

				vAOColumns.pop();

				$( $this.ActivePage() , $this.getContext()).html( '<table cellpadding="0" cellspacing="0" border="0" class="display" style="font-size: 14px;" id="dados_relatorio"></table>' );
 
			    $('#dados_relatorio', $this.getContext()).dataTable( {
			        "data": Rel_linhas,
			        "columns": Rel_colunas,
					"aoColumns": vAOColumns,
			        'sDom': 'T<"clear">Rlfrtip',
			        'tableTools': {
			            'sSwfPath': "http://cdn.datatables.net/tabletools/2.2.2/swf/copy_csv_xls_pdf.swf",
						"aButtons": [
							{
								"sExtends":     "copy",
								"sButtonText": "Copiar"
							},
							
							{
								"sExtends":     "csv",
								"sButtonText": "Exportar CSV"
							},
							
							{
								"sExtends":     "xls",
								"sButtonText": "Exportar XLS"
							},
							
							{
								"sExtends":     "pdf",
								"sButtonText": "Exportar PDF",
								"sPdfOrientation": "landscape",
								"mColumns": "visible"
							},
							
							{
								"sExtends":     "print",
								"sButtonText": "Imprimir"
							}
						]
			        },
			        "aLengthMenu": [[100, 50, 30, 10, -1], [100, 50, 30, 10, "Tudo"]],
			        "language": {
						"sEmptyTable": "Nenhum registro encontrado",
						"sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
						"sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
						"sInfoFiltered": "(Filtrados de _MAX_ registros)",
						"sInfoPostFix": "",
						"sInfoThousands": ".",
						"sLengthMenu": "_MENU_ resultados por página",
						"sLoadingRecords": "Carregando...",
						"sProcessing": "Processando...",
						"sZeroRecords": "Nenhum registro encontrado",
						"sSearch": "Pesquisar",
						"oPaginate": {
							"sNext": "Próximo",
							"sPrevious": "Anterior",
							"sFirst": "Primeiro",
							"sLast": "Último"
						},
						"oAria": {
							"sSortAscending": ": Ordenar colunas de forma ascendente",
							"sSortDescending": ": Ordenar colunas de forma descendente"
						}
					}
				});
		        
		    	break;
		    case "pizza":
		    	
		    	customChart = {
	                plotBackgroundColor: null,
	                plotBorderWidth: null,//1
	                plotShadow: false,
	                backgroundColor: obj_estilo
	            };
		    	
		    	customTooltip = {
		            pointFormat: '{series.name}: {point.y} <b>({point.percentage:.0f} %)</b>'
		        };
		    	
		    	customPlotOptions = {
		            pie: {
		                allowPointSelect: true,
		                cursor: 'pointer',
		                dataLabels: {
		                    enabled: true,
		                    format: '<b>{point.name}</b>: {point.percentage:.0f} %',
		                    style: {
		                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
		                    }
		                }
		            }
		        };
		    	
		    	customSeries = [{
		            type: 'pie',
		            name: 'Quantidade',
		            data: Pie_Resp_Qtt_PA
		        }];
		    	
		    	$this.ShowGraph(customChart, titulo, descricao, Resp_PA, customYAxis, customPlotOptions, customTooltip, customLegend, customSeries);
		    	
		    	break;
		    default:
	        	"";
		}
		
	},
	
	/**
	 * Return the Active Page   
	 */
	ActivePage: function() {
		var $this = this;
		var Div_id = "";
		
		if ($('#View_container', $this.getContext()).is("[id]")) {
			$("#View_container", $this.getContext()).show();
			Div_id = "#View_container";
		}
		
		if ($('#Edit_container', $this.getContext()).is("[id]")) {
			$("#Edit_container", $this.getContext()).show();
			
			Div_id = "#Edit_container";	
		}
		
		return Div_id;
	},
	
	/**
	 * Show Graph  
	 */
	ShowGraph: function (customChart, titulo, descricao, Resp_PA, customYAxis, customPlotOptions, customTooltip, customLegend, customSeries) {
		var $this = this;
		var Div_id = $this.ActivePage();
		$this.CreateGraph(Div_id, customChart, titulo, descricao, Resp_PA, customYAxis, customPlotOptions, customTooltip, customLegend, customSeries)
	},
	
	/**
	 * Create Graph about Indicadores - Totally custom 
	 */
	CreateGraph: function(Div_id, customChart, titulo, descricao, Resp_PA, customYAxis, customPlotOptions, customTooltip, customLegend, customSeries) {
		var $this = this;
		
		/* Criação Dinâmica dos Gráficos */
		$(Div_id, $this.getContext()).highcharts({
			credits: {
			  enabled: false
			},
			chart: customChart,
			title: {
				text: titulo
			},
			subtitle: {
				text: descricao
			},
			xAxis: [{
				categories: Resp_PA
			}],
			yAxis: customYAxis,
			tooltip: customTooltip,
	        plotOptions: customPlotOptions,
			legend: customLegend,
			series: customSeries
		});
	},

	
	/**
	 * Get Quality Report 's div container to limit scope of instance
	 */
	getContext: function() {
		if (this.divContainerElement === null) {
			this.divContainerElement = $("#applicationCodeObj_" + this.instanceId);
		}
		return this.divContainerElement;
	},
	
	/**
	 * Save the widget configuration
	 */
	csSave: function(element, event) {			
		var $this = this;
		var isChecked = $("#por_status", $this.getContext()).is(":checked");
		var cbo_colleague = $("#cbo_ms_colleague", $this.getContext()).val().join(",");
		
		var result = WCMSpaceAPI.PageService.UPDATEPREFERENCES({ async:false }, this.instanceId, {
			cbo_ms_colleague: 	 cbo_colleague,
			cbo_tipo: 			 $("#cbo_tipo", $this.getContext()).val(),
			cbo_estilo: 		 $("#cbo_estilo", $this.getContext()).val(),
			txt_titulo: 	 	 $("#txt_titulo", $this.getContext()).val(),
			txt_subtitulo: 		 $("#txt_subtitulo", $this.getContext()).val(),
			txt_dataIni: 		 $("#txt_dataIni", $this.getContext()).val(),
			txt_dataFim: 		 $("#txt_dataFim", $this.getContext()).val(),
			por_status: 		 isChecked ? $("#por_status", $this.getContext()).val() : ''
		});
		
	    if (result) {
	        WCMC.messageInfo(result.message);
	    } else {
	    	WCMC.messageError("${i18n.getTranslation('Relatorio_Plano_Acao.save.error')}");
	    }
	}

});
