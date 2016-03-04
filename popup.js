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

var port = chrome.extension.connect({name: "Retrieve selection text if exist"});
port.onMessage.addListener(function(msg) {
	if (msg.contextMenu == true){
		$('#text').text(msg.data);
		$('#text').val(msg.data);
		translate();
	}
	// else{
	// 	$('#text').text('');
	// 	$('#text').val('');
	// }
});