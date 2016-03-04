chrome.contextMenus.create({
	title: "Translate with Bing",
	contexts: ["selection"],
	onclick: clickHandler
});

function clickHandler (data, tab) {
	chrome.windows.create({
		url: "popup.html",
		type: "panel"
	});
	chrome.runtime.sendMessage({
		to: "popup",
		data: data.selectionText
	}, function(response){
		alert(response.res);
	});
	var b = true;
	chrome.extension.onConnect.addListener(function(port) {
		port.postMessage({contextMenu: b, data: data.selectionText});
		b = false;
	});
}