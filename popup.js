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
			// console.log($(value).find('string').text());
		},
		error: function(){
			$('#error').text('error');
		}
	})
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if (request.to == 'popup'){
		$('#text').text(request.data);
		$('#text').val(request.data);
		translate();
		sendResponse({res: "hehe"});
	}
});

var port = chrome.extension.connect({name: "Sample Communication"});
port.postMessage("Hi BackGround");
port.onMessage.addListener(function(msg) {
	console.log("message recieved"+ msg);
	$('#text').text(msg);
	$('#text').val(msg);
	translate();
});