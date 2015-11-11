function createDataset(fields, constraints, sortFields) {    
	
	var codigo = 1;
	var periodicidade = 1;
	var minhaQuery = "";
	
	
	
	/*
	if (constraints.length > 0){
	
		for (var i=0;i<constraints.length;i++){
			if (constraints[i].getFieldName() == "codigo"){
				codigo = parseInt(constraints[i].getInitialValue());
			}
			if (constraints[i].getFieldName() == "periodicidade"){
				periodicidade = parseInt(constraints[i].getInitialValue());
			}			
		}
	}
	*/
	
	if (codigo == 0){
		var newDataset = DatasetBuilder.newDataset();
		newDataset.addColumn("Erro");
		newDataset.addRow(new Array("O código do indicador não foi informado"));
		return newDataset;
	}
	
	if (periodicidade == -1){
		var newDataset = DatasetBuilder.newDataset();
		newDataset.addColumn("Erro");
		newDataset.addRow(new Array("A periodicidade não foi informada"));
		return newDataset;
	}
	
	minhaQuery = "select f.datel, f.appointmentValue, f.goalLine from " +
				" proces_workflow p, anexo_proces a, totvs_indicator_appointment f " +
				"  where a.COD_EMPRESA = p.COD_EMPRESA and " +
				" 		a.NUM_PROCES = p.NUM_PROCES and " +
				" 		a.NUM_SEQ_ANEXO = p.NUM_SEQ_ANEXO_PRINC and " +
				" 		f.nr_ficha = a.nr_documento and " +
				" 		f.nr_versao = a.nr_versao and " +
				" 		a.num_proces = " + String(codigo) + " order by sequencia ";

	var dataSource = "jdbc/FluigDS";       

	var newDataset = DatasetBuilder.newDataset();
	var ic = new javax.naming.InitialContext();
	var ds = ic.lookup(dataSource);
	var created = false;
	try {
		var conn = ds.getConnection();
		var stmt = conn.createStatement();
		var rs = stmt.executeQuery(minhaQuery);
		var columnCount = rs.getMetaData().getColumnCount();
		while(rs.next()) {
			if(!created) {
				for(var i=1;i<=columnCount; i++) {
					newDataset.addColumn(rs.getMetaData().getColumnName(i));
				}
				created = true;
			}
			var Arr = new Array();
			for(var i=1;i<=columnCount; i++) {
				var obj = rs.getObject(rs.getMetaData().getColumnName(i));
				if(null!=obj){
					
					if (rs.getMetaData().getColumnName(i).toString() == "datel"){
						Arr[i-1] = periodicityDate(periodicidade, rs.getObject(rs.getMetaData().getColumnName(i)).toString());
					}else{
						Arr[i-1] = rs.getObject(rs.getMetaData().getColumnName(i)).toString();
					}
				}
				else {
					Arr[i-1] = "null";
				}
			}
			newDataset.addRow(Arr);
		}
	} catch(e) {
		log.error("ERRO==============> " + e.message);
	} finally {
		if(stmt != null) stmt.close();
		if(conn != null) conn.close();		
	}
	return newDataset;
}

