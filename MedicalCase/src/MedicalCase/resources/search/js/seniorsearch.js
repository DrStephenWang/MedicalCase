
$(function(){	

});

/*初始化分类浏览结果页面*/
var table="";
function initSeniorSearchResult(){
	type = decodeURI(getUrlParam("type"));
	$('#senior_search_type').html("<div class='senior_rs_tab'>搜索到的信息如下</div>");
		
	if(type == "dis")
		
		getDisList();
	
	else if (type=="disc")
		
		getDiscList();
	
	else if (type=="ther")
		
		getTherList();
	
}

function getDisList()
{
		var dataJson = 
	{
		"disname": decodeURI(getUrlParam("disname")),
		"pageno" : parseInt(getUrlParam("pageno")),
		"pagesize":pageSize
	};
	
	var url = "./dislist";
	var contentType = "text";
	$.ajax({
		  type: 'POST',
		  url: url,
		  data: dataJson,
		  success: getSeniorListSuccessCB,
		  error: getSeniorListErrorCB,
		  dataType: contentType
		});
	
}

function getDiscList()
{
	var dataJson=
		{
			"discword": decodeURI(getUrlParam("discword")),
			"pageno": parseInt(getUrlParam("pageno")),
			"pagesize":pageSize
		};
	var url="./disclist";
	var contentType="text";
	$.ajax({
		type:"POST",
		url: url,
		data: dataJson,
		success: getSeniorListSuccessCB,
		error :getSeniorListErrorCB,
		dataType: contentType
	});
}

function getTherList()
{
	var dataJson=
		{
			"ther": decodeURI(getUrlParam("ther")),
			"pageno": parseInt(getUrlParam("pageno")),
			"pagesize":pageSize
		};
	var url="./therlist";
	var contentType="text";
	$.ajax({
		type:"POST",
		url: url,
		data: dataJson,
		success: getSeniorListSuccessCB,
		error :getSeniorListErrorCB,
		dataType: contentType
	});
}

function getSeniorListSuccessCB(data, textStatus, jqXHR)
{

	data=eval('(' + data + ')');
	var searchContent = window.location.search;
	var index = searchContent.indexOf("pageno", 0);
	
	var typeEn = "other"
    var table = listToTable(data.list,typeEn);  
    
    $("#senior_search_list_title").html(getTableTitle(typeEn));
    $("#senior_search_list_info").html(table);

	if(parseInt(data.count) <= pageSize)
		$("#senior_search_pagincation").hide();
    
	else
		$("#senior_search_pagincation").pagination({
			items:parseInt(data.count),
	        itemsOnPage: pageSize,
	        cssStyle: 'light-theme',
	        hrefTextPrefix:'#',
	        onPageClick:function(pageNumber, event){
	        	window.location.href = "./seniorsearch" + searchContent.substring(0, index)
	        						 + "pageno=" + pageNumber;
	        },
	        prevText:"上一页",
	        nextText:"下一页",
	        currentPage:getUrlParam("pageno")
	    });
	
}

function getSeniorListErrorCB(data, textStatus, jqXHR){
	
}

/*初始化分类浏览*/
function initClassify(){
	
	
	var type = decodeURI(getUrlParam("type"));
	
	if(type == "dis" || type == "null")
		getDisSearchType();
	
	else if(type == "ther")
		getTherSearchType();
	
	else if(type == "disc")
		getDiscSearchType();
	
	

	
	$('#classify_dis').live('click', function () {
		window.location.href = "./classifybrowse?type=dis";
	});	
	
	$('#classify_ther').live('click', function () {
		window.location.href = "./classifybrowse?type=ther";
		
	});	
	$('#classify_disc').live('click', function () {
		window.location.href = "./classifybrowse?type=disc";
	});	
	
	
	window.location.hash = "#home_type_nav";
	
}

/*生成疾病标签*/

