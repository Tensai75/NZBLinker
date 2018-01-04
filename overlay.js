var selection = window.getSelection().toString(),
	lines = selection.split("\n"),
	name = lines[0].replace(/[\s]/g, ".").replace(/['"]/g, "").trim().replace(/[^\x20-\x7E]+/g, ""),
	header = "",
	password = "";

for (i = 1; i < lines.length; i++) {
	if (lines[i].toLowerCase().includes("head")) {
		header = lines[i].replace(/head.*:/gi, "").trim()
	}
	if (lines[i].toLowerCase().includes("pass")) {
		password = lines[i].replace(/passwor[td]:/gi, "").trim()
	}
}

$.prompt({
	state0: {
		title: "NZBLinker",
		html: '<label class="linker" for="name">Titel:</label><span class="linker"><input type="text" id="name" name="fname" value="' + name + '"/></span><br/>'
			+ '<label class="linker" for="header">Header:</label><span class="linker"><input type="text" id="header" name="fhead" value="' + header + '"/></span><br/>'
			+ '<label class="linker" for="pass">Passwort:</label><span class="linker"><input type="text" id="pass" name="fpass" value="' + password + '"/></span><br/>'
			+ '<label class="linker" for="debug">Debug:</label><span class="linker"><textarea id="debug" rows="5" cols="50">' + selection + '</textarea></span><br/>'
			+ '<label class="linker" for="link">Link:</label><span class="linker"><input type="text" id="link" onClick="this.setSelectionRange(0, this.value.length)"/></span>',
		buttons: {
			Create: "create",
			Open: "open",
			Close: "close"
		},
		submit: function(e, v, m, f) {
			if (v === "close") {
				return true;
			}
			var newURL = "nzblnk:?t=" + encodeURIComponent(f.fname) + "&h=" + encodeURIComponent(f.fhead) + "&p=" + encodeURIComponent(f.fpass);
			console.log(newURL);
			if (v === "create") {
				document.getElementById("link").value = newURL;
				e.preventDefault();
			} else if (v === "open") {
				window.open(newURL,"_self");
			}
		}
	}
});
