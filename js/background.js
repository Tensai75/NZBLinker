chrome.contextMenus.create({
    id: "NZBLContextMenu",
    title: chrome.i18n.getMessage('extNZBCreateLink'),
    contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (tab) {
		chrome.tabs.insertCSS(tab.id, {
            file: "/css/jquery.modal.css"
        });
		chrome.tabs.executeScript(tab.id, { file: "/js/jquery-3.3.1.js" }, function() {
            chrome.tabs.executeScript(tab.id, { file: "/js/jquery.modal.js" }, function() {
                chrome.tabs.executeScript(tab.id, { file: "/js/content.js" });
            });
        });
	};
});

chrome.browserAction.onClicked.addListener(function() {
    chrome.windows.getCurrent(function(win) {
        var width = 540;
        var height = 680;
        var left = ((win.width / 2) - (width / 2)) + win.left;
        var top = ((screen.height / 2) - (height / 2));
        chrome.windows.create({
            url: '/html/popup.html',
            width: width,
            height: height,
            top: Math.round(top),
            left: Math.round(left),
            type: 'popup'
        });
    });
});