// define the variables
var NZBselection = "",
	NZBtitle = "",
	NZBheader = "",
	NZBpassword = "",
	NZBgroup = "",
	NZBlink = "";

// get html source from the selected text and replace input tags by their value
// encapsulate the value with line breaks to make sure it is on a single line
NZBselection = getSelectionHtml().replace(/<input.+?value\s*?=\s*?['"](.*?)['"].*?>/ig, "\n$1\n");

// add some line breaks to some ending tags to avoid text rendered on different lines to be joined in one line
NZBselection = NZBselection.replace(/(<\/div>|<\/span>|<\/p>|<\/td>|<\/li>)/ig, "$1\n");

// remove all tags, blank lines and leading/trailing spaces
NZBselection = jQuery(NZBselection).text().replace(/^\s*([\s|\S]*?)\s*?$/mg, "$1");

// test if the selection contains a description for the header starting with some common words used for and ending with a colon
if (/^(header|subje[ck]t|betreff).*:\s*/im.test(NZBselection)) {
	// set the header to the text after the description
	// we search for any text until we find it and then get all of it until the next line break
	// like this we will find the header information either if placed on the same line or if placed on the next line
	// we also take care of if the description is used twice (e.g. before the hidden tag and in the hidden tag again)
	NZBheader = NZBselection.match(/^((header|subje[ck]t|betreff).*:\s*)+(\S.*\S)[\n|\r]/im)[3];
}

// test if the selection contains a NZB file name in the format of nzbfilename{{password}}
// we first assume that the NZB file name is on its own line
if (/^(.*){{(.*?)}}/m.test(NZBselection)) {
	// set the title and password according to the NZB filename
	NZBtitle = NZBselection.match(/^(.*){{(.*?)}}/m)[1]; 
	NZBpassword = NZBselection.match(/^(.*){{(.*?)}}/m)[2];
	// check if maybe there is nevertheless a leading description and remove it from the title
	// assuming that the leading description includes the word NZB and ends with a colon
	if (/.*nzb.*:\s*/i.test(NZBtitle)) {
		NZBtitle = NZBtitle.replace(/.*nzb.*:\s*/i, "");
	}
}
// if no NZB file name was found the title and password have to be set by another way
else {
	// in this case simply set title to the first line of the selection
	NZBtitle = NZBselection.split("\n")[0];

	// test if the selection contains a description for the password starting with some common words used for and ending with a colon
	if (/^(passwor[td]|pw).*:\s*/im.test(NZBselection)) {
		// set the password to the text after the description
		// we search for any text until we find it and then get all of it until the next line break
		// like this we will find the password either if placed on the same line or if placed on the next line
		// we also take care of if the description is used twice (e.g. before the hidden tag and in the hidden tag again)
		NZBpassword = NZBselection.match(/^((passwor[td]|pw).*:\s*)+(\S.*\S)[\n|\r]/im)[3];
	}
}

// test if the selection contains usenet group names in the format alt.xyz or a.b.xyz
if (/\b(alt|a\.b)(\.[a-z0-9.+_-]*\b)/i.test(NZBselection)) {
	// get all usenet group names in the format alt.xyz or a.b.xyz and join them to a string with line breaks
	NZBgroup = NZBselection.match(/\b(alt|a\.b)(\.[a-z0-9.+_-]*\b)/ig).join("\n");
	// if the abbreviation a.b. is used replace it by alt.binaries.
	NZBgroup = NZBgroup.replace(/^a\.b\./img, "alt.binaries.");
}

// generate the NZBlink
NZBlink = generateNZBLink(NZBtitle, NZBheader, NZBpassword, NZBgroup);

// start the overlay
$.prompt({
	state0: {
		title: "NZBLinker",
		html: '<label class="linker" for="NZBtitle">Titel:</label><span class="linker"><input type="text" id="NZBtitle" name="ftitle" value="' + NZBtitle + '"/></span><br/>'
			+ '<label class="linker" for="NZBheader">Header:</label><span class="linker"><input type="text" id="NZBheader" name="fhead" value="' + NZBheader + '"/></span><br/>'
			+ '<label class="linker" for="NZBpassword">Passwort:</label><span class="linker"><input type="text" id="NZBpassword" name="fpass" value="' + NZBpassword + '"/></span><br/>'
			+ '<label class="linker" for="NZBgroup">Gruppe(n) (eine Gruppe pro Zeile):</label><span class="linker"><textarea id="NZBgroup" name="fgroup" rows="4">' + NZBgroup + '</textarea></span><br/>'
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
$("#NZBtitle").on("change keydown paste input", function(){
	updateNZBLink();
});

$("#NZBheader").on("change keydown paste input", function(){
	updateNZBLink();
});

$("#NZBpassword").on("change keydown paste input", function(){
	updateNZBLink();
});

$("#NZBgroup").on("change keydown paste input", function(){
	updateNZBLink();
});

// function to update the NZBLink field
function updateNZBLink() {
	$("#NZBlink").val(generateNZBLink($("#NZBtitle").val(), $("#NZBheader").val(), $("#NZBpassword").val(), $("#NZBgroup").val()));
}

// function to generate the NZBLink
function generateNZBLink(title, header, password, group) {
	// sanitize title
	var cleanTitle = title.normalize("NFD").replace(/[^\x20-\x7E]/g, "").replace(/[/\\?%*:|"<>]/g, "");

	var groups = "";
		
	// repeat the 'g' parameter for each mentioned group if any
	if (group) {
		group = group.split("\n");
		for (i = 0; i < group.length; i++) {
			groups = groups + "&g=" + encodeURIComponent(group[i].replace(/^a\.b\./img, "alt.binaries.")); // if the abbreviation a.b. is used (e.g. if entered manually in the groups field) replace with alt.binaries.
		}
	}

	// return the link
	return "nzblnk:?t=" + encodeURIComponent(cleanTitle)
						+ "&h=" + encodeURIComponent(header)
						+ "&p=" + encodeURIComponent(password)
						+ groups;
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
	return "<div>" + html + "</div>"; // encapsulate with a div container otherwise jQuery.text() will remove plain text
}