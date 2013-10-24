
$(function(){	

});

/*初始化分类浏览、组合查询结果页面*/
var table="";
function initSeniorSearchResult(){
	type = decodeURI(getUrlParam("type"));
	$('#senior_search_type').html("<div class='senior_rs_tab'>搜索到的信息如下：</div>");
		
	if(type == "med")
		getMedList();
	
	else if(type == "syn")
		getSynList();
	
	else if(type == "dis")
		getDisList();
	
	else if(type == "pre")
		getPreList();
	
	else if(type == "ori")
		getOriList();
	
	else if(type == "chem")
		getChemList();
	
	else if(type == "orimed")
		getOriMedList();
}

function getMedList()
{
		var dataJson = 
	{
		"medfunction":transMultiKeywordFromUrl("medfunction"),
		"medname":transMultiKeywordFromUrl("medname"),
		"medproperty":transMultiKeywordFromUrl("medproperty"),
		"medtropisw":transMultiKeywordFromUrl("medtropisw"),
		"medbook":transMultiKeywordFromUrl("medbook"),
		"medpart":transMultiKeywordFromUrl("medpart"),
		"medlocation":transMultiKeywordFromUrl("medlocation"),
		"startrow":getListStart(),
		"returnnum":pageSize
	};
	var data = JSON.stringify(dataJson);
	var methodType = "POST";
	var url = "./medlist";
	var contentType = "application/json;charset=utf-8";
	
	ajaxFunc(methodType,url,data,contentType,getSeniorListSuccessCB,getSeniorListErrorCB);
}

function getSynList()
{
		var dataJson = 
	{
		"synname":transMultiKeywordFromUrl("synname"),
		"synsummary":transMultiKeywordFromUrl("synsummary"),
		"synsymptom":transMultiKeywordFromUrl("synsymptom"),
		"synillness":transMultiKeywordFromUrl("synillness"),
		"syndiscrimination":transMultiKeywordFromUrl("syndiscrimination"),
		"synpreference":transMultiKeywordFromUrl("synpreference"),
		"synclass":transMultiKeywordFromUrl("synclass"),
		"startrow":getListStart(),
		"returnnum":pageSize
	};
	var data = JSON.stringify(dataJson);
	var methodType = "POST";
	var url = "./synlist";
	var contentType = "application/json;charset=utf-8";
	
	ajaxFunc(methodType,url,data,contentType,getSeniorListSuccessCB,getSeniorListErrorCB);
}

function getDisList()
{
		var dataJson = 
	{
		"disname":transMultiKeywordFromUrl("disname"),
		"disdescription":transMultiKeywordFromUrl("disdescription"),
		"disclass":transMultiKeywordFromUrl("disclass"),
		"startrow":getListStart(),
		"returnnum":pageSize
	};
	var data = JSON.stringify(dataJson);
	var methodType = "POST";
	var url = "./dislist";
	var contentType = "application/json;charset=utf-8";
	
	ajaxFunc(methodType,url,data,contentType,getSeniorListSuccessCB,getSeniorListErrorCB);
}

function getOriList()
{	
	var dataJson = 
		{
			"oriname":transMultiKeywordFromUrl("oriname"),
			"orifamily":transMultiKeywordFromUrl("orifamily"),
			"oriappearance":transMultiKeywordFromUrl("oriappearance"),
			"orilocation":transMultiKeywordFromUrl("orilocation"),
			"orienvironment":transMultiKeywordFromUrl("orienvironment"),
			"orirecovery":transMultiKeywordFromUrl("orirecovery"),
			"startrow":getListStart(),
			"returnnum":pageSize
		};
	var data = JSON.stringify(dataJson);
	var methodType = "POST";
	var url = "./orilist";
	var contentType = "application/json;charset=utf-8";
	
	ajaxFunc(methodType,url,data,contentType,getSeniorListSuccessCB,getSeniorListErrorCB);
}

function getChemList()
{
		var dataJson = 
	{
		"chemname":transMultiKeywordFromUrl("chemname"),
		"formula":transMultiKeywordFromUrl("formula"),
		"cas":transMultiKeywordFromUrl("cas"),
		"startrow":getListStart(),
		"returnnum":pageSize
	};
	var data = JSON.stringify(dataJson);
	var methodType = "POST";
	var url = "./chemlist";
	var contentType = "application/json;charset=utf-8";
	
	ajaxFunc(methodType,url,data,contentType,getSeniorListSuccessCB,getSeniorListErrorCB);
}

