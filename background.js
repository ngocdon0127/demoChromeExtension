chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	// $('#text').text(request.para);
	// $('#text').val(request.para);
	// translate();
	sendResponse({res: "hihi"});
});

chrome.contextMenus.create({
	title: "Translate with Bing",
	contexts: ["selection"],
	onclick: clickHandler
});

function clickHandler (data, tab) {
	chrome.windows.create({
		url: "popup.html"
	});
	chrome.runtime.sendMessage({
		to: "popup",
		data: data.selectionText
	}, function(response){
		alert(response.res);
	});
	// var views = chrome.extension.getViews({type: 'popup'});
	// for (var i = 0; i < views.length; i++) {
	// 	views[i].document.getElementById('text').value = 'hehe';
	// 	views[i].document.getElementById('text').innerHTML = 'hehe';
	// };
	chrome.extension.onConnect.addListener(function(port) {
		console.log("Connected .....");
		port.onMessage.addListener(function(msg) {
			console.log("message recieved"+ msg);
			port.postMessage(data.selectionText);
		});
	});
}






// var contextsList = ["selection", "link", "image", "page"];

// for (var i = 0; i < contextsList.length; i++) {
// 	chrome.contextMenus.create({
// 		title: "Quick Translation " + contextsList[i],
// 		contexts: [contextsList[i]],
// 		onclick: contextClicked,
// 		id: contextsList[i]
// 	});
// };



// function contextClicked(data, tab) {
// 	var urlTwitter = 'https://twitter.com/intent/tweet?text=';
// 	switch (data.menuItemId){
// 		case contextsList[0]:
// 			urlTwitter = "https://twitter.com/intent/tweet?text=" + data.selectionText;
// 			break;
// 		case contextsList[1]:
// 			urlTwitter = "https://twitter.com/intent/tweet?url=" + data.linkUrl;
// 			break;
// 		case contextsList[2]:
// 			urlTwitter = "https://twitter.com/intent/tweet?url=" + data.srcUrl;
// 			break;
// 		case contextsList[3]:
// 			// My solution: send message to content-scripts to get title + url.
// 			// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
// 			// 	chrome.tabs.sendMessage(tabs[0].id, {typeMessage: "getLocation"}, function(response) {
// 			// 		console.log(response.l);
// 			// 		alert(response.url.href);
// 			// 		urlTwitter = "https://twitter.com/intent/tweet?url=" + response.url.href + "&text=" + response.title;
// 			// 		chrome.windows.create({
// 			// 			url: urlTwitter,
// 			// 			type: "panel"
// 			// 		});
// 			// 	});
// 			// });
// 			// return;
// 			// End of my solution

// 			// Good solution:
// 			urlTwitter = "https://twitter.com/intent/tweet?url=" + data.pageUrl + "&text=" + tab.title;
// 			break;
// 	}
// 	chrome.windows.create({
// 		url: urlTwitter,
// 		type: "panel"
// 	});
// 	// alert(s.selectionText);
// }