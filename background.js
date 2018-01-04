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
		
		var myCode = 'var str = window.getSelection().toString();' +
					 'var header = "";' +
					 'var password = "";' +
					 'splitStr = str.split("\\n");' +
					 'for (i = 0; i < splitStr.length; i++) {' +
					 '	if (splitStr[i].toLowerCase().includes("head")) {' +
					 '		header = splitStr[i].replace(/header:/gi, "")};' +
					 '	if (splitStr[i].toLowerCase().includes("pass")) {' +
					 '		password = splitStr[i].replace(/passwort:/gi, "")};' +
					 '}' +
					 
					 'var genLinkForm = {' + 
					 'state0: {' +
					 'title: "NZBLinker",' + 
					 'html: "<label>Titel       <input type=text name=fname value=" + splitStr[0].replace(/ /g,".") + "></label><br><label>Header   <input type=text name=fhead value=" + header + "></label><br><label>Passwort <input type=text name=fpass value=" + password + "></label><br><label>Debug     <textarea rows=8 cols=40>" + str + "</textarea>",' +
					 
					 'buttons: { "OK": true},' + 
					 'submit:function(e,v,m,f){' +
					 'var newURL = "nzblnk:?t=" + f.fname + "&h=" + f.fhead + "&p=" + f.fpass;' +
					 '	console.log(newURL);' +
					 '	window.open(newURL,"_self")' +
					 '}' +
					 '}};' + 
					 
					 '$.prompt(genLinkForm);';
		
		chrome.tabs.executeScript( {
			code: myCode
		} );
	};
});