function getPreList()
{
		var dataJson = 
	{
		"prename":transMultiKeywordFromUrl("prename"),
		"predosage":transMultiKeywordFromUrl("predosage"),
		"preattention":transMultiKeywordFromUrl("preattention"),
		"prefunction":transMultiKeywordFromUrl("prefunction"),
		"prebook":transMultiKeywordFromUrl("prebook"),
		"startrow":0,
		"returnnum":pageSize
	};
	var data = JSON.stringify(dataJson);
	var methodType = "POST";
	var url = "./prelist";
	var contentType = "application/json;charset=utf-8";
	
	ajaxFunc(methodType,url,data,contentType,getSeniorListSuccessCB,getSeniorListErrorCB);
}

function getOriMedList()
{
		var dataJson = 
	{
		"family":decodeURI(getUrlParam("family")),
		"type":decodeURI(getUrlParam("familytype")),
		"startrow":0,
		"returnnum":pageSize
	};
	var data = JSON.stringify(dataJson);
	var methodType = "POST";
	var url = "./medlistbyorifamily";
	var contentType = "application/json;charset=utf-8";
	
	ajaxFunc(methodType,url,data,contentType,getSeniorListSuccessCB,getSeniorListErrorCB);
}

function getSeniorListSuccessCB(data, textStatus, jqXHR)
{

	var searchContent = window.location.search;
	var index = searchContent.indexOf("pageno", 0);
	
	var typeEn = "";
	if(decodeURI(getUrlParam("type")) == "orimed")
		typeEn = "med";
	else
		typeEn = typeChToEn(decodeURI(getUrlParam("type")));
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
	
	if(type == "med" || type == "null")
		getMedSearchType();
	
	else if(type == "chem")
		getChemSearchType();
	
	else if(type == "ori")
		getOriSearchType();
	
	else if(type == "pre")
		getPreSearchType();
	
	else if(type == "syn")
		getSynSearchType();
	
	else if(type == "dis")
		getDisSearchType();

	
	$('#classify_med').live('click', function () {
		window.location.href = "./classifybrowse?type=med";
	});	
	
	$('#classify_chem').live('click', function () {
		window.location.href = "./classifybrowse?type=chem";
		
	});	
	$('#classify_ori').live('click', function () {
		window.location.href = "./classifybrowse?type=ori";
	});	
	
	$('#classify_syn').live('click', function () {
		window.location.href = "./classifybrowse?type=syn";
	});	
	
	$('#classify_pre').live('click', function () {
		window.location.href = "./classifybrowse?type=pre";
	});	
	
	$('#classify_dis').live('click', function () {
		window.location.href = "./classifybrowse?type=dis";
	});	
	
	
	window.location.hash = "#home_type_nav";
	
}

function getPreSearchType(){
	var string = '<ul id="navlist"><li><a href="#"  id="classify_med">&nbsp;单味药&nbsp;</a></li>' 
		   + '<li><a href="#" id="classify_chem">&nbsp;化合物&nbsp;</a></li>'
		   + '<li><a href="#" id="classify_ori">&nbsp;药用动植物&nbsp;</a></li>'
		   + '<li><a href="#" id="current" id="classify_pre">&nbsp;方&nbsp;&nbsp;&nbsp;&nbsp;剂&nbsp;</a></li>'
		   + '<li><a href="#" id="classify_dis">&nbsp;疾&nbsp;&nbsp;&nbsp;&nbsp;病&nbsp;</a></li>'
		   + '<li><a href="#" id="classify_syn">&nbsp;证&nbsp;&nbsp;&nbsp;&nbsp;候&nbsp;</a></li></ul>';
	$("#navcontainer").html(string);
	//初始化剂型
	tempArray = new Array("散","膏","饼","液","丹","丸","汤");
	table = "";
	table += "<table id='mian-table'><th class='c-left'></th><th class='c-right'></th>"
		  +	"<tr><td  class='c-left-text'>剂型:</td><td class='c-right-text'>";
	for(var i = 0 ; i < tempArray.length; i++)
		table += "<span class='classify_content_short'><a href='#' class='pre_type_list'>" + tempArray[i] + "</a></span>";
	
	table += "</td></tr>";
	$('.pre_type_list').live('click', function () {			
		window.open("./seniorsearch?prename=" + $(this).text() + "&type=pre&pageno=1");
	});
	//初始化单字功效
	tempArray = new Array("下","中","卫","喘","土","寒","气","水","汗","湿","火","烦","热","焦","痞","瘀","经","结","肺","胃","胸","脉","脾","营","虚","虫","血","表","邪","里","阳","阴");
	
	table += "<tr><td class='c-left-text'>单字功效:</td><td class='c-right-text'>";
	
	for(var i = 0 ; i < tempArray.length; i++)
		table += "<span class='classify_content_short'><a href='#' class='pre_function_list'>" + tempArray[i] + "</a></span>";
	
	table += "</td></tr>";
	//初始化双字功效
	tempArray = new Array("解表","泻下","和解","清热","祛暑","温里","表里","补益","固涩","安神","开窍","理气","理血","治风","治燥","祛湿","祛痰","消导","驱虫","痛疮");
	
	table += "<tr><td class='c-left-text'>单字功效:</td><td class='c-right-text'>";
	
	for(var i = 0 ; i < tempArray.length; i++)
		table += "<span class='classify_content_short'><a href='#' class='pre_function_list'>" + tempArray[i] + "</a></span>";
	
	table += "</td></tr>";
	$('.pre_function_list').live('click', function () {			
		window.open("./seniorsearch?prefunction=" + $(this).text() + "&type=pre&pageno=1");
	});
	
	$("#mian-table").html(table + "</table>");
}

