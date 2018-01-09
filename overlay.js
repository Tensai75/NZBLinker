var NZBselection = window.getSelection().toString(),
	lines = NZBselection.split("\n"),
	NZBtitle = lines[0].trim().replace(/[\s]/g, ".").replace(/['"]/g, ""),
	NZBheader = "",
	NZBpassword = "",
	NZBgroup = "",
	NZBlink = "";

for (i = 1; i < lines.length; i++) {
	if (lines[i].trim().match(/^head.?.?(:|\s)/i)) {
		NZBheader = lines[i].trim().replace(/^head.?.?(:|\s)/i, "").trim()
		if (NZBheader === "" && i + 1 < lines.length && lines[i+1].trim() !== "") {
			NZBheader = lines[++i].trim(); // make sure to skip next line since we already consumed it
		}
	}
	if (lines[i].trim().match(/^passwor[td](:|\s)/i)) {
		NZBpassword = lines[i].trim().replace(/^passwor[td](:|\s)/i, "").trim()
		if (NZBpassword === "" && i + 1 < lines.length && lines[i+1].trim() !== "") {
			NZBpassword = lines[++i].trim(); // make sure to skip next line since we already consumed it
		}
	}
	if (lines[i].trim().match(/^(group(s?)|gruppe(n?))(:|\s)/i)) {
		NZBgroup = lines[i].trim().replace(/^(group(s?)|gruppe(n?))(:|\s)/i, "").trim()
		if (NZBgroup === "" && i + 1 < lines.length && lines[i+1].trim() !== "") {
			NZBgroup = lines[++i].trim(); // make sure to skip next line since we already consumed it
		}
	}
}

// if header, password or group are empty check if maybe they are in a input field and try to get them from the value attribute
if ((NZBheader === "" || NZBpassword === "" || NZBgroup === "") && getSelectionHtml().match(/<input/i)) {
	NZBselection = getSelectionHtml() // The selected text will in this case be presented as the html source code
	if (NZBheader === "") {
		NZBheader = NZBselection.replace(/([\S\s]*head.?.?)(:|\s).*<input.*value\s?=\s?("|')/i, "").replace(/("|')[\S\s]*/i, "")
	}
	if (NZBpassword === "") {
		NZBpassword = NZBselection.replace(/[\S\s]*passwor[td](:|\s).*<input.*value\s?=\s?("|')/i, "").replace(/("|')[\S\s]*/i, "")
	}
	if (NZBgroup === "") {
		NZBgropu = NZBselection.replace(/[\S\s]*(group(s?)|gruppe(n?))(:|\s).*<input.*value\s?=\s?("|')/i, "").replace(/("|')[\S\s]*/i, "")
	}
}

NZBlink = generateNZBLink(NZBtitle, NZBheader, NZBpassword, NZBgroup)

$.prompt({
	state0: {
		title: "NZBLinker",
		html: '<label class="linker" for="NZBtitle">Titel:</label><span class="linker"><input type="text" id="NZBtitle" name="ftitle" value="' + NZBtitle + '"/></span><br/>'
			+ '<label class="linker" for="NZBheader">Header:</label><span class="linker"><input type="text" id="NZBheader" name="fhead" value="' + NZBheader + '"/></span><br/>'
			+ '<label class="linker" for="NZBpassword">Passwort:</label><span class="linker"><input type="text" id="NZBpassword" name="fpass" value="' + NZBpassword + '"/></span><br/>'
			+ '<label class="linker" for="NZBgroup">Gruppe:</label><span class="linker"><input type="text" id="NZBgroup" name="fgroup" value="' + NZBgroup + '"/></span><br/>'
			+ '<label class="linker" for="NZBselection">Markierter Text:</label><span class="linker"><textarea id="NZBselection" rows="5" cols="50">' + NZBselection + '</textarea></span><br/>'
			+ '<label class="linker" for="NZBlink">NZBLink:</label><span class="linker"><input type="text" id="NZBlink" name="fnzblink" value="' + NZBlink + '"/></span>',
		buttons: {
			"NZBLink kopieren": "copy",
			"NZBLink öffnen": "open",
			"Schliessen": "close"
		},
		focus: 1,
		submit: function(e, v, m, f) {
			if (v === "close") {
				return true;
			}
			if (v === "copy") {
				$("#NZBlink").select();
				document.execCommand("Copy");
			} else if (v === "open") {
				window.open(f.fnzblink,"_self");
			}
		}
	}
});

$("#NZBtitle").on('change keydown paste input', function(){
	updateNZBLink();
});

$("#NZBheader").on('change keydown paste input', function(){
	updateNZBLink();
});

$("#NZBpassword").on('change keydown paste input', function(){
	updateNZBLink();
});

$("#NZBgroup").on('change keydown paste input', function(){
	updateNZBLink();
});

function updateNZBLink() {
	$("#NZBlink").val(generateNZBLink($("#NZBtitle").val(), $("#NZBheader").val(), $("#NZBpassword").val(), $("#NZBgroup").val()));
}

function generateNZBLink(title, header, password, group) {
	nzblink = "nzblnk:?t=" + encodeURIComponent(title.normalize('NFD').replace(/[^\x20-\x7E]/g, "").replace(/[/\\?%*:|"<>]/g, "")) + "&h=" + encodeURIComponent(header) + "&p=" + encodeURIComponent(password) + "&g=" + encodeURIComponent(group);
	return nzblink;
}

 function getSelectionHtml() {
    var html = "";
    if (typeof window.getSelection != "undefined") {
        var sel = window.getSelection();
        if (sel.rangeCount) {
            var container = document.createElement("div");
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                container.appendChild(sel.getRangeAt(i).cloneContents());
            }
            html = container.innerHTML;
        }
    } else if (typeof document.selection != "undefined") {
        if (document.selection.type == "Text") {
            html = document.selection.createRange().htmlText;
        }
    }
    return html;
}