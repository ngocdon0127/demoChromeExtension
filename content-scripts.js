chrome.runtime.sendMessage({para: "hello world"}, function(response){
	console.log(response.res);
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	alert('received');
	console.log('message received');
	if (request.typeMessage == 'getLocation'){
		console.log('run');
		sendResponse({url: document.location, title: document.getElementsByTagName('title')[0].innerHTML});
	}
	else{
		sendResponse({url: 'lin'});
	}
})