<#-- cria uma div para a classe wcm-widget-class -->
<div class="wcm-widget-class super-widget is_edit"
	id="applicationCodeObj_${instanceId}"
    data-params="applicationCodeObj.instance({param1: 'teste', param2: 'ok'})">

	<script type="text/javascript"  src="/webdesk/vcXMLRPC.js"></script>

	<script type="text/javascript" src="//cdn.datatables.net/1.10.2/js/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="//cdn.datatables.net/tabletools/2.2.3/js/dataTables.tableTools.min.js"></script>
	<script type="text/javascript" src="//cdn.datatables.net/colreorder/1.1.2/js/dataTables.colReorder.min.js"></script>
	<script type="text/javascript" src="//cdn.datatables.net/responsive/1.0.1/js/dataTables.responsive.min.js"></script>

	<link rel="stylesheet" type="text/css" href="//cdn.datatables.net/1.10.2/css/jquery.dataTables.min.css">
	<link rel="stylesheet" type="text/css" href="//cdn.datatables.net/responsive/1.0.1/css/dataTables.responsive.css">
	<link rel="stylesheet" type="text/css" href="//cdn.datatables.net/tabletools/2.2.3/css/dataTables.tableTools.css">
	
    <table class="form rwd-table">
		<tr>
			<td>
				<strong>
					<label for="cbo_ms_colleague">${i18n.getTranslation('Relatorio_Plano_Acao.Indicador')}</label>
				</strong>
			</td>
			<td>
				<select name="cbo_ms_colleague" id="cbo_ms_colleague" multiple="multiple">
		        </select>
			</td>
			<td>
				<label for="cbo_tipo">
					<strong>${i18n.getTranslation('Relatorio_Plano_Acao.Tipo')}</strong>
				</label>			
			</td>
			<td>
				<select name="cbo_tipo" id="cbo_tipo" class="ms-choice" style="font-size: 12px;">
			      	<option value=""    	<#if cbo_tipo! == ''>selected</#if>    		>${i18n.getTranslation('Relatorio_Plano_Acao.Select_Default')}</option>
			      	<option value="colunas" <#if cbo_tipo! == 'colunas'>selected</#if>  >${i18n.getTranslation('Relatorio_Plano_Acao.Select_Colunas')}</option>
			      	<option value="lista"	<#if cbo_tipo! == 'lista'>selected</#if>    >${i18n.getTranslation('Relatorio_Plano_Acao.Select_Lista')}</option>
			      	<option value="pizza"	<#if cbo_tipo! == 'pizza'>selected</#if>    >${i18n.getTranslation('Relatorio_Plano_Acao.Select_Pizza')}</option>
			    </select>			
			</td>
			<td>
				<label for="cbo_tipo">
					<strong>${i18n.getTranslation('Relatorio_Plano_Acao.Estilo')}</strong>
				</label>			
			</td>
			<td>
				<select name="cbo_estilo" id="cbo_estilo" class="ms-choice" style="font-size: 12px;">
			      	<option value=""    				<#if cbo_estilo! == ''>selected</#if>    >${i18n.getTranslation('Relatorio_Plano_Acao.Select_Default')}</option>
			      	<option value="azul_gradiente"		<#if cbo_estilo! == 'azul_gradiente'>selected</#if>    >${i18n.getTranslation('Relatorio_Plano_Acao.Estilo_Azul_gra')}</option>
			      	<option value="cinza_gradiente"		<#if cbo_estilo! == 'cinza_gradiente'>selected</#if>    >${i18n.getTranslation('Relatorio_Plano_Acao.Estilo_Cinza_gra')}</option>
			      	<option value="marrom_gradiente" 	<#if cbo_estilo! == 'marrom_gradiente'>selected</#if>   >${i18n.getTranslation('Relatorio_Plano_Acao.Estilo_Marrom_gra')}</option>
			      	<option value="verde_gradiente"  	<#if cbo_estilo! == 'verde_gradiente'>selected</#if>   >${i18n.getTranslation('Relatorio_Plano_Acao.Estilo_Verde_gra')}</option>
			      	<option value="amarelo_gradiente" 	<#if cbo_estilo! == 'amarelo_gradiente'>selected</#if>  >${i18n.getTranslation('Relatorio_Plano_Acao.Estilo_Amarelo_gra')}</option>
			    </select>			
			</td>
			<td></td>
		</tr>
		<tr>
			<td>
				<label for="txt_titulo">
					<strong>${i18n.getTranslation('Relatorio_Plano_Acao.Titulo')}</strong>
				</label>			
			</td>
			<td>
				<input type="text" value="${txt_titulo!''}" id="txt_titulo" name="txt_titulo" class="ms-choice" style="cursor: text !important;">			
			</td>
			<td>
				<label for="txt_subtitulo">
					<strong>${i18n.getTranslation('Relatorio_Plano_Acao.SubTitulo')}</strong>
				</label>			
			</td>
			<td>
				<input type="text" value="${txt_subtitulo!''}" id="txt_subtitulo" name="txt_subtitulo" class="ms-choice" style="cursor: text !important;">			
			</td>
			<td></td>
		</tr>
		<tr>
			<td>
				<label for="txt_dataIni">
					<strong>${i18n.getTranslation('Relatorio_Plano_Acao.DataIni')}</strong>
				</label>			
			</td>
			<td>
				<input type="text" value="${txt_dataIni!''}" id="txt_dataIni" name="txt_dataIni" class="ms-choice maskDate" style="cursor: text !important;">			
			</td>
			<td>
				<label for="txt_dataFim">
					<strong>${i18n.getTranslation('Relatorio_Plano_Acao.DataFim')}</strong>
				</label>			
			</td>
			<td>
				<input type="text" value="${txt_dataFim!''}" id="txt_dataFim" name="txt_dataFim" class="ms-choice maskDate" style="cursor: text !important;">			
			</td>
			<td colspan="2" id="td_grafico_por_status">
				<input type="checkbox" id="por_status" name="por_status" value="por_status" <#if por_status! == 'por_status'>checked</#if>>
				<strong>${i18n.getTranslation('Relatorio_Plano_Acao.Grafico_Por_Status')}</strong>
			</td>
		</tr>
		<tr>
			<td colspan="2">
				<input type="button" value="${i18n.getTranslation('Relatorio_Plano_Acao.PreVisualizar_Grafico')}" id="previsualizar_grafico" name="previsualizar_grafico" class="btn-ui btn-action" style="font-size: 12px;">
			</td>
			<td colspan="2">
				<input type="button" value="${i18n.getTranslation('Relatorio_Plano_Acao.Salvar')}" id="salvar_grafico" name="salvar_grafico" class="btn-ui btn-action" data-cssave style="font-size: 12px;">
			</td>
			<td></td>
		</tr>
	</table>
	
	<div id="Edit_container" style="display: none; min-width: 310px; min-height: 0px; max-height: 400px; max-width: 100%; margin: 0 auto; position: relative;">
	</div>
	
	<input type="hidden" name="filtro_usuarios" id="filtro_usuarios" value="${cbo_ms_colleague!''}">
    
</div>