function getDisSearchType(){
	var string = '<ul id="navlist"><li><a href="#"  id="classify_dis">&nbsp;疾病&nbsp;</a></li>' 
		   + '<li><a href="#" id="classify_ther">&nbsp;治则&nbsp;</a></li>'
		   + '<li><a href="#" id="classify_disc">&nbsp;辩证&nbsp;</a></li></ul>';
	$("#navcontainer").html(string);
	//
	tempArray = new Array("伤寒","头痛","哮喘","胃痛","头晕","泄泻","水肿","疟疾","腹痛","鼻炎","痛痹","黄疸","头风","闭经","呕吐","咳血","反胃","健忘","血淋","失眠","挫伤","癫痫","咳嗽","痛经");
	table = "";
	table += "<table id='mian-table'><th class='c-left'></th><th class='c-right'></th>"
		  +	"<tr><td  class='c-left-text'>常见疾病:</td><td class='c-right-text'>";
	for(var i = 0 ; i < tempArray.length; i++)
		table += "<span class='classify_content_short'><a href='#' class='dis_type_list'>" + tempArray[i] + "</a></span>";
	
	table += "</td></tr>";
	$('.dis_type_list').live('click', function () {			
		window.open("seniorsearch?disname=" + $(this).text() + "&type=dis&pageno=1");
	});
	
	$("#mian-table").html(table + "</table>");
}
/*生成辩证的标签*/

function getDiscSearchType(){
	var string = '<ul id="navlist"><li><a href="#"  id="classify_dis">&nbsp;疾病&nbsp;</a></li>' 
		   + '<li><a href="#" id="classify_ther">&nbsp;治则&nbsp;</a></li>'
		   + '<li><a href="#" id="classify_disc">&nbsp;辩证&nbsp;</a></li></ul>';
	$("#navcontainer").html(string);
	//
	tempArray = new Array("肝","胃","心火","肾虚","阴虚","伤寒","风湿");
	table = "";
	table += "<table id='mian-table'><th class='c-left'></th><th class='c-right'></th>"
		  +	"<tr><td  class='c-left-text'>辩证:</td><td class='c-right-text'>";
	for(var i = 0 ; i < tempArray.length; i++)
		table += "<span class='classify_content_short'><a href='#' class='dis_type_list'>" + tempArray[i] + "</a></span>";
	
	table += "</td></tr>";
	$('.dis_type_list').live('click', function () {			
		window.open("seniorsearch?discword=" + $(this).text() + "&type=disc&pageno=1");
	});
	
	$("#mian-table").html(table + "</table>");
}

function getTherSearchType(){
	var string = '<ul id="navlist"><li><a href="#"  id="classify_dis">&nbsp;疾病&nbsp;</a></li>' 
		   + '<li><a href="#" id="classify_ther">&nbsp;治则&nbsp;</a></li>'
		   + '<li><a href="#" id="classify_disc">&nbsp;辩证&nbsp;</a></li></ul>';
	$("#navcontainer").html(string);
	//
	tempArray = new Array("安神","清热","化瘀","养血","健脾","活血","化痰");
	table = "";
	table += "<table id='mian-table'><th class='c-left'></th><th class='c-right'></th>"
		  +	"<tr><td  class='c-left-text'>治则:</td><td class='c-right-text'>";
	for(var i = 0 ; i < tempArray.length; i++)
		table += "<span class='classify_content_short'><a href='#' class='dis_type_list'>" + tempArray[i] + "</a></span>";
	
	table += "</td></tr>";
	$('.dis_type_list').live('click', function () {			
		window.open("seniorsearch?discword=" + $(this).text() + "&type=disc&pageno=1");
	});
	
	$("#mian-table").html(table + "</table>");
}

