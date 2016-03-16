document.addEventListener('DOMContentLoaded', function(){
	console.log('start');
	ob('btnTranslate').addEventListener('click', translate);
});

function ob(x) {
	return document.getElementById(x);
}

function translate() {
	$('#result').text('');
	$('#result').val('');
	ob('result').setAttribute('placeholder', 'Translating...');

	// send AJAX to server to get translation of input
	$.ajax({
		type: 'GET',
		url: 'https://www.evangelsenglish.com/ajax/bing?text=' + $('#text').val(),
		success: function(data){
			var value = $.parseXML(data);
			$('#result').val($(value).find('string').text());
		},
		error: function(){
			$('#error').text('error');
		}
	});
}

// connect to background page
var port = chrome.extension.connect({name: "Retrieve selection text if exist"});
port.onMessage.addListener(function(msg) {

	// if user use context menu
	if (msg.contextMenu == true){
		$('#text').text(msg.data);
		$('#text').val(msg.data);
		translate();
	}
	// if user use browser action
	// else{
	// 	$('#text').text('');
	// 	$('#text').val('');
	// }
});