function getChemSearchType(){
	var string = '<ul id="navlist"><li><a href="#"  id="classify_med">&nbsp;单味药&nbsp;</a></li>' 
		   + '<li><a href="#" id="current" id="classify_chem">&nbsp;化合物&nbsp;</a></li>'
		   + '<li><a href="#" id="classify_ori">&nbsp;药用动植物&nbsp;</a></li>'
		   + '<li><a href="#" id="classify_pre">&nbsp;方&nbsp;&nbsp;&nbsp;&nbsp;剂&nbsp;</a></li>'
		   + '<li><a href="#" id="classify_dis">&nbsp;疾&nbsp;&nbsp;&nbsp;&nbsp;病&nbsp;</a></li>'
		   + '<li><a href="#" id="classify_syn">&nbsp;证&nbsp;&nbsp;&nbsp;&nbsp;候&nbsp;</a></li></ul>';
	$("#navcontainer").html(string);
		
	//初始化化合物种类
	tempArray = new Array("酸","碱","酯","醇","醚","糖","烷","素","苯","酚","酮","醛","胺");
	table = "";
	table += "<table id='mian-table'><th class='c-left'></th><th class='c-right'></th>"
		  +	"<tr><td  class='c-left-text'>化合物种类:</td><td class='c-right-text'>";
	for(var i = 0 ; i < tempArray.length; i++)
		table += "<span class='classify_content_short'><a href='#' class='chem_type_list'>" + tempArray[i] + "</a></span>";
	
	table += "</td></tr></table>";
	
	$('.chem_type_list').live('click', function () {			
 	window.open("./seniorsearch?chemname=" + $(this).text() + "&type=chem&pageno=1");
	});
	
	$("#mian-table").html(table);
}

function getMedSearchType()
{
	 var dataJson = 
	{
	};
	var methodType = "POST";
	var url = "./medsearchtype";
	var contentType = "application/json;charset=utf-8";
	var data = "";
	ajaxFunc(methodType,url,data,contentType,getMedSearchTypeSuccessCB,getSeniorListErrorCB);
}

