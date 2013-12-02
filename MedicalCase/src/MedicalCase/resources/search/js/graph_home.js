
$(function() {
	
	$('#front_btn').live(
			'click',
			function() {
				var keyword = $('#front_input').val();
				
				var dataJson = {
						"keyword" : keyword
					};
				
				var url = "./graphresultlist";
				$.ajax({
					  type: 'POST',
					  url: url,
					  data: dataJson,
					  success: getFrontListSuccessCB,
					  error:getFrontErrorCB,
					  dataType:'text'
					});
				
			});

});




function getFrontListSuccessCB(data,textStatus,jqXHR) {
    
    alert("received");
    window.location.href='index';
    
}

function getFrontErrorCB(){
	alert("Error");
}