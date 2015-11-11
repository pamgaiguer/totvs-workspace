<#-- cria uma div para a classe wcm-widget-class -->
<div class="wcm-widget-class super-widget is_edit"
	id="applicationCodeObj_${instanceId}"
    data-params="applicationCodeObj.instance({param1: 'teste', param2: 'ok'})">

	<script type="text/javascript"  src="/webdesk/vcXMLRPC.js"></script>
    
    <table class="rwd-table">
		<tr>
			<td>
				<strong>
					<label for="cbo_indicador">${i18n.getTranslation('Relatorio_Qualidade.Indicador')}</label>
				</strong>
				</label>			
			</td>
			<td>
				<select name="cbo_indicador" id="cbo_indicador">
			      	<option value=""    <#if cbo_indicador! == ''>selected</#if>    >${i18n.getTranslation('Relatorio_Qualidade.Select_Default')}</option>
			    </select>							
			</td>
			<td>
				<label for="cbo_tipo">
				<strong>${i18n.getTranslation('Relatorio_Qualidade.Tipo')}</strong>
				</label>			
			</td>
			<td>
				<select name="cbo_tipo" id="cbo_tipo">
			      	<option value=""    	<#if cbo_tipo! == ''>selected</#if>    		>${i18n.getTranslation('Relatorio_Qualidade.Select_Default')}</option>
			      	<option value="colunas" <#if cbo_tipo! == 'colunas'>selected</#if>  >${i18n.getTranslation('Relatorio_Qualidade.Select_Colunas')}</option>
			      	<option value="linhas"	<#if cbo_tipo! == 'linhas'>selected</#if>   >${i18n.getTranslation('Relatorio_Qualidade.Select_Linhas')}</option>
			      	<option value="ondas"	<#if cbo_tipo! == 'ondas'>selected</#if>    >${i18n.getTranslation('Relatorio_Qualidade.Select_Ondas')}</option>
			    </select>			
			</td>
			<td>
				<label for="cbo_tipo">
				<strong>${i18n.getTranslation('Relatorio_Qualidade.Estilo')}</strong>
				</label>			
			</td>
			<td>
				<select name="cbo_estilo" id="cbo_estilo">
			      	<option value=""    				<#if cbo_estilo! == ''>selected</#if>    >${i18n.getTranslation('Relatorio_Qualidade.Select_Default')}</option>
			      	<option value="azul_gradiente"		<#if cbo_estilo! == 'azul_gradiente'>selected</#if>    >${i18n.getTranslation('Relatorio_Qualidade.Estilo_Azul_gra')}</option>
			      	<option value="cinza_gradiente"		<#if cbo_estilo! == 'cinza_gradiente'>selected</#if>    >${i18n.getTranslation('Relatorio_Qualidade.Estilo_Cinza_gra')}</option>
			      	<option value="marrom_gradiente" 	<#if cbo_estilo! == 'marrom_gradiente'>selected</#if>   >${i18n.getTranslation('Relatorio_Qualidade.Estilo_Marrom_gra')}</option>
			      	<option value="verde_gradiente"  	<#if cbo_estilo! == 'verde_gradiente'>selected</#if>   >${i18n.getTranslation('Relatorio_Qualidade.Estilo_Verde_gra')}</option>
			      	<option value="amarelo_gradiente" 	<#if cbo_estilo! == 'amarelo_gradiente'>selected</#if>  >${i18n.getTranslation('Relatorio_Qualidade.Estilo_Amarelo_gra')}</option>
			    </select>			
			</td>
			<td>
				<input type="button" value="${i18n.getTranslation('Relatorio_Qualidade.PreVisualizar_Grafico')}" id="previsualziar_grafico" name="previsualziar_grafico">
			</td>
			<td>
				<input type="button" value="${i18n.getTranslation('Relatorio_Qualidade.Salvar')}" id="salvar_grafico" name="salvar_grafico" data-cssave>
			</td>
		</tr>
	</table>
	
	<input type="hidden" name="Indicador_codigo" id="Indicador_codigo" value="${cbo_indicador!''}">
	<input type="hidden" name="Indicador_titulo" id="Indicador_titulo" value="${Indicador_titulo!''}">
	<input type="hidden" name="Indicador_descricao" id="Indicador_descricao" value="${Indicador_descricao!''}">
	
	<div id="Edit_container" style="display: none; min-width: 310px; min-height: 0px; max-height: 400px; max-width: 100%; margin: 0 auto; position: relative;">
	</div>
    
</div>