function getMedSearchTypeSuccessCB(data, textStatus, jqXHR)
{	
	
	var string = '<ul id="navlist"><li><a href="#" id="current" id="classify_med">&nbsp;单味药&nbsp;</a></li>' 
		   + '<li><a href="#" id="classify_chem">&nbsp;化合物&nbsp;</a></li>'
		   + '<li><a href="#" id="classify_ori">&nbsp;药用动植物&nbsp;</a></li>'
		   + '<li><a href="#" id="classify_pre">&nbsp;方&nbsp;&nbsp;&nbsp;&nbsp;剂&nbsp;</a></li>'
		   + '<li><a href="#" id="classify_dis">&nbsp;疾&nbsp;&nbsp;&nbsp;&nbsp;病&nbsp;</a></li>'
		   + '<li><a href="#" id="classify_syn">&nbsp;证&nbsp;&nbsp;&nbsp;&nbsp;候&nbsp;</a></li></ul>';
	$("#navcontainer").html(string);
	
	table = "";
	
	table += "<table id='mian-table'><th class='c-left'></th><th class='c-right'></th>"
		  +	"<tr><td  class='c-left-text'>功效:</td><td class='c-right-text'>";
	for(var i = 0 ; i < data.medfunction.length; i++)
		table += "<span class='classify_content'><a href='#' class='med_function_list'>" + data.medfunction[i] + "</a></span>";
	
	table += "</td></tr>";
	$('.med_function_list').live('click', function () {			
		window.open("./seniorsearch?medfunction=" + $(this).text() + "&type=med&pageno=1");
	});
	
	var tempArray;
	//初始化植物药用部位
	tempArray = new Array("全草","根","茎","叶","花","果实","种子");
	table += "<tr><td class='c-left-text'>植物药用部位:</td><td class='c-right-text'>";
	
	for(var i = 0 ; i < tempArray.length; i++)
		table += "<span class='classify_content_short'><a href='#' class='med_plant_part_list'>" + tempArray[i] + "</a></span>";
	
	table += "</td></tr>";
	$('.med_plant_part_list').live('click', function () {			
		window.open("./seniorsearch?medpart=" + $(this).text() + "&type=med&pageno=1");
	});
	
	//初始化动物药用部位
	tempArray = new Array("分泌物","卵","幼虫","肉","骨骼","全体","壳","胆");
	
	table += "<tr><td class='c-left-text'>动物药用部位:</td><td class='c-right-text'>";
		
	for(var i = 0 ; i < tempArray.length; i++)
		table += "<span class='classify_content_short'><a href='#' class='med_ani_part_list'>" + tempArray[i] + "</a></span>";
	
	table += "</td></tr>";
	$('.med_ani_part_list').live('click', function () {			
		window.open("./seniorsearch?medpart=" + $(this).text() + "&type=med&pageno=1");
	});
	
	//初始化性味
	tempArray = new Array("辛","苦","温","热","平","咸","凉","寒","甘","涩","酸","有毒","无毒");
	
	table += "<tr><td class='c-left-text'>性味:</td><td class='c-right-text'>";
		
	for(var i = 0 ; i < tempArray.length; i++)
		table += "<span class='classify_content_short'><a href='#' class='med_property_list'>" + tempArray[i] + "</a></span>";
	
	table += "</td></tr>";
	$('.med_property_list').live('click', function () {			
		window.open("./seniorsearch?medproperty=" + $(this).text() + "&type=med&pageno=1");
	});
	
	//初始化归经
	tempArray = new Array("心","肝","脾","肺","肾","膀胱","小肠","大肠","胃");
	
	table += "<tr><td class='c-left-text'>归经:</td><td class='c-right-text'>";
		
	for(var i = 0 ; i < tempArray.length; i++)
		table += "<span class='classify_content_short'><a href='#' class='med_tropisw_list'>" + tempArray[i] + "</a></span>";
	
	table += "</td></tr>";
	$('.med_tropisw_list').live('click', function () {			
		window.open("./seniorsearch?medtropisw=" + $(this).text() + "&type=med&pageno=1");
	});
	
	//初始化产地
	tempArray = new Array("北京","上海","黑龙江","吉林","辽宁","天津","安徽","江苏","浙江","陕西","湖北","广东","湖南","甘肃","四川","山东","福建","河南","重庆","云南","河北","江西","山西","贵州","广西","内蒙古","宁夏","青海","新疆","海南","西藏","香港","澳门","台湾");
	
	table += "<tr><td class='c-left-text'>产地:</td><td class='c-right-text'>";
		
	for(var i = 0 ; i < tempArray.length; i++)
		table += "<span class='classify_content_short'><a href='#' class='med_location_list'>" + tempArray[i] + "</a></span>";
	
	table += "</td></tr>";
	$('.med_location_list').live('click', function () {			
		window.open("./seniorsearch?medlocation=" + $(this).text() + "&type=med&pageno=1");
	});
	
	//初始化来源书籍
	tempArray = new Array("中华本草","中国药典");
	table += "<tr><td class='c-left-text'>来源书籍:</td><td class='c-right-text'>";
		
	for(var i = 0 ; i < tempArray.length; i++)
		table += "<span class='classify_content'><a href='#' class='med_book_list'>" + tempArray[i] + "</a></span>";
	
	table += "</td></tr>";
	
	$('.med_book_list').live('click', function () {			
		window.open("./seniorsearch?medbook=" + $(this).text() + "&type=med&pageno=1");
	});
	
	$("#mian-table").html(table + "</table>");
}

function getOriSearchType()
{
	var methodType = "POST";
	var url = "./orisearchtype";
	var contentType = "application/json;charset=utf-8";
	var data = "";
	ajaxFunc(methodType,url,data,contentType,getOriSearchTypeSuccessCB,getSeniorListErrorCB);
}