/*��ʼ����ϲ�ѯ*/
/*function initSeniorSearch(){
	
	window.location.hash = "#home_type_nav";
	
	var type = decodeURI(getUrlParam("type"));
	
	if(type == "med" || type == "null")
		initMedSenior();
	
	else if(type == "chem")
		initChemSenior();
	
	else if(type == "ori")
		initOriSenior();
	
	else if(type == "pre")
		initPreSenior();
	
	else if(type == "syn")
		initSynSenior();
	
	else if(type == "dis")
		initDisSenior();

	
	$('#senior_med').live('click', function () {
		window.location.href = "./senior?type=med";
	});	
	
	$('#senior_chem').live('click', function () {
		window.location.href = "./senior?type=chem";
		
	});	
	$('#senior_ori').live('click', function () {
		window.location.href = "./senior?type=ori";
	});	
	
	$('#senior_syn').live('click', function () {
		window.location.href = "./senior?type=syn";
	});	
	
	$('#senior_pre').live('click', function () {
		window.location.href = "./senior?type=pre";
	});	
	
	$('#senior_dis').live('click', function () {
		window.location.href = "./senior?type=dis";
	});	
}

function initMedSenior(){
	 var dataJson = 
		{
		};
		var methodType = "POST";
		var url = "./medsearchtype";
		var contentType = "application/json;charset=utf-8";
		var data = "";
		ajaxFunc(methodType,url,data,contentType,getMedSearchTypeForSeniorSuccessCB,getSeniorListErrorCB);
}

function getMedSearchTypeForSeniorSuccessCB(data, textStatus, jqXHR){
	var string = '<ul id="navlist"><li><a href="#" id="current"  id="senior_med">&nbsp;��ζҩ&nbsp;</a></li>' 
		   + '<li><a href="#" id="senior_chem">&nbsp;������&nbsp;</a></li>'
		   + '<li><a href="#" id="senior_ori">&nbsp;ҩ�ö�ֲ��&nbsp;</a></li>'
		   + '<li><a href="#" id="senior_pre">&nbsp;��&nbsp;&nbsp;&nbsp;&nbsp;��&nbsp;</a></li>'
		   + '<li><a href="#" id="senior_dis">&nbsp;��&nbsp;&nbsp;&nbsp;&nbsp;��&nbsp;</a></li>'
		   + '<li><a href="#" id="senior_syn">&nbsp;֤&nbsp;&nbsp;&nbsp;&nbsp;��&nbsp;</a></li></ul>';
	$("#navcontainer").html(string);
	
	var content = '<span class="s-title fj"> ��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;�ƣ�&nbsp;'
				+ '<input name="fjone" class="senior_input" id="med_name"/></span>'
			    + '<span class="s-title fj"> ��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ч��&nbsp;'
			    + '<select id="med_function" class="senior_option_select senior_input"></select></span>'
				+ '<span class="s-title"> ��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ζ��&nbsp;'
			    + '<select id="med_property" class="senior_option_select senior_input"></select></span>'
				+ '<span class="s-title fj"> ҩ�ò�λ��&nbsp;'
			    + '<select id="med_part" class="senior_option_select senior_input"></select></span>'
			    + '<span class="s-title"> ��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;�أ�&nbsp;'
			    + '<select id="med_location" class="senior_option_select senior_input"></select></span>'
			    + '<span class="s-title fj"> ��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;����&nbsp;'
			    + '<select id="med_tropisw" class="senior_option_select senior_input"></select></span>'
			    + '<span><input type="button" class="fjbutton" id="senior_med_btn"/></span>'
			    + '<span class="s-title fj"><input id="med_function_in" class="senior_option_input senior_input"/></span>'
    			+ '<span class="s-title fj"><input id="med_part_in" class="senior_option_input senior_input"/></span>'
				+ '<span class="s-title fj"><input id="med_property_in" class="senior_option_input senior_input"/></span>'
				+ '<span class="s-title fj"><input id="med_tropisw_in" class="senior_option_input senior_input"/></span>'
				+ '<span class="s-title fj"><input id="med_location_in" class="senior_option_input senior_input"/></span>'
	$("#senior_content").html(content);
	
	var option = "";
	for(var i = 0 ; i < data.medfunction.length; i++){
		option += "<option value='" + data.medfunction[i] + "'>" + data.medfunction[i] + "</option>";
	}
	$("#med_function").html(option);
	overhiddenSelectByInput("med_function");
	
	tempArray = new Array("ȫ��","��","��","Ҷ","��","��ʵ","����","������","��","�׳�","��","����","ȫ��","��","��");
	var option = "";
	for(var i = 0 ; i < tempArray.length; i++){
		option += "<option value='" + tempArray[i] + "'>" + tempArray[i] + "</option>";
	}
	$("#med_part").html(option);
	overhiddenSelectByInput("med_part");
	
	//��ʼ����ζ
	tempArray = new Array("��","��","��","��","ƽ","��","��","��","��","ɬ","��","�ж�","�޶�");
	var option = "";
	for(var i = 0 ; i < tempArray.length; i++){
		option += "<option value='" + tempArray[i] + "'>" + tempArray[i] + "</option>";
	}
	$("#med_property").html(option);
	overhiddenSelectByInput("med_property");
	
	//��ʼ���龭
	tempArray = new Array("��","��","Ƣ","��","��","����","С��","��","θ");
	var option = "";
	for(var i = 0 ; i < tempArray.length; i++){
		option += "<option value='" + tempArray[i] + "'>" + tempArray[i] + "</option>";
	}
	$("#med_tropisw").html(option);
	overhiddenSelectByInput("med_tropisw");
	
	//��ʼ�����
	tempArray = new Array("����","�Ϻ�","����","����","����","���","����","����","�㽭","����","����","�㶫","����","����","�Ĵ�","ɽ��","����","����","����","����","�ӱ�","����","ɽ��","����","����","���ɹ�","����","�ຣ","�½�","����","����","���","����","̨��");
	var option = "";
	for(var i = 0 ; i < tempArray.length; i++){
		option += "<option value='" + tempArray[i] + "'>" + tempArray[i] + "</option>";
	}
	$("#med_location").html(option);
	overhiddenSelectByInput("med_location");
	
	
	$('#senior_med_btn').live('click', function () {
		window.open("./seniorsearch?medname=" + $("#med_name").val() 
				  + "&medfunction=" + $("#med_function_in").val()
				  + "&medpart=" + $("#med_part_in").val()
				  + "&medproperty=" + $("#med_property_in").val()
				  + "&medtropisw=" + $("#med_tropisw_in").val()
				  + "&medlocation=" + $("#med_location_in").val()
				  + "&type=med&pageno=1");
	});	
		
	window.location.hash = "#home_type_nav";
}

function initChemSenior(){
	var string = '<ul id="navlist"><li><a href="#"  id="senior_med">&nbsp;��ζҩ&nbsp;</a></li>' 
		   + '<li><a href="#" id="current" id="senior_chem">&nbsp;������&nbsp;</a></li>'
		   + '<li><a href="#" id="senior_ori">&nbsp;ҩ�ö�ֲ��&nbsp;</a></li>'
		   + '<li><a href="#" id="senior_pre">&nbsp;��&nbsp;&nbsp;&nbsp;&nbsp;��&nbsp;</a></li>'
		   + '<li><a href="#" id="senior_dis">&nbsp;��&nbsp;&nbsp;&nbsp;&nbsp;��&nbsp;</a></li>'
		   + '<li><a href="#" id="senior_syn">&nbsp;֤&nbsp;&nbsp;&nbsp;&nbsp;��&nbsp;</a></li></ul>';
	$("#navcontainer").html(string);
	
	var content = '<span class="s-title fj"> ��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;�ƣ�&nbsp;'
				+ '<input name="fjone" class="senior_input" id="chem_name"/></span>'
				+ '<span class="s-title"> ��&nbsp;&nbsp;��&nbsp;&nbsp;&nbsp;ʽ��&nbsp;'
			    + '<input name="fjone" class="senior_input" id="formula" /></span>'
				+ '<span class="s-title fj"> CAS�ţ�&nbsp;'
			    + '<input name="fjone" class="senior_input" id="cas" /></span>'
			    + '<span><input type="button" class="fjbutton" id="senior_chem_btn"/></span>';
	$("#senior_content").html(content);
	$('#senior_chem_btn').live('click', function () {
		window.open("./seniorsearch?chemname=" + $("#chem_name").val() 
				  + "&formula=" + $("#formula").val()
				  + "&cas=" + $("#cas").val()
				  + "&type=chem&pageno=1");
	});	
	
	window.location.hash = "#home_type_nav";
}

function initOriSenior(){
	var string = '<ul id="navlist"><li><a href="#"  id="senior_med">&nbsp;��ζҩ&nbsp;</a></li>' 
		   + '<li><a href="#" id="senior_chem">&nbsp;������&nbsp;</a></li>'
		   + '<li><a href="#" id="current" id="senior_ori">&nbsp;ҩ�ö�ֲ��&nbsp;</a></li>'
		   + '<li><a href="#" id="senior_pre">&nbsp;��&nbsp;&nbsp;&nbsp;&nbsp;��&nbsp;</a></li>'
		   + '<li><a href="#" id="senior_dis">&nbsp;��&nbsp;&nbsp;&nbsp;&nbsp;��&nbsp;</a></li>'
		   + '<li><a href="#" id="senior_syn">&nbsp;֤&nbsp;&nbsp;&nbsp;&nbsp;��&nbsp;</a></li></ul>';
	$("#navcontainer").html(string);
	
	var content = '<span class="s-title fj"> ��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;�ƣ�&nbsp;'
				+ '<input name="fjone" class="senior_input" id="ori_name"/></span>'
				+ '<span class="s-title"> ��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;����&nbsp;'
			    + '<input name="fjone" class="senior_input" id="ori_family" /></span>'
				+ '<span class="s-title"> ��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;̬��&nbsp;'
			    + '<input name="fjone" class="senior_input" id="ori_appearance" /></span>'
				+ '<span class="s-title fj"> ��Դ�ֲ���&nbsp;'
			    + '<input name="fjone" class="senior_input" id="ori_location" /></span>'
				+ '<span class="s-title"> ��̬������&nbsp;'
			    + '<input name="fjone" class="senior_input" id="ori_environment" /></span>'
				+ '<span class="s-title"> ������գ�&nbsp;'
			    + '<input name="fjone" class="senior_input" id="ori_recovery" /></span>'
			    + '<span><input type="button" class="fjbutton" id="senior_ori_btn"/></span>';

	$("#senior_content").html(content);

	$('#senior_ori_btn').live('click', function () {
		window.open("./seniorsearch?oriname=" + $("#ori_name").val() 
				  + "&orifamily=" + $("#ori_family").val()
				  + "&oriappearance=" + $("#ori_appearance").val()
				  + "&orilocation=" + $("#ori_location").val()
				  + "&orienvironment=" + $("#ori_environment").val()
				  + "&orirecovery=" + $("#ori_recovery").val()
				  + "&type=ori&pageno=1");
	});	
	
	window.location.hash = "#home_type_nav";
}

function initSynSenior(){
	 var dataJson = 
		{
		};
		var methodType = "POST";
		var url = "./synsearchtype";
		var contentType = "application/json;charset=utf-8";
		var data = "";
		ajaxFunc(methodType,url,data,contentType,getSynSearchTypeForSeniorSuccessCB,getSeniorListErrorCB);
}

function getSynSearchTypeForSeniorSuccessCB(data, textStatus, jqXHR){
	var string = '<ul id="navlist"><li><a href="#"  id="senior_med">&nbsp;��ζҩ&nbsp;</a></li>' 
		   + '<li><a href="#" id="senior_chem">&nbsp;������&nbsp;</a></li>'
		   + '<li><a href="#" id="senior_ori">&nbsp;ҩ�ö�ֲ��&nbsp;</a></li>'
		   + '<li><a href="#" id="senior_pre">&nbsp;��&nbsp;&nbsp;&nbsp;&nbsp;��&nbsp;</a></li>'
		   + '<li><a href="#" id="senior_dis">&nbsp;��&nbsp;&nbsp;&nbsp;&nbsp;��&nbsp;</a></li>'
		   + '<li><a href="#" id="current" id="senior_syn">&nbsp;֤&nbsp;&nbsp;&nbsp;&nbsp;��&nbsp;</a></li></ul>';
	$("#navcontainer").html(string);
	
	var content = '<span class="s-title fj"> ��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;�ƣ�&nbsp;'
				+ '<input name="fjone" class="senior_input" id="syn_name"/></span>'
				+ '<span class="s-title"> ��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;�飺&nbsp;'
			    + '<input name="fjone" class="senior_input" id="syn_summary" /></span>'
				+ '<span class="s-title fj"> �ٴ����֣�&nbsp;'
			    + '<input name="fjone" class="senior_input" id="syn_symptom" /></span>'
				+ '<span class="s-title"> ����֢��&nbsp;'
			    + '<input name="fjone" class="senior_input" id="syn_illness" /></span>'
				+ '<span class="s-title"> ��֤������&nbsp;'
			    + '<input name="fjone" class="senior_input" id="syn_discrimination" /></span>'
			    + '<span class="s-title fj"> ��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;�ࣺ&nbsp;'
			    + '<select id="syn_class" class="senior_option_select senior_input"></select></span>'
			    + '<span><input type="button" class="fjbutton" id="senior_syn_btn"/></span>'
			    + '<span class="s-title fj"><input id="syn_class_in" class="senior_option_input senior_input"/></span>';
	
	var option = "";
	for(var i = 0 ; i < data.synclass.length; i++){
		option += "<option value='" + data.synclass[i] + "'>" + data.synclass[i] + "</option>";
	}

	$("#senior_content").html(content);
	$("#syn_class").html(option);
	overhiddenSelectByInput("syn_class");

	$('#senior_syn_btn').live('click', function () {
		window.open("./seniorsearch?synname=" + $("#syn_name").val() 
				  + "&synsummary=" + $("#syn_summary").val()
				  + "&synsymptom=" + $("#syn_symptom").val()
				  + "&synillness=" + $("#syn_illness").val()
				  + "&syndiscrimination=" + $("#syn_discrimination").val()
				  + "&synclass=" + $("#syn_class_in").val()
				  + "&type=syn&pageno=1");
	});	
	
	window.location.hash = "#home_type_nav";
}

function initPreSenior(){
	var string = '<ul id="navlist"><li><a href="#"  id="senior_med">&nbsp;��ζҩ&nbsp;</a></li>' 
		   + '<li><a href="#" id="senior_chem">&nbsp;������&nbsp;</a></li>'
		   + '<li><a href="#" id="senior_ori">&nbsp;ҩ�ö�ֲ��&nbsp;</a></li>'
		   + '<li><a href="#" id="current" id="senior_pre">&nbsp;��&nbsp;&nbsp;&nbsp;&nbsp;��&nbsp;</a></li>'
		   + '<li><a href="#" id="senior_dis">&nbsp;��&nbsp;&nbsp;&nbsp;&nbsp;��&nbsp;</a></li>'
		   + '<li><a href="#" id="senior_syn">&nbsp;֤&nbsp;&nbsp;&nbsp;&nbsp;��&nbsp;</a></li></ul>';
	$("#navcontainer").html(string);
	
	var content = '<span class="s-title fj"> ��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;�ƣ�&nbsp;'
				+ '<input name="fjone" class="senior_input" id="pre_name"/></span>'
				+ '<span class="s-title"> ��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;�ɣ�&nbsp;'
			    + '<input name="fjone" class="senior_input" id="pre_attention" /></span>'
				+ '<span class="s-title fj"> ������ɣ�&nbsp;'
			    + '<input name="fjone" class="senior_input" id="pre_dosage" /></span>'
				+ '<span class="s-title"> ��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ч��&nbsp;'
			    + '<input name="fjone" class="senior_input" id="pre_function" /></span>'
				+ '<span class="s-title"> ����������&nbsp;'
			    + '<input name="fjone" class="senior_input" id="pre_book" /></span>'
			    + '<span><input type="button" class="fjbutton" id="senior_pre_btn"/></span>';


	$("#senior_content").html(content);

	$('#senior_pre_btn').live('click', function () {
		window.open("./seniorsearch?prename=" + $("#pre_name").val() 
				  + "&predosage=" + $("#pre_dosage").val()
				  + "&prebook=" + $("#pre_book").val()
				  + "&preattention=" + $("#pre_attention").val()
				  + "&prefunction=" + $("#pre_function").val()
				  + "&type=pre&pageno=1");
	});	
	
	window.location.hash = "#home_type_nav";
}

function initDisSenior(){	
	 var dataJson = 
		{
		};
		var methodType = "POST";
		var url = "./dissearchtype";
		var contentType = "application/json;charset=utf-8";
		var data = "";
		ajaxFunc(methodType,url,data,contentType,getDisSearchTypeForSeniorSuccessCB,getSeniorListErrorCB);
}

function getDisSearchTypeForSeniorSuccessCB(data, textStatus, jqXHR){
	var string = '<ul id="navlist"><li><a href="#"  id="senior_med">&nbsp;��ζҩ&nbsp;</a></li>' 
		   + '<li><a href="#" id="senior_chem">&nbsp;������&nbsp;</a></li>'
		   + '<li><a href="#" id="senior_ori">&nbsp;ҩ�ö�ֲ��&nbsp;</a></li>'
		   + '<li><a href="#" id="senior_pre">&nbsp;��&nbsp;&nbsp;&nbsp;&nbsp;��&nbsp;</a></li>'
		   + '<li><a href="#" id="current" id="senior_dis">&nbsp;��&nbsp;&nbsp;&nbsp;&nbsp;��&nbsp;</a></li>'
		   + '<li><a href="#" id="senior_syn">&nbsp;֤&nbsp;&nbsp;&nbsp;&nbsp;��&nbsp;</a></li></ul>';
	$("#navcontainer").html(string);
	
	var content = '<span class="s-title fj"> ��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;�ƣ�&nbsp;'
				+ '<input name="fjone" class="senior_input" id="dis_name"/></span>'
				+ '<span class="s-title"> ��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;����&nbsp;'
			    + '<input name="fjone" class="senior_input" id="dis_description" /></span>'
			    + '<span class="s-title fj"> ��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;�ࣺ&nbsp;'
			    + '<select id="dis_class" class="senior_option_select senior_input"></select></span>'
			    + '<span><input type="button" class="fjbutton" id="senior_dis_btn"/></span>'
			    + '<span class="s-title fj"><input id="dis_class_in" class="senior_option_input senior_input"/></span>';
	
	var option = "";
	for(var i = 0 ; i < data.disclass.length; i++){
		option += "<option value='" + rtrim(data.disclass[i]) + "'>" + rtrim(data.disclass[i]) + "</option>";
	}

	$("#senior_content").html(content);
	$("#dis_class").html(option);
	overhiddenSelectByInput("dis_class");

	$('#senior_dis_btn').live('click', function () {
		window.open("./seniorsearch?disname=" + $("#dis_name").val() 
				  + "&disdescription=" + $("#dis_description").val()
				  + "&disclass=" + $("#dis_class_in").val()
				  + "&type=dis&pageno=1");
	});	
	
	window.location.hash = "#home_type_nav";
}

function rtrim(value) {

	while (value.charAt(value.length - 1) == ' ' || value.charAt(value.length - 1) == ' ' || value.charAt(value.length - 1) == '��') {
		value = value.substring(0, value.length - 1);
	}
	return value;
}

function overhiddenSelectByInput(id){
	$("#" + id + "_in").offset({top: $("#" + id).offset().top, left: $("#" + id).offset().left});
	
	var input = document.getElementById(id + "_in");
	var select = document.getElementById(id);
	select.onchange = function(){
		input.value = input.value.length == 0? this.value : input.value + " " + this.value;
		};
}*/