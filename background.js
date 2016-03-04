// add context menu
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
	var b = true; // detect if user use context menu
	chrome.extension.onConnect.addListener(function(port) {
		port.postMessage({contextMenu: b, data: data.selectionText});
		b = false;
	});
}