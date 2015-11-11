function enableFields(form){
	var numActivity = getValue("WKNumState");
	if(numActivity == "2" || numActivity == "3" || numActivity == "4" || numActivity == "5"|| numActivity == "7"){
		form.setEnabled("name",false);
		form.setEnabled("description",false);
		form.setEnabled("formulaDescription",false);
		form.setEnabled("periodicity",false);
		form.setEnabled("goalType",false);
		form.setEnabled("goal",false);
		form.setEnabled("bestGoal",false);
		form.setEnabled("startDate",false);
		form.setEnabled("finishDate",false);
		form.setEnabled("txtAppointmentUserId",false);
		form.setEnabled("txtAppointmentUserName",false);
		form.setEnabled("txtIndicatorManagerId",false);
		form.setEnabled("txtIndicatorManagerName",false);
	}
	if(numActivity == "6"){
		form.setEnabled("periodicity",false);
		form.setEnabled("goalType",false);
		form.setEnabled("startDate",false);
		form.setEnabled("txtAppointmentUserId",true);
		form.setEnabled("txtAppointmentUserName",true);
		form.setEnabled("txtIndicatorManagerId",true);
		form.setEnabled("txtIndicatorManagerName",true);
	}
	if(numActivity == "3"){
		var index = getIndex(form);
		index.sort();
	}
}