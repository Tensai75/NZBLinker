var NZBselection = window.getSelection().toString(),
	lines = NZBselection.split("\n"),
	NZBtitle = lines[0].replace(/[\s]/g, ".").replace(/['"]/g, "").trim(),
	NZBheader = "",
	NZBpassword = "",
	NZBgroup = "",
	NZBlink = "";

for (i = 1; i < lines.length; i++) {
	if (lines[i].trim().toLowerCase().match(/^head.*(:|\s)/)) {
		NZBheader = lines[i].trim().replace(/^head.*(:|\s)/gi, "").trim()
	}
	if (lines[i].trim().toLowerCase().match(/^passwor[td](:|\s)/)) {
		NZBpassword = lines[i].trim().replace(/^passwor[td](:|\s)/gi, "").trim()
	}
	if (lines[i].trim().toLowerCase().match(/^(group|gruppe).*(:|\s)/)) {
		NZBgroup = lines[i].trim().replace(/^(group|gruppe).*(:|\s)/gi, "").trim()
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
