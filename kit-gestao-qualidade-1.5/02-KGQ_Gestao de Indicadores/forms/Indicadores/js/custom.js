function init(){
  if(WKNumState == "3"){

    /*Se adicionar nova linha*/
    if(document.getElementById("validaFilhos").value == ""){
      var index = wdkAddChild('tabIndicadores');
      document.getElementById("index_campo").value = index;
      document.getElementById("validaFilhos").value = "true";
      document.getElementById("data_indicador___"+index).value = getNextDay();
    }else{/*Caso mantenha a linha existente*/
      var index = document.getElementById("index_campo").value;
    }

    document.getElementById("goalLine___"+index).value = document.getElementById("goal").value;
    for(var i=1;i<=index;i++){
      if(i>1){
        var j = i-1;
        document.getElementById("data_indicador___"+j).readOnly = true;
        document.getElementById("appointmentValue___"+j).readOnly = true;
        document.getElementById("goalLine___"+j).readOnly = true;
        document.getElementById("occurrenceNumber___"+j).readOnly = true;
        document.getElementById("obs___"+j).readOnly = true;
      }
      document.getElementById("data_indicador___"+i).readOnly = true;
      document.getElementById("goalLine___"+i).readOnly = true;
      document.getElementById("occurrenceNumber___"+i).readOnly = true;
    }

  }
  if(WKNumState == "4"){
    var indexFilhos = document.getElementById("index_campo").value;
    document.getElementById("validaFilhos").value = "";
    while(indexFilhos > 0){
      document.getElementById("data_indicador___"+indexFilhos).readOnly = true;
      document.getElementById("appointmentValue___"+indexFilhos).readOnly = true;
      document.getElementById("goalLine___"+indexFilhos).readOnly = true;
      document.getElementById("obs___"+indexFilhos).readOnly = true;
      indexFilhos--;
    }
  }

  if((WKNumState == "6") || (WKNumState == "7")){
    var indexFilhos = document.getElementById("index_campo").value;
    document.getElementById("validaFilhos").value = "";
    while(indexFilhos > 0){
      document.getElementById("data_indicador___"+indexFilhos).readOnly = true;
      document.getElementById("appointmentValue___"+indexFilhos).readOnly = true;
      document.getElementById("goalLine___"+indexFilhos).readOnly = true;
      document.getElementById("obs___"+indexFilhos).readOnly = true;
      document.getElementById("occurrenceNumber___"+indexFilhos).readOnly = true;
      indexFilhos--;
    }
  }
  setGreyFields();
  hideButtons();
}

function hideButtons(){
  if(WKNumState == "2" || WKNumState == "3" || WKNumState == "4" || WKNumState == "5" || WKNumState == "7"){
    document.getElementById("btFinishDate").style.display = "none";
    document.getElementById("btClearFinishDate").style.display = "none";
    document.getElementById("imgAppointmentUser").style.display = "none";
    document.getElementById("btClearUser").style.display = "none";
    document.getElementById("imgIndicatorManagerName").style.display = "none";
    document.getElementById("btClearIndicator").style.display = "none";

  }

  if(WKNumState == "2" || WKNumState == "3" || WKNumState == "4" || WKNumState == "5" || WKNumState == "6" || WKNumState == "7"){
    document.getElementById("btStartDate").style.display = "none";
    document.getElementById("btClearStartDate").style.display = "none";
    hideImg();
  }

}

function hideImg(){
  var buttons = document.getElementsByTagName("form")[0].getElementsByTagName("img");
  for(var i=0;i<buttons.length;i++){
    buttons[i].style.display = "none";
  }
}

function escondeBotoesVisualizar(){

  if(WKNumState == "2" || WKNumState == "3" || WKNumState == "4" || WKNumState == "5" || WKNumState == "6" || WKNumState == "7"){
    escondeImagens("tabIndicadores");
    escondeImagens("tudo");
    var inputs = document.getElementsByTagName("input");
    for ( var i = 0; i < inputs.length; i++) {
      if (inputs[i].type == "button")
        inputs[i].style.display = "none";
    }
    document.getElementById("fechar").style.display = "";
  }
}

function escondeImagens(elemento){
  var raiz = document.getElementById(elemento);
  var imagens = raiz.getElementsByTagName("img");
  for(var i=0;i<imagens.length;i++){
    imagens[i].style.display = "none";
  }
}

function clearFields(arguments){
  for(var i=0; i<arguments.length; i++){
    document.getElementById(arguments[i]).value='';
  }
}

function setSelectedZoomItem(selectedItem){
  if(selectedItem.type == "usuarioApurador"){
    document.getElementById("txtAppointmentUserId").value = selectedItem.Codigo;
    document.getElementById("txtAppointmentUserName").value = selectedItem.Nome;
  }
  if(selectedItem.type == "gestorIndicador"){
    document.getElementById("txtIndicatorManagerId").value = selectedItem.Codigo;
    document.getElementById("txtIndicatorManagerName").value = selectedItem.Nome;
  }
}