function periodicityDate(periodicity,sValue){

	var GregorianCalendar = java.util.GregorianCalendar();
	var date = new Date(sValue.split("/")[2],parseInt(sValue.split("/")[1],10)-1,sValue.split("/")[0]);

	var gc = java.util.GregorianCalendar();
	gc.setFirstDayOfWeek(GregorianCalendar.SUNDAY);
	gc.setTime(date);

	switch(periodicity){

		//Diário (case 0:) será mantido a data no formato normal...
	
		case 1: //Semanal
		{
			//sValue = gc.get(GregorianCalendar.WEEK_OF_MONTH) +"a Sem  "+ getMonthName(gc.get(GregorianCalendar.MONTH)).substring(0, 3) +"/"+ gc.get(GregorianCalendar.YEAR);
			sValue = gc.get(gc.WEEK_OF_MONTH) +"a Sem  "+ getMonthName(gc.get(gc.MONTH)).substring(0, 3) +"/"+ gc.get(gc.YEAR);

			break;
		}
		case 2: //Quinzenal
		{
			if(gc.get(GregorianCalendar.DAY_OF_MONTH) <= 15)
			{
				sValue = "1";
			}
			else
			{
				sValue = "2"; 
			}

			sValue += "a Quinz  "+ getMonthName(gc.get(GregorianCalendar.MONTH)).substring(0,3) +"/"+ gc.get(GregorianCalendar.YEAR);

			break;
		}
		case 3: //Mensal
		{
			sValue = getMonthName(gc.get(GregorianCalendar.MONTH)) +"/"+ gc.get(GregorianCalendar.YEAR);

			break;
		}
		case 4: //Bimestral
		{
				switch(gc.get(GregorianCalendar.MONTH))
				{
				case GregorianCalendar.JANUARY:
				case GregorianCalendar.FEBRUARY:
				{
					sValue = "1o ";
					break;
				}
				case GregorianCalendar.MARCH:
				case GregorianCalendar.APRIL:
				{
					sValue = "2o ";
					break;
				}
				case GregorianCalendar.MAY:
				case GregorianCalendar.JUNE:
				{
					sValue = "3o ";
					break;
				}
				case GregorianCalendar.JULY:
				case GregorianCalendar.AUGUST:
				{
					sValue = "4o ";
					break;
				}
				case GregorianCalendar.SEPTEMBER:
				case GregorianCalendar.OCTOBER:
				{
					sValue = "5o ";
					break;
				}
				case GregorianCalendar.NOVEMBER:
				case GregorianCalendar.DECEMBER:
				{
					sValue = "6o ";
					break;
				}
				}
				sValue += "Bimestre/"+ gc.get(GregorianCalendar.YEAR);

			break;
		}
		case 5: //Trimestral
		{
			switch(gc.get(GregorianCalendar.MONTH))
			{
			case GregorianCalendar.JANUARY:
			case GregorianCalendar.FEBRUARY:
			case GregorianCalendar.MARCH:
			{
				sValue = "1o ";
				break;
			}
			case GregorianCalendar.APRIL:
			case GregorianCalendar.MAY:
			case GregorianCalendar.JUNE:
			{
				sValue = "2o ";
				break;
			}
			case GregorianCalendar.JULY:
			case GregorianCalendar.AUGUST:
			case GregorianCalendar.SEPTEMBER:
			{
				sValue = "3o ";
				break;
			}
			case GregorianCalendar.OCTOBER:
			case GregorianCalendar.NOVEMBER:
			case GregorianCalendar.DECEMBER:
			{
				sValue = "4o ";
				break;
			}
			}
			sValue += "Trimestre/"+ gc.get(GregorianCalendar.YEAR);

			break;
		}
		case 6: //Semestral
		{
			if(gc.get(GregorianCalendar.MONTH) <= GregorianCalendar.JUNE)
			{
				sValue = "Semestre 1 de "+ gc.get(GregorianCalendar.YEAR);
			}
			else
			{
				sValue = "Semestre 2 de "+ gc.get(GregorianCalendar.YEAR);
			}

			break;
		}
		case 7: //Anual
		{
			sValue = String(parseInt(java.lang.String.valueOf(gc.get(GregorianCalendar.YEAR))));
		}
	}
	
	return sValue;
}


function getMonthName(month)
{
	var GregorianCalendar = java.util.GregorianCalendar();

	switch(month)
	{
	case GregorianCalendar.JANUARY:
	{
		return "Janeiro";
	}
	case GregorianCalendar.FEBRUARY:
	{
		return "Fevereiro";
	}
	case GregorianCalendar.MARCH:
	{
		return "Março";
	}
	case GregorianCalendar.APRIL:
	{
		return "Abril";
	}
	case GregorianCalendar.MAY:
	{
		return "Maio";
	}
	case GregorianCalendar.JUNE:
	{
		return "Junho";
	}
	case GregorianCalendar.JULY:
	{
		return "Julho";
	}
	case GregorianCalendar.AUGUST:
	{
		return "Agosto";
	}
	case GregorianCalendar.SEPTEMBER:
	{
		return "Setembro";
	}
	case GregorianCalendar.OCTOBER:
	{
		return "Outubro";
	}
	case GregorianCalendar.NOVEMBER:
	{
		return "Novembro";
	}
	case GregorianCalendar.DECEMBER:
	{
		return "Dezembro";
	}
	}

	return "";
}