function getOriSearchTypeSuccessCB(data, textStatus, jqXHR)
{
	var string = '<ul id="navlist"><li><a href="#"  id="classify_med">&nbsp;单味药&nbsp;</a></li>' 
		   + '<li><a href="#" id="classify_chem">&nbsp;化合物&nbsp;</a></li>'
		   + '<li><a href="#" id="current" id="classify_ori">&nbsp;药用动植物&nbsp;</a></li>'
		   + '<li><a href="#" id="classify_pre">&nbsp;方&nbsp;&nbsp;&nbsp;&nbsp;剂&nbsp;</a></li>'
		   + '<li><a href="#" id="classify_dis">&nbsp;疾&nbsp;&nbsp;&nbsp;&nbsp;病&nbsp;</a></li>'
		   + '<li><a href="#" id="classify_syn">&nbsp;证&nbsp;&nbsp;&nbsp;&nbsp;候&nbsp;</a></li></ul>';
	$("#navcontainer").html(string);
	
	table = "";
	table += "<table id='mian-table'><th class='c-left'></th><th class='c-right'></th>"
		  +	"<tr id='ori_plant_tr'><td  class='c-left-text'>植物种类:</td><td class='c-right-text' id='ori_more_plant'>";
	for(var i = 0 ; i < 50; i++)
		table += "<span class='classify_content'><a href='#' class='ori_family_list plant_family_list'>" + data.plantfamily[i] + "</a></span> ";	
	table += "</td></tr><tr><td></td><td class='c-right-text'  id='ori_less_plant_link_td'><a href='#' id='ori_more_plant_link'>更多植物种类</a></td></tr>";
	
	$('#ori_more_plant_link').live('click', function () {
		var temp = "";
		for(var i = 0 ; i < data.plantfamily.length; i++)
			temp += "<span class='classify_content'><a href='#' class='ori_family_list plant_family_list'>" + data.plantfamily[i] + "</a></span>";
		$('#ori_more_plant').html(temp);
		$('#ori_less_plant_link_td').html("<a href='#' class='classify_more_link' id='ori_less_plant_link'>收起</a>");
	});
	
	$('#ori_less_plant_link').live('click', function () {
		var temp = "";
		for(var i = 0 ; i < 50 ; i++)
			temp += "<span class='classify_content'><a href='#' class='ori_family_list plant_family_list'>" + data.plantfamily[i] + "</a></span>";
		$('#ori_more_plant').html(temp);
		$('#ori_less_plant_link_td').html("<td class='c-right-text'  id='ori_less_plant_link_td'><a href='#' class='classify_more_link' id='ori_more_plant_link'>更多植物种类</a></td>");
	});
	
	table += "<tr><td  class='c-left-text'>动物种类:</td><td class='c-right-text' id='ori_more_animal'>";
	for(var i = 0 ; i < 50; i++)
		table += "<span class='classify_content'><a href='#' class='ori_family_list animal_family_list'>" + data.animalfamily[i] + "</a></span>";	
	table += "</td></tr><tr><td></td><td class='c-right-text'  id='ori_less_animal_link_td'><a href='#' id='ori_more_animal_link'>更多动物种类</a></td></tr>";
	
	$('#ori_more_animal_link').live('click', function () {
		var temp = "";
		for(var i = 0 ; i < data.animalfamily.length; i++)
			temp += "<span class='classify_content'><a href='#' class='ori_family_list animal_family_list'>" + data.animalfamily[i] + "</a></span>";
		$('#ori_more_animal').html(temp);
		$('#ori_less_animal_link_td').html("<a href='#' class='classify_more_link' id='ori_less_animal_link'>收起</a>");
	});
	
	$('#ori_less_animal_link').live('click', function () {
		var temp = "";
		for(var i = 0 ; i < 50 ; i++)
			temp += "<span class='classify_content'><a href='#' class='ori_family_list animal_family_list'>" + data.animalfamily[i] + "</a></span>";
		$('#ori_more_animal').html(temp);
		$('#ori_less_animal_link_td').html("<a href='#' class='classify_more_link' id='ori_more_animal_link'>更多动物种类</a>");
	});
	
	$("#mian-table").html(table + "</table>");
	
	$('.animal_family_list').live('click', function () {			
    	window.open("./seniorsearch?family=" + $(this).text() + "&type=orimed&pageno=1&familytype=animal");
	});
	
	$('.plant_family_list').live('click', function () {			
		window.open("./seniorsearch?family=" + $(this).text() + "&type=orimed&pageno=1&familytype=plant");
	});
	
	window.location.hash = "#home_type_nav";
}

function getSynSearchType()
{
	 var dataJson = 
	{
	};
	var methodType = "POST";
	var url = "./synsearchtype";
	var contentType = "application/json;charset=utf-8";
	var data = "";
	ajaxFunc(methodType,url,data,contentType,getSynSearchTypeSuccessCB,getSeniorListErrorCB);
}