function Valor(v) {
  v = v.replace(/\D/g, ""); //Remove tudo o que n�o � d�gito
  v = v.replace(/^([0-9]{3}\.?){3}-[0-9]{2}$/, "$1.$2");
  //v=v.replace(/(\d{3})(\d)/g,"$1,$2")
  v=v.replace(/(\d{1})(\d{8})$/,"$1.$2");  //coloca ponto antes dos �ltimos 8 digitos
  v=v.replace(/(\d{1})(\d{5})$/,"$1.$2");  //coloca ponto antes dos �ltimos 5 digitos
  v = v.replace(/(\d)(\d{2})$/, "$1,$2"); //Coloca ponto antes dos 2 �ltimos digitos
  return v;
}

function Mascara(o, f) {
  v_obj = o;
  v_fun = f;
  setTimeout("execmascara()", 1);
}

function execmascara() {
  v_obj.value = v_fun(v_obj.value);
}

function mascaraValor(campoObj){
  Mascara(campoObj, Valor);
}

function openZoomUsuarioApurador(){
  var DATASET_ID = "totvs_indicators_getColleague";
  var DATA_FIELDS = "Codigo,"+escape("C�digo")+",Nome,Nome";
  var RESULT_FIELDS = "Codigo,Nome";
  var TYPE = "usuarioApurador";
  var TITLE = "Usu�rio Apurador";
  var FUNCAO_CONSULTA = "callbackZoomUsuarioApurador";
  abrirPesquisa(DATASET_ID, DATA_FIELDS, RESULT_FIELDS, TYPE, TITLE, FUNCAO_CONSULTA);
}

function callbackZoomUsuarioApurador(){
  var dtsValue = DatasetFactory.getDataset("colleague", null, null, null);
  if (dtsValue == null) throw "Erro no dataset!";
  return dtsValue.values;
}

function openZoomGestorIndicador(){
  var DATASET_ID = "totvs_indicators_getColleague";
  var DATA_FIELDS = "Codigo,"+escape("C�digo")+",Nome,Nome";
  var RESULT_FIELDS = "Codigo,Nome";
  var TYPE = "gestorIndicador";
  var TITLE = "Gestor Indicador";
  var FUNCAO_CONSULTA = "callbackZoomGestorIndicador";
  abrirPesquisa(DATASET_ID, DATA_FIELDS, RESULT_FIELDS, TYPE, TITLE, FUNCAO_CONSULTA);
}

function callbackZoomGestorIndicador(){
  var dtsValue = DatasetFactory.getDataset("colleague", null, null, null);
  if (dtsValue == null) throw "Erro no dataset!";
  return dtsValue.values;
}

function abrirPesquisa(DATASET_ID, dataFields, resultFields, type, title){
  window.open("/webdesk/zoom.jsp" +
    "?datasetId=" +
    DATASET_ID +
    "&dataFields=" +
    dataFields +
    "&resultFields=" +
    resultFields +
    "&type=" +
    type, "zoom", "status,scroolbars=no,width=600,height=350,top=0,left=0");
}

/*function Data(v){   //Máscara de Data
  v=v.replace(/\D/g,"") ;
  v=v.replace(/(\d{2})(\d)/,"$1/$2");
  v=v.replace(/(\d{2})(\d)/,"$1/$2");
  return v;
}*/

/*function clearField(campo){
  var index = campo.id.split("___")[1];
  document.getElementById("data_indicador___"+index).value = "";
}*/


/*function customAdd(tab){ //Função para adicionar o filho
  wdkAddChild(tab);
}*/

/*function customDelete(element){ //Função para excluir o filho
  fnWdkRemoveChild(element);
}*/

/**
 * Verifica os campos readonly e altera a cor de fundo para cinza
 */
 function setGreyFields(){
  var fields = document.getElementById("documentoPrincipal").getElementsByTagName("input");
  var tArea = document.getElementById("documentoPrincipal").getElementsByTagName("textarea");

  for(var i=0;i<fields.length;i++){
    if(fields[i].type == "text" && (fields[i].getAttribute("readonly") == "" || fields[i].getAttribute("readonly") == "readonly")){
      fields[i].style.border = "solid 1px";
      fields[i].style.backgroundColor = "#f0f0f0";
      fields[i].style.borderColor = "#999";
    }

    if(fields[i].type == "text" && (fields[i].getAttribute("readonly"))){
      fields[i].style.border = "solid 1px";
      fields[i].style.backgroundColor = "#f0f0f0";
      fields[i].style.borderColor = "#999";
    }
  }

  for(var i=0;i<tArea.length;i++){
    if(tArea[i].getAttribute("readonly")){
      tArea[i].style.border = "solid 1px";
      tArea[i].style.backgroundColor = "#f0f0f0";
      tArea[i].style.borderColor = "#999";
    }
    if(tArea[i].getAttribute("readonly") == "readonly" || tArea[i].getAttribute("readonly") == ""){
      tArea[i].style.border = "solid 1px";
      tArea[i].style.backgroundColor = "#f0f0f0";
      tArea[i].style.borderColor = "#999";
    }
  }
}


