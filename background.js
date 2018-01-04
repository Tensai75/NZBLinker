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
					 'var title = "";' +
					 'splitStr = str.split("\\n");' +
					 'for (i = 0; i < splitStr.length; i++) {' +
					 '	if (splitStr[i].toLowerCase().includes("head")) {' +
					 '		header = splitStr[i].replace(/head.*(:|" ")/gi, "")};' +
					 '	if (splitStr[i].toLowerCase().includes("pass")) {' +
					 '		password = splitStr[i].replace(/pass.*(:|" ")/gi, "")};' +
					 '}' +
					 'header = header.trim();' +
					 'password = password.trim();' +
					 'title = splitStr[0].replace(/ /g,".");' +
					 'title = title.trim();' +
					 'title = title.replace(/[^\x20-\x7E]+/g, "");' +
					 'var genLinkForm = {' + 
					 'state0: {' +
					 'title: "NZBLinker",' + 
					 'html: "<div style=\'width:100%\'><label>Titel<br /><input style=\'width:100%\' type=text name=fname value=\'" + title + "\'></label><br><label>Header<br /><input style=\'width:100%\' type=text name=fhead value=\'" + header + "\'></label><br><label>Password<br /><input style=\'width:100%\' type=text name=fpass value=\'" + password + "\'></label><br><label>Selected text<br /><textarea  style=\'width:100%\' rows=10>" + str + "</textarea></div>",' +				
					 'buttons: { "OK": true},' + 
					 'submit:function(e,v,m,f){' +
					 'var newURL = "nzblnk:?t=" + encodeURIComponent(f.fname) + "&h=" + encodeURIComponent(f.fhead) + "&p=" + encodeURIComponent(f.fpass);' +
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