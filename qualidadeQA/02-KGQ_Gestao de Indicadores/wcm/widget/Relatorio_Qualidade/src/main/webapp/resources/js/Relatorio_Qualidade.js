var applicationCodeObj = SuperWidget.extend({
	instanceId: null,
	sociableId: null,
	divContainerElement: null,
	identification: 'applicationCodeObj_',
	
	init: function() {
		var $this = this;
		$this.csClearInterface();

		if ($this.getContext().hasClass('is_view')) {
			var Indicador_doc_Id 	= $("#Indicador_doc_Id", $this.getContext()).val();
			var Indicador_tipo 		= $("#Indicador_tipo", $this.getContext()).val();
			var Indicador_estilo 	= $("#Indicador_estilo", $this.getContext()).val();
			var Indicador_titulo 	= $("#Indicador_titulo", $this.getContext()).val();
			var Indicador_descricao = $("#Indicador_descricao", $this.getContext()).val();

			$this.LoadViewPage(Indicador_doc_Id, Indicador_titulo, Indicador_descricao, Indicador_tipo, Indicador_estilo);
		}
		
		if ($this.getContext().hasClass('is_edit')) {
			$this.LoadEditPage();
		}

    },
    
	bindings: {
		local: {
			'cssave': ['click_csSave']
		}
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
	 * Load View Page
	 */
	LoadViewPage: function(documentId, titulo, descricao, tipo, estilo) {
		var $this = this; 
		$this.LoadGraphics(documentId, titulo, descricao, tipo, estilo);
		
	},
	
	/**
	 * Load Edit Page
	 */
	LoadEditPage: function() {
		var $this = this;
		var Textos = $this.LoadIndicadores();	
		var indicadorCodigo = $('#Indicador_codigo', $this.getContext()).val();
		
		$('#cbo_indicador option[value="'+indicadorCodigo+'"]', $this.getContext()).attr('selected',true);

		$('#previsualziar_grafico', $this.getContext()).click(function() {
			if ($("#cbo_indicador", $this.getContext()).val() == "" || $("#cbo_tipo", $this.getContext()).val() == "" ) {
				WCMC.messageInfo("É preciso selecionar um Indicador e um Tipo para gerar o Gráfico.");	
			} else {
				$this.LoadGraphics( $("#cbo_indicador", $this.getContext()).val(), Textos.titulo, Textos.descricao, $("#cbo_tipo", $this.getContext()).val(), $("#cbo_estilo", $this.getContext()).val());
			}
        });
	},
	
	/**
	 * Load Indicadores
	 */
	LoadIndicadores: function() {
		var $this = this;
		var ds_Indicadores = DatasetFactory.getDataset("Listar_indicadores", null, null, null);
		var select = $('#cbo_indicador', $this.getContext());
		
		$.each(ds_Indicadores.values, function(key, text) {
		    var option = new Option(text.Nome_indicador + " - " + text.Meta, text.ID_Documento);
		    select.append($(option));
		    titulo = text.Nome_indicador;
		    descricao = text.Descricao;
		});
		
		$("#Indicador_titulo", $this.getContext()).val(titulo);
		$("#Indicador_descricao", $this.getContext()).val(descricao);
		
		return {titulo: titulo, descricao: descricao};
	},
	
	/**
	 * Load CUSTOM Graphics
	 */
	LoadGraphics: function(documentId, titulo, descricao, tipo, estilo) {
		var $this = this;
		var fields = new Array(documentId);
		var ds_exib_ind = DatasetFactory.getDataset("Exibir_indicador", fields, null, null);

		var META = new Array();
		var data_ind = new Array();
		var apontado_ind = new Array();
		var ocorrencia_ind = new Array();
		var obs_ind = new Array();

		$.each(ds_exib_ind.values, function(key, text) {
			META.push( parseFloat(text.goalLine.substring(0, text.goalLine.indexOf(",")).replace(".","")) );
			data_ind.push(text.data_indicador);
			apontado_ind.push(  parseFloat(text.appointmentValue.substring(0, text.appointmentValue.indexOf(",")).replace(".","")) );
			ocorrencia_ind.push(text.occurrenceNumber);
			obs_ind.push(text.obs);
		});

		var obj_estilo = null;
		var customChart = {};
		var customYAxis = null;
		var customPlotOptions = {};
		var customLegend = null;
		var customSeries = null;

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
		    	
		    	customChart = {zoomType: 'xy', backgroundColor: obj_estilo };
		    	
		    	customYAxis = [{ // Primary yAxis
		    		labels: {
		    			format: 'R$ {value}',
		    			formatter: function () {
		    				return "R$ " + Highcharts.numberFormat(this.value,0);
		    			},
		    			style: {
		    				color: Highcharts.getOptions().colors[1]
		    			}
		    		},
		    		title: {
		    			text: 'Meta',
		    			style: {
		    				color: Highcharts.getOptions().colors[1]
		    			}
		    		}
		    	}, { // Secondary yAxis
		    		title: {
		    			text: 'Apontado',
		    			style: {
		    				color: Highcharts.getOptions().colors[0]
		    			}
		    		},
		    		labels: {
		    			format: 'R$ {value}',
		    			style: {
		    				color: Highcharts.getOptions().colors[0]
		    			}
		    		},
		    		opposite: true
		    	}];
		    	
		    	customLegend = {
	    			layout: 'vertical',
	    			align: 'left',
	    			x: 0,
	    			verticalAlign: 'top',
	    			y: 0,
	    			floating: true,
	    			backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
	    		};
		    	
		    	customSeries = [{
		    		name: 'Apontado',
		    		type: 'column',
		    		data: apontado_ind
		    	}, {
		    		name: 'Meta',
		    		type: 'spline',
		    		data: META,
		    		tooltip: {
		    			valueDecimals: 2,
		    			valuePrefix: 'R$'
		    		}
		    	}];
		    	
		        break;
		    case "linhas":
		    	
		    	customChart = {backgroundColor: obj_estilo };
		    	
		    	customYAxis = {
	    			labels: {
	    				format: 'R$ {value}',
	    				formatter: function () {
	    					return "R$ " + Highcharts.numberFormat(this.value,0);
	    				},
	    				style: {
	    					color: Highcharts.getOptions().colors[1]
	    				}
	    			},
	    			title: {
	    				text: 'Meta (R$)'
	    			},
	    			plotLines: [{
	    				value: 0,
	    				width: 1,
	    				color: '#808080'
	    			}]
	    		};
		    	
		    	customLegend = {
	    			layout: 'vertical',
	    			align: 'right',
	    			verticalAlign: 'middle',
	    			borderWidth: 0
	    		};
		    	
		    	customSeries = [{
		    		name: 'Apontado',
		    		data: apontado_ind
		    	}, {
		    		name: 'Meta',
		    		type: 'spline',
		    		data: META,
		    		tooltip: {
		    			valuePrefix: 'R$ '
		    		},
		    		color: "#000"
		    	}];
		    	
		        break;
		    case "ondas":
		    	
		    	customChart = { type: 'area', backgroundColor: obj_estilo };
		    	
		    	customYAxis = [{ // Primary yAxis
		    		labels: {
		    			format: 'R$ {value}',
		    			formatter: function () {
		    				return "R$ " + Highcharts.numberFormat(this.value,0);
		    			},
		    			style: {
		    				color: Highcharts.getOptions().colors[1]
		    			}
		    		},
		    		title: {
		    			text: 'Meta',
		    			style: {
		    				color: Highcharts.getOptions().colors[1]
		    			}
		    		}
		    	}, { // Secondary yAxis
		    		title: {
		    			text: 'Apontado',
		    			style: {
		    				color: Highcharts.getOptions().colors[0]
		    			}
		    		},
		    		labels: {
		    			format: 'R$ {value}',
		    			style: {
		    				color: Highcharts.getOptions().colors[0]
		    			}
		    		},
		    		opposite: true
		    	}];
		    	
		    	customPlotOptions = {
	    			area: {
	    				marker: {
	    					enabled: false,
	    					symbol: 'circle',
	    					radius: 2,
	    					states: {
	    						hover: {
	    							enabled: true
	    						}
	    					}
	    				}
	    			}
	    		};
		    	
		    	customLegend = {
		    		layout: 'vertical',
		    		align: 'left',
		    		x: 0,
		    		verticalAlign: 'top',
		    		y: 0,
		    		floating: true,
		    		backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
		    	};
		    	
		    	customSeries = [{
		    		name: 'Apontado',
		    		data: apontado_ind,
		    		color: "#75ff7a",
		    		lineColor: '#4cfe52',
		    		index: 1,
		    		tooltip: {
		    			valueDecimals: 2,
		    			valuePrefix: 'R$'
		    		}
		    	}, {
		    		name: 'Meta',
		    		data: META,
		    		color: "#e8f2fb",
		    		lineColor: '#63a6e8',
		    		index: 0,
		    		tooltip: {
		    			valueDecimals: 2,
		    			valuePrefix: 'R$'
		    		}
		    	}];
		    	
		        break;
		    default:
	        	"";
		}
		
		var Div_id;
		
		if ($('#View_container', $this.getContext()).is("[id]")) {
			$("#View_container", $this.getContext()).show();
			Div_id = "#View_container";
		}
		
		if ($('#Edit_container', $this.getContext()).is("[id]")) {
			$("#Edit_container", $this.getContext()).show();
			
			Div_id = "#Edit_container";	
		}

		this.CreateGraph(Div_id, customChart, titulo, descricao, data_ind, customYAxis, customPlotOptions, customLegend, customSeries);
		
	},
	
	CreateGraph: function(Div_id, customChart, titulo, descricao, data_ind, customYAxis, customPlotOptions, customLegend, customSeries) {
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
				categories: data_ind
			}],
			yAxis: customYAxis,
			tooltip: {
				valuePrefix: 'R$ ',
				shared: true
			},
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
	
	csLoadRecords: function() {
		
	},

	/**
	 * Save the widget configuration
	 */
	csSave: function(element, event) {			
		var $this = this;
		var result = WCMSpaceAPI.PageService.UPDATEPREFERENCES({ async:false }, this.instanceId, {
			cbo_indicador: 		 $("#cbo_indicador", $this.getContext()).val(),
			cbo_tipo: 			 $("#cbo_tipo", $this.getContext()).val(),
			cbo_estilo: 		 $("#cbo_estilo", $this.getContext()).val(),
			Indicador_titulo: 	 $("#Indicador_titulo", $this.getContext()).val(),
			Indicador_descricao: $("#Indicador_descricao", $this.getContext()).val()
		});
		
	    if (result) {
	        WCMC.messageInfo(result.message);
	    } else {
	    	WCMC.messageError("${i18n.getTranslation('Relatorio_Qualidade.save.error')}");
	    }
	}
});