function getSynSearchTypeSuccessCB(data, textStatus, jqXHR)
{
	var string = '<ul id="navlist"><li><a href="#"  id="classify_med">&nbsp;单味药&nbsp;</a></li>' 
		   + '<li><a href="#" id="classify_chem">&nbsp;化合物&nbsp;</a></li>'
		   + '<li><a href="#" id="classify_ori">&nbsp;药用动植物&nbsp;</a></li>'
		   + '<li><a href="#" id="classify_pre">&nbsp;方&nbsp;&nbsp;&nbsp;&nbsp;剂&nbsp;</a></li>'
		   + '<li><a href="#" id="classify_dis">&nbsp;疾&nbsp;&nbsp;&nbsp;&nbsp;病&nbsp;</a></li>'
		   + '<li><a href="#" id="current" id="classify_syn">&nbsp;证&nbsp;&nbsp;&nbsp;&nbsp;候&nbsp;</a></li></ul>';
	$("#navcontainer").html(string);
	table = "";
	table += "<table id='mian-table'><th class='c-left'></th><th class='c-right'></th>"
		  +	"<tr><td  class='c-left-text'>证候种类:</td><td class='c-right-text'>";
	for(var i = 0 ; i < data.synclass.length; i++)
		table += "<span class='classify_content'><a href='#' class='syn_class_list'>" + data.synclass[i] + "</a></span>";
	
	table += "</td></tr></table>";
	$("#mian-table").html(table);
	
	$('.syn_class_list').live('click', function () {			
    	window.open("./seniorsearch?synclass=" + $(this).text() + "&type=syn&pageno=1");
	});
	
	window.location.hash = "#home_type_nav";
}

function getDisSearchType()
{
	 var dataJson = 
	{
	};
	var methodType = "POST";
	var url = "./dissearchtype";
	var contentType = "application/json;charset=utf-8";
	var data = "";
	ajaxFunc(methodType,url,data,contentType,getDisSearchTypeSuccessCB,getSeniorListErrorCB);
}

function getDisSearchTypeSuccessCB(data, textStatus, jqXHR)
{
	var string = '<ul id="navlist"><li><a href="#"  id="classify_med">&nbsp;单味药&nbsp;</a></li>' 
		   + '<li><a href="#" id="classify_chem">&nbsp;化合物&nbsp;</a></li>'
		   + '<li><a href="#" id="classify_ori">&nbsp;药用动植物&nbsp;</a></li>'
		   + '<li><a href="#" id="classify_pre">&nbsp;方&nbsp;&nbsp;&nbsp;&nbsp;剂&nbsp;</a></li>'
		   + '<li><a href="#" id="current" id="classify_dis">&nbsp;疾&nbsp;&nbsp;&nbsp;&nbsp;病&nbsp;</a></li>'
		   + '<li><a href="#" id="classify_syn">&nbsp;证&nbsp;&nbsp;&nbsp;&nbsp;候&nbsp;</a></li></ul>';
	$("#navcontainer").html(string);
	
	table = "";
	table += "<table id='mian-table'><th class='c-left'></th><th class='c-right'></th>"
		  +	"<tr><td  class='c-left-text'>疾病种类:</td><td class='c-right-text'>";
	for(var i = 0 ; i < data.disclass.length; i++)
		table += "<span class='classify_content_long'><a href='#' class='dis_class_list'>" + data.disclass[i] + "</a></span>";
	
	table += "</td></tr></table>";
	$("#mian-table").html(table);
	
	$('.dis_class_list').live('click', function () {			
    	window.open("./seniorsearch?disclass=" + $(this).text() + "&type=dis&pageno=1");
	});
	window.location.hash = "#home_type_nav";
}

