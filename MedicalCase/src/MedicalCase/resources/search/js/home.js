
$(function() {

	var checkBox = document.getElementsByName("option");
	for ( var k = 0; k < checkBox.length; k++)
		checkBox[k].checked = false;

	

	$('#front_btn').live(
			'click',
			function() {
				var keyword = $('#front_input').val();
				var range = "";
				var typeIndex = -1;
				for ( var k = 0; k < checkBox.length; k++) {
					if (checkBox[k].checked == true) {
						if (typeIndex == -1)
							typeIndex = k;
						range += "1";
					} else
						range += "0";
				}
				if (typeIndex == -1) {
					typeIndex = 0;
					range = "10"
				}
				window.location.href = "./frontsearch?keyword=" + keyword
						+ "&range=" + range + "&pageno=1" + "&type="
						+ typeEnMap[typeIndex];
			});

	window.location.hash = "#home_type_nav";
});

function initFront() {
	var range = getUrlParam("range");
	var type = getUrlParam("type");
	var table = "";
	var lastIndex = range.lastIndexOf("1");
	window.location.hash = "#sub_nav";
	getFrontList();
	
	/*for ( var i = 0; i < range.length; i++)
		if (range[i] == "1") {
			if (type != typeEnMap[i])
				table += "<span><a class='noselected front_tab' href='#' id='front_"
						+ typeEnMap[i] + "_tab'>" + typeChMap[i] + "</span>";
			else
				table += "<span><a class='selected front_tab' href='#' id='front_"
						+ typeEnMap[i] + "_tab'>" + typeChMap[i] + "</span>";

			if (i != lastIndex)
				table += "<a class='noselected front_tab'>|";

		}

	$('#front_menu').html(table);
	getFrontList();

	var urlPrefix = "./frontsearch?keyword="
			+ decodeURI(getUrlParam("keyword")) + "&range="
			+ decodeURI(getUrlParam("range")) + "&pageno=1";

	$('#front_med_tab').live('click', function() {
		window.location.href = urlPrefix + "&type=med";
	});

	$('#front_chem_tab').live('click', function() {
		window.location.href = urlPrefix + "&type=chem";
	});
	$('#front_ori_tab').live('click', function() {
		window.location.href = urlPrefix + "&type=ori";
	});

	$('#front_pre_tab').live('click', function() {
		window.location.href = urlPrefix + "&type=pre";
	});
	$('#front_syn_tab').live('click', function() {
		window.location.href = urlPrefix + "&type=syn";
	});
	$('#front_dis_tab').live('click', function() {
		window.location.href = urlPrefix + "&type=dis";
	});*/

}


function getFrontList() {
	
	type = decodeURI(getUrlParam("type"));
	var dataJson = {
		"keyword" : decodeURI(getUrlParam("keyword")),
		"type" : type,
		"pageno" : parseInt(getUrlParam("pageno")),
		"pagesize" : pageSize
	};
//	var data = JSON.stringify(dataJson);
	var methodType = "POST";
	var url = "./frontresultlist";
	var contentType = "application/json;charset=utf-8";
	//$.post(url, dataJson,success,contentType);
//	ajaxFunc(methodType, url, dataJson, contentType, success,
//			getFrontErrorCB);
	$.ajax({
		  type: 'POST',
		  url: url,
		  data: dataJson,
		  success: getFrontListSuccessCB,
		  error:getFrontErrorCB,
		  dataType:'text'
		});
}



function getFrontListSuccessCB(data,textStatus,jqXHR) {
    
    data=eval('(' + data + ')');
	var typeEn = typeChToEn(decodeURI(getUrlParam("type")));
	var table = listToTable(data.list, typeEn);
	
	$("#front_search_list_title").html(getTableTitle(typeEn));
	$("#front_search_list_info").html(table);
	
	
	if (parseInt(data.count) <= pageSize)
	{
		$("#front_search_pagincation").hide();
		if(parseInt(data.count)==0)
			getFrontErrorCB();
	}
	else
		$("#front_search_pagincation").pagination(
				{
					items : parseInt(data.count),
					itemsOnPage : pageSize,
					cssStyle : 'light-theme',
					hrefTextPrefix : '#',
					onPageClick : function(pageNumber, event) {
						window.location.href = "./frontsearch?keyword="
								+ decodeURI(getUrlParam("keyword")) + "&range="
								+ decodeURI(getUrlParam("range")) + "&pageno="
								+ pageNumber + "&type=" + typeEn;

					},
					prevText : "上一页",
					nextText : "下一页",
					currentPage : getUrlParam("pageno")
				});
}

function getFrontErrorCB(){
	alert("Error");
	window.location.href = "./error";
}