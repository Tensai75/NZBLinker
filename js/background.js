// Hier müssen Sie die Event-Listener für die Context Menüs und die Browser Action registrieren
chrome.contextMenus.create({
  id: "NZBLContextMenu",
  title: chrome.i18n.getMessage('extNZBCreateLink'),
  contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (tab) {
    chrome.scripting.insertCSS({
      target: { tabId: tab.id },
      files: ["/css/jquery.modal.css"]
    }).then(() => {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["/js/jquery-3.5.1.js"]
      }).then(() => {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["/js/jquery.modal.js"]
        }).then(() => {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["/js/content.js"]
          });
        });
      });
    });
  }
});

chrome.action.onClicked.addListener(function() {
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
