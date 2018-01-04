chrome.contextMenus.create({
    id: "NZBLContextMenu",
    title: "NZBLink erstellen",
    contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (tab) {
		chrome.tabs.insertCSS(tab.id, {
            file: "jquery-impromptu.css"
        });

		chrome.tabs.executeScript(tab.id, {
			file: "overlay.js"
		} );
	};
});