function getNextDay(){
  var itens = new Array();
  var index = document.getElementById('index_campo').value;
  var data;
  for(i=0;i<index;i++){
    var campo_form = parseInt(i,10) + 1;
    if(document.getElementById("data_indicador___"+ campo_form).value != "")
      itens[i] = document.getElementById("data_indicador___"+ campo_form).value;
  }


  data = AddDate(parseInt(document.getElementById("periodicity").value,10),getMoreDate(itens),getCountDays());

  return data;

}
function getCountDays(){
  var periodicidade = parseInt(document.getElementById("periodicity").value,10);
  var amount = 0;
  switch(periodicidade)
  {
    case 0:
    {
      amount=1;
      break;
    }
    case 1:
    {
      amount=7;
      break;
    }
    case 2:
    {
      amount=14;
      break;
    }
    case 3:
    {
      amount=1;
      break;
    }
    case 4:
    {
      amount=2;
      break;
    }
    case 5:
    {
      amount=3;
      break;
    }
    case 6:
    {
      amount=6;
      break;
    }
    case 7:
    {
      amount=1;
      break;
    }
  }
  return amount;
}
function getMoreDate(itens){

  var maior  = new Date();

  if(itens.length == 0){

    var datas = document.getElementById("startDate").value.split("");
    var dia = parseInt(datas[0]+datas[1],10);
    var mes = parseInt(datas[3]+datas[4],10) - 1;
    var ano = parseInt(datas[6]+datas[7]+datas[8]+datas[9],10);

    maior.setFullYear(ano,mes,dia);
    maior.setHours(23);
    maior.setMinutes(59);
    maior.setSeconds(0);

    return maior;
  }

  var maior  = new Date();
  var datas = itens[0].split("");
  maior.setFullYear(parseInt(datas[6]+datas[7]+datas[8]+datas[9],10) ,parseInt(datas[3]+datas[4],10) - 1,parseInt(datas[0]+datas[1],10) );

  for(i in itens){
    var datas = itens[i].split("");
    var dia = parseInt(datas[0]+datas[1],10);
    var mes = parseInt(datas[3]+datas[4],10) - 1;
    var ano = parseInt(datas[6]+datas[7]+datas[8]+datas[9],10);

    if(maior < new Date().setFullYear(ano,mes,dia) ){
      maior.setFullYear(ano,mes,dia);
      maior.setHours(23);
      maior.setMinutes(59);
      maior.setSeconds(0);
    }
  }

  return maior;
}

function AddDate(differenceType,date,amount){
  var day = new Date(date);
  if((differenceType >= 0) && (differenceType < 3)){
    day.setDate(day.getDate() + parseInt(amount,10));
  }else{
    if((differenceType >= 3) && (differenceType < 7)) {
      day.setMonth(day.getMonth() + parseInt(amount,10));
    }else{
      if(differenceType == 7){
        day.setFullYear(day.getFullYear() + parseInt(amount,10));
      }
    }
  }
  var mes = parseInt(day.getMonth(),10) + 1;
  var dia = parseInt(day.getDate(),10);

  if (mes < 10)
    mes = "0" + mes;

  if (dia < 10)
    dia = "0" + dia;

  return dia + "/" + (mes ) + "/" + day.getFullYear() ;
}
function tabelaID(idTabela) {
  var retornoID = [];
  var table = $('#' + idTabela);
  
  table.find('tbody').each(
		  
    function(indice) {
      $(this).find('tr').each(
        function(indice) {
          $(this).find('td').each(
            function(indice) {
              $(this).find('input').each(
                function(indice) {
                  if((this.id).indexOf("appointmentValue") >= 0){
                    retornoID.push(this.id); 
                  }
                });
            });
        });
    });
  return retornoID;
}

function addMaskAppointmentValue(event) {

	var valorGoalType = $("#goalType").val();
	
	if (WKNumState == "3" || WKNumState == "4") {
		for (var i = 0; i < tabelaID.length; i++) {
			if (valorGoalType == "1") {
				$("#" + event.id).mask('##0,00%', {reverse: true});
			} else {
				$("#" + event.id).mask("#.##0,00", {reverse: true});
			}
		}
	}	
	return "Função finalizada";
}

$(document).ready(function(){
	$("#goalType").change(function(){
		console.log("Foi");
		
		  if ($(this).val() == "1") {
			    $("#goal").mask('##0,00%', {reverse: true});
			  } else {
			    $("#goal").mask("#.##0,00", {reverse: true});
			  } 		
		
	});
});