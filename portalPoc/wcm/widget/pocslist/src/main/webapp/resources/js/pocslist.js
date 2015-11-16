var pocslist = SuperWidget.extend({
	context: null,
	documentList: {},
	
	datatable: null,
	
    editMode: false,
    viewMode: false,
    
    init: function() {
    	if (this.viewMode) {
    		this.setViewConfiguration();
    	}
    },
    
    bindings: {
        local: {
        	"openmodal": ["click_openModal"]
        },
        global: {}
    },
    
    getContext: function() {
    	if (this.context == null) {
    		this.context = $("#pocslist_" + this.instanceId);
    	}
    	return this.context;
    },
    
    getDocumentList: function(folderId) {
    	var _this = this;
    	
    	if (_this.documentList.hasOwnProperty(folderId)) {
    		return _this.documentList[folderId];
    	}
    	
    	$.ajax({
    		async: false,
    		success: function(data) {
    			var dados = data.content;
    			
    			$.each(dados, function(k, obj) {
    				$.get("/api/public/ecm/document/downloadURL/" + obj.id, function(d) {
    					obj.url = d.content;
    				});
    			});
    			
    			dados.sort(function(a, b) {
    				return (a.description > b.description);
    			});
    			_this.documentList[folderId] = dados;
    		},
    		type: "GET",
    		url: "/api/public/ecm/document/listDocument/" + folderId
    	});
    	
    	return _this.documentList[folderId];
    },
    
    getPOCsList: function() {
    	var _this = this;
    	var pocs = [];
    	
    	$("body").append( $("<script>", {src:"/webdesk/vcXMLRPC.js"}) );
    	
    	var constraint = [
            DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.SHOULD)
        ];
    	var ds = (DatasetFactory.getDataset("cadastro_de_pocs", null, constraint, null)).values;  
    	
    	for (var i in ds) {
    		var e = ds[i];
    		var btn = $("<div>").append($("<a>", {
				"type": "button",
				"class": "btn btn-default",
				"text": "Solicitar POC",
				"href": "http://spod1536:8080/portal/p/dev/pageworkflowview?processID=hc_solicitacao_demanda"
			})[0]);
    		
    		pocs.push({
    			"showmore": "",
    			"clientname": e.clientname,
    			"description": e.description,
    			"foldergallery": e.foldergallery,
    			"startdate": e.startdate,
    			"enddate": e.enddate,
    			"startprocess": '<a class="btn btn-success" data-solicitar>Solicitar</a>',
    			"folderdata": _this.getDocumentList(e.foldergallery)
    		});
    	}
    	return pocs;
    },
    
    openModal: function(el, ev) {
    	var _this = this;
    	var folderId = parseInt( $(el).attr("data-folderid") );
    	
    	FLUIGC.modal({
    	    title: 'Galeria de imagens',
    	    content: {
    	        widgetCode: 'pocslist', 
    	        ftl: 'gallery.ftl',
    	        data: {}
    	    },
    	    id: 'gallery-modal',
    	    actions: []
    	}, function(err, data) {
    		if (!err) {
    			var images = [];
    			$.each(_this.documentList[folderId], function(k, obj) {
    				images.push({
    					src: obj.url,
    					alt: obj.description,
    					title: obj.description
    				});
    			});
		           
				var settings = {
					id: 'myCarousel',
					images: images,
					indicators: true,
					startIndex: 0,
					interval: 5000
				};
				var carousel = FLUIGC.carousel('#carousel-poc-gallery', settings);
    		}
    	});
    },
    
    setViewConfiguration: function() {
    	var _this = this;
    	var pocs = _this.getPOCsList();
    	
    	_this.datatableDetails = function(obj) {
    		var _html = "";
    		// load template
    		$.ajax({
    			async: false,
    			success: function(html) {
    				_html = $(html);
    				_html.find("[data-description]").text(obj.description);
    				
    				if (obj.folderdata.length > 0) {
    					var $img = $("<img>", {
    						"class": "img-responsive",
    						"src": obj.folderdata[0].url,
    						"data-openmodal": "",
    						"data-folderid": obj.foldergallery
    					});
    					_html.find("[data-image]").append($img);
    				}    				
    			},
    			type: "GET",
    			url: "/pocslist/resources/css/datatabledetails.html",
    		});
    		
    		return _html[0];
    	};
    	
    	_this.datatableSelector = $("table", _this.getContext());
    	
    	_this.datatable = _this.datatableSelector.DataTable({
    		aaSorting: [[ 1, "asc" ]],
    		data: pocs,
    		columns: [{
                "className": 'details-control',
                "orderable": false,
                "data": null,
                "defaultContent": '',
                "width": "5%"
            },{
    			"title": "Cliente",
    			"data": "clientname",
    			"width": "50%"
    		},{
    			"title": "Início",
    			"data": "startdate",
    			"width": "15%"
    		},{
    			"title": "Término",
    			"data": "enddate",
    			"width": "15%"
    		},{
    			"title": "",
    			"data": "startprocess",
    			"orderable": false,
    			"type": "html-num",
    			"width": "5%"
    		}],
    		language: {
    			"sEmptyTable" : "Nenhum registro encontrado",
    			"sInfo" : "Mostrando de _START_ até _END_ de _TOTAL_ registros",
    			"sInfoEmpty" : "Mostrando 0 até 0 de 0 registros",
    			"sInfoFiltered" : "(Filtrados de _MAX_ registros)",
    			"sInfoPostFix" : "",
    			"sInfoThousands" : ".",
    			"sLengthMenu" : "_MENU_ resultados por página",
    			"sLoadingRecords" : "Carregando...",
    			"sProcessing" : "Processando...",
    			"sZeroRecords" : "Nenhum registro encontrado",
    			"sSearch" : "Pesquisar",
    			"oPaginate" : {
    				"sNext" : "Próximo",
    				"sPrevious" : "Anterior",
    				"sFirst" : "Primeiro",
    				"sLast" : "Último"
    			},
    			"oAria" : {
    				"sSortAscending" : ": Ordenar colunas de forma ascendente",
    				"sSortDescending" : ": Ordenar colunas de forma descendente"
    			}
    		},
    	});
    	
    	_this.datatableSelector.on("click", "td.details-control", function() {
    		var tr = $(this).closest('tr');
            var row = _this.datatable.row( tr );
     
            if ( row.child.isShown() ) {
                row.child.hide();
                tr.removeClass('shown');
            }
            else {
                row.child( _this.datatableDetails(row.data()) ).show();
                tr.addClass('shown');
            }
    	});
    },
});