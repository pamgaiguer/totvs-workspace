<#import "/wcm.ftl" as wcm/>
<@wcm.header />
<!-- WCM Wrapper content -->
<div class="wcm-wrapper-content">
	<!-- Wrapper -->
	<div class="wcm-all-content" style="padding: 60ox 0 0 0">
		<div id="wcm-content" class="clearfix wcm-background">

			<!-- Onde deverá estar a barra de formatação -->
			<#if pageRender.isEditMode()=true>
			<div name="formatBar" id="formatBar"></div>
			<!-- Div geral -->
			<!-- Há CSS distinto para Edição/Visualização -->
			<div id="edicaoPagina" class="clearfix">
				<#else>
				<div id="visualizacaoPagina" class="clearfix">
					</#if>
					<div id="all-slots-top" class="layout-1-1 clearfix">
						<!-- Slot 1 - Banner Slide Show -->
						<div class="editable-slot slotfull layout-1-1" id="slotFull1">
							<@wcm.renderSlot id="SlotA" editableSlot="true"/>
						</div>
						<!-- Slot 2 - Menu Link -->
						<div class="editable-slot slotfull layout-1-1" id="slotFull2">
							<@wcm.renderSlot id="SlotB" editableSlot="true"/>
						</div>

						<div class="editable-slot slotfull layout-1-1" id="slotFull3">
							<@wcm.renderSlot id="SlotC" editableSlot="true"/>
						</div>
						
						<div class="editable-slot slotfull layout-1-1" id="slotFull4">
							<@wcm.renderSlot id="SlotD" editableSlot="true"/>
						</div>
						
						<div class="editable-slot slotfull layout-1-1" id="slotFull4">
							<@wcm.renderSlot id="SlotE" editableSlot="true"/>
						</div>
						
						<div class="editable-slot slotfull layout-1-1" id="slotFull5">
							<@wcm.renderSlot id="SlotF" editableSlot="true"/>
						</div>																		
					</div>
				</div>
				<!-- FIM DAS WIDGETS DO LAYOUT -->
			</div>
		</div>
	</div>