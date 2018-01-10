// define the variables
var NZBselection = "",
	NZBtitle = "",
	NZBheader = "",
	NZBpassword = "",
	NZBgroup = "",
	NZBlink = "",
	lines = "";

// get html source from selected text and replace input tags by their value
NZBselection = getSelectionHtml().replace(/<input.+?value\s*?=\s*?['"](.*?)['"].*?>/gi, '$1');

// remove all tags, blank lines and leading/trailing spaces
NZBselection = jQuery(NZBselection).text().replace(/^\s*([\s|\S]*?)\s*?$/gm, '$1');

// split text per line into an array
lines = NZBselection.split("\n");

// set the title to the first line, replace spaces with periods and remove quotation marks
NZBtitle = lines[0].replace(/[\s]/g, ".").replace(/['"]/g, "");

// loop through the further lines to get header and password
for (i = 1; i < lines.length; i++) {
	if (lines[i].match(/^(head[er]{0,2}|subje[ck]t)\s*:*\s*/i)) {
		NZBheader = lines[i].replace(/^(head[er]{0,2}|subje[ck]t)\s*:*\s*/i, "").trim();
		// if header is empty check next line
		if (NZBheader === "" && i + 1 < lines.length && lines[i+1].trim() !== "") {
			NZBheader = lines[++i].trim(); // make sure to skip next line since we already consumed it
		}
	}
	if (lines[i].trim().match(/^passwor[td]\s*:*\s*/i)) {
		NZBpassword = lines[i].replace(/^passwor[td]\s*:*\s*/i, "").trim();
		// if password is empty check next line
		if (NZBpassword === "" && i + 1 < lines.length && lines[i+1].trim() !== "") {
			NZBpassword = lines[++i].trim(); // make sure to skip next line since we already consumed it
		}
	}
}

// get the groups if any and join them to a string with line breaks
if (NZBselection.match(/alt\.[a-z0-9.+_-]*/ig)) {
	NZBgroup = NZBselection.match(/alt\.[a-z0-9.+_-]*/ig).join('\n');
}

// generate the NZBlink
NZBlink = generateNZBLink(NZBtitle, NZBheader, NZBpassword, NZBgroup)

// start the overlay
$.prompt({
	state0: {
		title: "NZBLinker",
		html: '<label class="linker" for="NZBtitle">Titel:</label><span class="linker"><input type="text" id="NZBtitle" name="ftitle" value="' + NZBtitle + '"/></span><br/>'
			+ '<label class="linker" for="NZBheader">Header:</label><span class="linker"><input type="text" id="NZBheader" name="fhead" value="' + NZBheader + '"/></span><br/>'
			+ '<label class="linker" for="NZBpassword">Passwort:</label><span class="linker"><input type="text" id="NZBpassword" name="fpass" value="' + NZBpassword + '"/></span><br/>'
			+ '<label class="linker" for="NZBgroup">Gruppe(n) (eine Gruppe pro Linie):</label><span class="linker"><textarea id="NZBgroup" name="fgroup" rows="4">' + NZBgroup + '</textarea></span><br/>'
			+ '<label class="linker" for="NZBselection">Markierter Text:</label><span class="linker"><textarea id="NZBselection" rows="7">' + NZBselection + '</textarea></span><br/>'
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

// jQuery functions to check if inputs are changed and call the updateNZBLink function
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

// function to update the NZBLink field
function updateNZBLink() {
	$("#NZBlink").val(generateNZBLink($("#NZBtitle").val(), $("#NZBheader").val(), $("#NZBpassword").val(), $("#NZBgroup").val()));
}

// function to generate the NZBLink
function generateNZBLink(title, header, password, group) {
	// sanitize title
	var cleanTitle = title.normalize('NFD').replace(/[^\x20-\x7E]/g, "").replace(/[/\\?%*:|"<>]/g, "");

	var groups = "";
		
	// repeat the 'g' parameter for each mentioned group if any
	if (group) {
		group = group.split('\n');
		for (i = 0; i < group.length; i++) {
			groups = groups + "&g=" + encodeURIComponent(group[i]);
		}
	}

	// return the link
	return "nzblnk:?t=" + encodeURIComponent(cleanTitle)
						+ "&h=" + encodeURIComponent(header)
						+ "&p=" + encodeURIComponent(password)
						+ groups
}

// function to get the html from the selection
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
    }
    return '<div>' + html + '</div>'; // encapsulate with a div container otherwise jQuery.text() will remove plain text
}