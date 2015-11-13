<#import "/wcm.ftl" as wcm/>
<@wcm.header authenticated="true"/>

<style>
.row + .row{ margin-top: 10px; }
</style>

<!-- WCM Wrapper content -->
<div class="wcm-wrapper-content">
    <!-- Wrapper -->
    <div class="wcm-all-content" style="padding-left:0px">
        <div id="wcm-content" class="clearfix wcm-background">
			<div class="fluig-style-guide" style="margin-bottom:50px">
				<div class="row">
					<div class="col-sm-12 col-md-8">
						<div class="row">											
							<div class="col-xs-12 editable-slot">
								<@wcm.renderSlot id="SlotA" editableSlot="true" decorator="false"/>
							</div>
							
							<div class="col-xs-12 editable-slot">
								<@wcm.renderSlot id="SlotB" editableSlot="true" decorator="false"/>
							</div>							
						</div>
					</div>
					
					<div class="col-sm-12 col-md-4">
						<div class="row">
							<div class="col-xs-12 editable-slot">
								<@wcm.renderSlot id="SlotC" editableSlot="true" decorator="false"/>
							</div>
							
							<div class="col-xs-12 editable-slot">
								<@wcm.renderSlot id="SlotD" editableSlot="true" decorator="false"/>
							</div>
						</div>
					</div>
				</div>
				
				<div class="row">
					<div class="col-xs-12 editable-slot">
						<@wcm.renderSlot id="SlotE" editableSlot="true" decorator="false"/>
					</div>
				</div>
            </div>
<!--             <@wcm.footer layoutuserlabel="wcm.layoutdefault.user" /> -->
        </div>
    </div>
</div>