/*初始化组合查询*/
function initSeniorSearch(){
	
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
	var string = '<ul id="navlist"><li><a href="#" id="current"  id="senior_med">&nbsp;单味药&nbsp;</a></li>' 
		   + '<li><a href="#" id="senior_chem">&nbsp;化合物&nbsp;</a></li>'
		   + '<li><a href="#" id="senior_ori">&nbsp;药用动植物&nbsp;</a></li>'
		   + '<li><a href="#" id="senior_pre">&nbsp;方&nbsp;&nbsp;&nbsp;&nbsp;剂&nbsp;</a></li>'
		   + '<li><a href="#" id="senior_dis">&nbsp;疾&nbsp;&nbsp;&nbsp;&nbsp;病&nbsp;</a></li>'
		   + '<li><a href="#" id="senior_syn">&nbsp;证&nbsp;&nbsp;&nbsp;&nbsp;候&nbsp;</a></li></ul>';
	$("#navcontainer").html(string);
	
	var content = '<span class="s-title fj"> 名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：&nbsp;'
				+ '<input name="fjone" class="senior_input" id="med_name"/></span>'
			    + '<span class="s-title fj"> 功&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;效：&nbsp;'
			    + '<select id="med_function" class="senior_option_select senior_input"></select></span>'
				+ '<span class="s-title"> 性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;味：&nbsp;'
			    + '<select id="med_property" class="senior_option_select senior_input"></select></span>'
				+ '<span class="s-title fj"> 药用部位：&nbsp;'
			    + '<select id="med_part" class="senior_option_select senior_input"></select></span>'
			    + '<span class="s-title"> 产&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地：&nbsp;'
			    + '<select id="med_location" class="senior_option_select senior_input"></select></span>'
			    + '<span class="s-title fj"> 归&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;经：&nbsp;'
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
	
	tempArray = new Array("全草","根","茎","叶","花","果实","种子","分泌物","卵","幼虫","肉","骨骼","全体","壳","胆");
	var option = "";
	for(var i = 0 ; i < tempArray.length; i++){
		option += "<option value='" + tempArray[i] + "'>" + tempArray[i] + "</option>";
	}
	$("#med_part").html(option);
	overhiddenSelectByInput("med_part");
	
	//初始化性味
	tempArray = new Array("辛","苦","温","热","平","咸","凉","寒","甘","涩","酸","有毒","无毒");
	var option = "";
	for(var i = 0 ; i < tempArray.length; i++){
		option += "<option value='" + tempArray[i] + "'>" + tempArray[i] + "</option>";
	}
	$("#med_property").html(option);
	overhiddenSelectByInput("med_property");
	
	//初始化归经
	tempArray = new Array("心","肝","脾","肺","肾","膀胱","小肠","大肠","胃");
	var option = "";
	for(var i = 0 ; i < tempArray.length; i++){
		option += "<option value='" + tempArray[i] + "'>" + tempArray[i] + "</option>";
	}
	$("#med_tropisw").html(option);
	overhiddenSelectByInput("med_tropisw");
	
	//初始化产地
	tempArray = new Array("北京","上海","黑龙江","吉林","辽宁","天津","安徽","江苏","浙江","陕西","湖北","广东","湖南","甘肃","四川","山东","福建","河南","重庆","云南","河北","江西","山西","贵州","广西","内蒙古","宁夏","青海","新疆","海南","西藏","香港","澳门","台湾");
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
	var string = '<ul id="navlist"><li><a href="#"  id="senior_med">&nbsp;单味药&nbsp;</a></li>' 
		   + '<li><a href="#" id="current" id="senior_chem">&nbsp;化合物&nbsp;</a></li>'
		   + '<li><a href="#" id="senior_ori">&nbsp;药用动植物&nbsp;</a></li>'
		   + '<li><a href="#" id="senior_pre">&nbsp;方&nbsp;&nbsp;&nbsp;&nbsp;剂&nbsp;</a></li>'
		   + '<li><a href="#" id="senior_dis">&nbsp;疾&nbsp;&nbsp;&nbsp;&nbsp;病&nbsp;</a></li>'
		   + '<li><a href="#" id="senior_syn">&nbsp;证&nbsp;&nbsp;&nbsp;&nbsp;候&nbsp;</a></li></ul>';
	$("#navcontainer").html(string);
	
	var content = '<span class="s-title fj"> 名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：&nbsp;'
				+ '<input name="fjone" class="senior_input" id="chem_name"/></span>'
				+ '<span class="s-title"> 分&nbsp;&nbsp;子&nbsp;&nbsp;&nbsp;式：&nbsp;'
			    + '<input name="fjone" class="senior_input" id="formula" /></span>'
				+ '<span class="s-title fj"> CAS号：&nbsp;'
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
	var string = '<ul id="navlist"><li><a href="#"  id="senior_med">&nbsp;单味药&nbsp;</a></li>' 
		   + '<li><a href="#" id="senior_chem">&nbsp;化合物&nbsp;</a></li>'
		   + '<li><a href="#" id="current" id="senior_ori">&nbsp;药用动植物&nbsp;</a></li>'
		   + '<li><a href="#" id="senior_pre">&nbsp;方&nbsp;&nbsp;&nbsp;&nbsp;剂&nbsp;</a></li>'
		   + '<li><a href="#" id="senior_dis">&nbsp;疾&nbsp;&nbsp;&nbsp;&nbsp;病&nbsp;</a></li>'
		   + '<li><a href="#" id="senior_syn">&nbsp;证&nbsp;&nbsp;&nbsp;&nbsp;候&nbsp;</a></li></ul>';
	$("#navcontainer").html(string);
	
	var content = '<span class="s-title fj"> 名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：&nbsp;'
				+ '<input name="fjone" class="senior_input" id="ori_name"/></span>'
				+ '<span class="s-title"> 科&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;属：&nbsp;'
			    + '<input name="fjone" class="senior_input" id="ori_family" /></span>'
				+ '<span class="s-title"> 形&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：&nbsp;'
			    + '<input name="fjone" class="senior_input" id="ori_appearance" /></span>'
				+ '<span class="s-title fj"> 资源分布：&nbsp;'
			    + '<input name="fjone" class="senior_input" id="ori_location" /></span>'
				+ '<span class="s-title"> 生态环境：&nbsp;'
			    + '<input name="fjone" class="senior_input" id="ori_environment" /></span>'
				+ '<span class="s-title"> 栽培采收：&nbsp;'
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
	var string = '<ul id="navlist"><li><a href="#"  id="senior_med">&nbsp;单味药&nbsp;</a></li>' 
		   + '<li><a href="#" id="senior_chem">&nbsp;化合物&nbsp;</a></li>'
		   + '<li><a href="#" id="senior_ori">&nbsp;药用动植物&nbsp;</a></li>'
		   + '<li><a href="#" id="senior_pre">&nbsp;方&nbsp;&nbsp;&nbsp;&nbsp;剂&nbsp;</a></li>'
		   + '<li><a href="#" id="senior_dis">&nbsp;疾&nbsp;&nbsp;&nbsp;&nbsp;病&nbsp;</a></li>'
		   + '<li><a href="#" id="current" id="senior_syn">&nbsp;证&nbsp;&nbsp;&nbsp;&nbsp;候&nbsp;</a></li></ul>';
	$("#navcontainer").html(string);
	
	var content = '<span class="s-title fj"> 名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：&nbsp;'
				+ '<input name="fjone" class="senior_input" id="syn_name"/></span>'
				+ '<span class="s-title"> 简&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;介：&nbsp;'
			    + '<input name="fjone" class="senior_input" id="syn_summary" /></span>'
				+ '<span class="s-title fj"> 临床表现：&nbsp;'
			    + '<input name="fjone" class="senior_input" id="syn_symptom" /></span>'
				+ '<span class="s-title"> 常见病症：&nbsp;'
			    + '<input name="fjone" class="senior_input" id="syn_illness" /></span>'
				+ '<span class="s-title"> 类证辨析：&nbsp;'
			    + '<input name="fjone" class="senior_input" id="syn_discrimination" /></span>'
			    + '<span class="s-title fj"> 分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;类：&nbsp;'
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
	var string = '<ul id="navlist"><li><a href="#"  id="senior_med">&nbsp;单味药&nbsp;</a></li>' 
		   + '<li><a href="#" id="senior_chem">&nbsp;化合物&nbsp;</a></li>'
		   + '<li><a href="#" id="senior_ori">&nbsp;药用动植物&nbsp;</a></li>'
		   + '<li><a href="#" id="current" id="senior_pre">&nbsp;方&nbsp;&nbsp;&nbsp;&nbsp;剂&nbsp;</a></li>'
		   + '<li><a href="#" id="senior_dis">&nbsp;疾&nbsp;&nbsp;&nbsp;&nbsp;病&nbsp;</a></li>'
		   + '<li><a href="#" id="senior_syn">&nbsp;证&nbsp;&nbsp;&nbsp;&nbsp;候&nbsp;</a></li></ul>';
	$("#navcontainer").html(string);
	
	var content = '<span class="s-title fj"> 名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：&nbsp;'
				+ '<input name="fjone" class="senior_input" id="pre_name"/></span>'
				+ '<span class="s-title"> 禁&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;忌：&nbsp;'
			    + '<input name="fjone" class="senior_input" id="pre_attention" /></span>'
				+ '<span class="s-title fj"> 方剂组成：&nbsp;'
			    + '<input name="fjone" class="senior_input" id="pre_dosage" /></span>'
				+ '<span class="s-title"> 功&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;效：&nbsp;'
			    + '<input name="fjone" class="senior_input" id="pre_function" /></span>'
				+ '<span class="s-title"> 方剂出处：&nbsp;'
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
	var string = '<ul id="navlist"><li><a href="#"  id="senior_med">&nbsp;单味药&nbsp;</a></li>' 
		   + '<li><a href="#" id="senior_chem">&nbsp;化合物&nbsp;</a></li>'
		   + '<li><a href="#" id="senior_ori">&nbsp;药用动植物&nbsp;</a></li>'
		   + '<li><a href="#" id="senior_pre">&nbsp;方&nbsp;&nbsp;&nbsp;&nbsp;剂&nbsp;</a></li>'
		   + '<li><a href="#" id="current" id="senior_dis">&nbsp;疾&nbsp;&nbsp;&nbsp;&nbsp;病&nbsp;</a></li>'
		   + '<li><a href="#" id="senior_syn">&nbsp;证&nbsp;&nbsp;&nbsp;&nbsp;候&nbsp;</a></li></ul>';
	$("#navcontainer").html(string);
	
	var content = '<span class="s-title fj"> 名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：&nbsp;'
				+ '<input name="fjone" class="senior_input" id="dis_name"/></span>'
				+ '<span class="s-title"> 描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：&nbsp;'
			    + '<input name="fjone" class="senior_input" id="dis_description" /></span>'
			    + '<span class="s-title fj"> 分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;类：&nbsp;'
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

	while (value.charAt(value.length - 1) == ' ' || value.charAt(value.length - 1) == ' ' || value.charAt(value.length - 1) == '　') {
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
}