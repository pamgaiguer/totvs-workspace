<div class="wcm-widget-class super-widget is_view" 
	id="applicationCodeObj_${instanceId}" 
	data-params="applicationCodeObj.instance({instanceId: ${instanceId!''}})"
	>

	<script type="text/javascript" src="/webdesk/vcXMLRPC.js" data-isview></script>

	<!-- Referencias para Lista -->
	<script type="text/javascript" src="//cdn.datatables.net/1.10.2/js/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="//cdn.datatables.net/tabletools/2.2.3/js/dataTables.tableTools.min.js"></script>
	<script type="text/javascript" src="//cdn.datatables.net/colreorder/1.1.2/js/dataTables.colReorder.min.js"></script>
	<script type="text/javascript" src="//cdn.datatables.net/responsive/1.0.1/js/dataTables.responsive.min.js"></script>

	<link rel="stylesheet" type="text/css" href="//cdn.datatables.net/1.10.2/css/jquery.dataTables.min.css">
	<link rel="stylesheet" type="text/css" href="//cdn.datatables.net/responsive/1.0.1/css/dataTables.responsive.css">
	<link rel="stylesheet" type="text/css" href="//cdn.datatables.net/tabletools/2.2.3/css/dataTables.tableTools.css">
	<!-- ---------------------- -->

	<div id="View_container" style="min-width: 310px; min-height: 0px; max-height: 400pxmax-width: 100%; margin: 0 auto; position: relative;">
	</div>

	<input type="hidden" name="filtro_usuarios" id="filtro_usuarios" value="${cbo_ms_colleague!''}">
	<input type="hidden" name="PA_ms_colleague" id="PA_ms_colleague" 	value="${cbo_ms_colleague!''}">
	<input type="hidden" name="PA_tipo" 		id="PA_tipo" 			value="${cbo_tipo!''}">
	<input type="hidden" name="PA_estilo" 		id="PA_estilo" 			value="${cbo_estilo!''}">
	<input type="hidden" name="PA_titulo" 		id="PA_titulo" 			value="${txt_titulo!''}">
	<input type="hidden" name="PA_subtitulo" 	id="PA_subtitulo" 		value="${txt_subtitulo!''}">
	<input type="hidden" name="PA_txt_dataIni" 	id="PA_txt_dataIni" 	value="${txt_dataIni!''}">
	<input type="hidden" name="PA_txt_dataFim" 	id="PA_txt_dataFim" 	value="${txt_dataFim!''}">
	<input type="hidden" name="PA_por_status" 	id="PA_por_status" 		value="${por_status!''}">
	
</div>
