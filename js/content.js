// define the variables
var nzb = {
    "selection": "",
    "title": "",
    "header": "",
    "password": "",
    "group": "",
    "link": "",
    "convert_spaces": 0
}

// define the storage -> fall back to storage.local if storage.sync is not available
if (chrome && chrome.storage) {
    nzb.storage = chrome.storage.sync ? chrome.storage.sync : chrome.storage.local;
}
        
// get html source from the selected text and replace input tags by their value
// encapsulate the value with line breaks to make sure it is on a single line
nzb.selection = getSelectionHtml().replace(/<input.+?value\s*?=\s*?['"](.*?)['"].*?>/ig, "\n$1\n");

// add some line breaks to some ending tags to avoid text rendered on different lines to be joined in one line
nzb.selection = nzb.selection.replace(/(<\/div>|<\/p>|<\/td>|<\/li>)/ig, "$1\n");

// remove all tags, blank lines and leading/trailing spaces
nzb.selection = jQuery(nzb.selection).text().replace(/^\s*([\s|\S]*?)\s*?$/mg, "$1");

// test if the selection contains a description for the header starting with some common words used for and ending with a colon or a vertical bar
if (/^.*((header|subje[ck]t|betreff|file).*[:|]\s*)+(\S.*\S)$/im.test(nzb.selection)) {
    // set the header to the text after the description
    // we search for any text until we find it and then get all of it until the next line break
    // like this we will find the header information either if placed on the same line or if placed on the next line
    // we also take care of if the description is used twice (e.g. before the hidden tag and in the hidden tag again)
    nzb.header = nzb.selection.match(/^.*((header|subje[ck]t|betreff|file).*[:|]\s*)+(\S.*\S)$/im)[3];
}

// test if the selection contains a NZB file name in the format of nzbfilename{{password}}
// we first assume that the NZB file name is on its own line
if (/^(.*){{(.*?)}}/m.test(nzb.selection)) {
    // set the title and password according to the NZB filename
    nzb.title = nzb.selection.match(/^(.*){{(.*?)}}/m)[1];
    nzb.password = nzb.selection.match(/^(.*){{(.*?)}}/m)[2];
    // check if maybe there is nevertheless a leading description and remove it from the title
    // assuming that the leading description includes the word NZB and ends with a colon
    if (/.*nzb.*:\s*/i.test(nzb.title)) {
        nzb.title = nzb.title.replace(/.*nzb.*:\s*/i, "");
    }
}
// if no NZB file name was found the title and password have to be set by another way
else {
    // in this case simply set title to the first line of the selection
    nzb.title = nzb.selection.split("\n")[0];

    // test if the selection contains a description for the password starting with some common words used for and ending with a colon or a vertical bar
    if (/^.*((passwor[td]|pw|pass).*[:|]\s*)+(\S.*\S)$/im.test(nzb.selection)) {
        // set the password to the text after the description
        // we search for any text until we find it and then get all of it until the next line break
        // like this we will find the password either if placed on the same line or if placed on the next line
        // we also take care of if the description is used twice (e.g. before the hidden tag and in the hidden tag again)
        nzb.password = nzb.selection.match(/^.*((passwor[td]|pw|pass).*[:|]\s*)+(\S.*\S)$/im)[3];
    }
}
        
// test if the selection contains usenet group names in the format alt.xyz or a.b.xyz
if (/\b(alt|a\.b)(\.[a-z0-9.+_-]*\b)/i.test(nzb.selection)) {
	// get all usenet group names in the format alt.xyz or a.b.xyz and join them to a string with line breaks
	nzb.group = nzb.selection.match(/\b(alt|a\.b)(\.[a-z0-9.+_-]*\b)/ig).join("\n");
	// if the abbreviation a.b. is used replace it by alt.binaries.
	nzb.group = nzb.group.replace(/^a\.b\./img, "alt.binaries.");
}

// load settings and show popup
if (nzb.storage) {
    nzb.storage.get("convert_spaces", function(obj) {
        nzb.convert_spaces = obj.convert_spaces ? obj.convert_spaces : nzb.convert_spaces;
        showPopup();
    });
}
else {
    showPopup();
}    
        
function showPopup() {
    var selected = {"0":"", "1":"", "2":""};
    selected[nzb.convert_spaces] = " selected";       
    var html =  `<p>
    <label for="nzblinker-title">${chrome.i18n.getMessage('extNZBTitle')}:</label>
    <input type="text" id="nzblinker-title" name="nzblinker-title" value="${nzb.title}" class="modal-prompt-input"/>
</p>
<p>
    <label for="nzblinker-header">${chrome.i18n.getMessage('extNZBHeader')}: <small id="nzblinker-required">(${chrome.i18n.getMessage('required')})</small></label>
    <input type="text" id="nzblinker-header" name="nzblinker-header" value="${nzb.header}" class="modal-prompt-input"/>
</p>
<p>
    <label for="nzblinker-password">${chrome.i18n.getMessage('extNZBPassword')}:</label>
    <input type="text" id="nzblinker-password" name="nzblinker-password" value="${nzb.password}" class="modal-prompt-input"/>
</p>
<p>
    <label for="nzblinker-group">${chrome.i18n.getMessage('extNZBGroups')}: <small>(${chrome.i18n.getMessage('extNZBGroupsNote')})</small></label>
    <textarea id="nzblinker-group" class="modal-prompt-input" style="height: 60px;">${nzb.group}</textarea>
</p>
<p>
    <label for="nzblinker-link" style="color: rgb(0, 119, 125) !important; -webkit-text-fill-color: rgb(0, 119, 125) !important">NZBLNK:</label>
    <input type="text" id="nzblinker-link" name="nzblinker-link" value="${nzb.link}" class="modal-prompt-input" style="background-color: rgb(0, 119, 125) !important; color: rgb(255, 255, 255) !important; -webkit-text-fill-color: rgb(255, 255, 255) !important"/>
</p>
<hr />
<p>
    <label for="nzblinker-selection">${chrome.i18n.getMessage('extNZBSelectedText')}:</label>
    <textarea id="nzblinker-selection" rows="4" class="modal-prompt-input">${nzb.selection}</textarea>
</p>
<p>
    <label for="nzblinker-convert_spaces">${chrome.i18n.getMessage('extNZBConvertTitle')}:</label>
    <select id="nzblinker-convert_spaces" name="nzblinker-convert_spaces" class="modal-prompt-input">
    <option value="0"${selected[0]}>${chrome.i18n.getMessage('extNZBConvertTitleUntouched')}</option>
    <option value="1"${selected[1]}>${chrome.i18n.getMessage('extNZBConvertTitleToPeriods')}</option>
    <option value="2"${selected[2]}>${chrome.i18n.getMessage('extNZBConvertTitleToSpaces')}</option>
</p>`

    modal({
        type: 'primary', //Type of Modal Box (alert | confirm | prompt | success | warning | error | info | inverted | primary)
        title: '<img src="' + chrome.extension.getURL('/icons/nzblinker.png') + '" /><span>' + chrome.i18n.getMessage('extName') + ' </span>', //Modal Title
        text: html, //Modal HTML Content
        size: 'normal', //Modal Size (normal | large | small)
        buttons: [{
            text: chrome.i18n.getMessage('extNZBCopyLink'), //Button Text
            val: true, //Button Value
            eKey: true, //Enter Keypress
            addClass: 'btn-light-blue-outline nzblinker-send', //Button Classes (btn-large | btn-small | btn-green | btn-light-green | btn-purple | btn-orange | btn-pink | btn-turquoise | btn-blue | btn-light-blue | btn-light-red | btn-red | btn-yellow | btn-white | btn-black | btn-rounded | btn-circle | btn-square | btn-disabled)
            onClick: function(result) {
                $("#nzblinker-link").select();
				document.execCommand("Copy");
                return true;
            }
        }, {
            text: chrome.i18n.getMessage('extNZBOpenLink'), //Button Text
            val: true, //Button Value
            eKey: true, //Enter Keypress
            addClass: 'btn-light-blue nzblinker-send', //Button Classes (btn-large | btn-small | btn-green | btn-light-green | btn-purple | btn-orange | btn-pink | btn-turquoise | btn-blue | btn-light-blue | btn-light-red | btn-red | btn-yellow | btn-white | btn-black | btn-rounded | btn-circle | btn-square | btn-disabled)
            onClick: function(result) {
//              alert($("#nzblinker-link").val());
                window.open($("#nzblinker-link").val(),"_self");
                return true;
            }
        }, {
            text: chrome.i18n.getMessage('cancel'), //Button Text
            val: false, //Button Value
            eKey: false, //Enter Keypress
            addClass: 'btn-light-blue-outline', //Button Classes (btn-large | btn-small | btn-green | btn-light-green | btn-purple | btn-orange | btn-pink | btn-turquoise | btn-blue | btn-light-blue | btn-light-red | btn-red | btn-yellow | btn-white | btn-black | btn-rounded | btn-circle | btn-square | btn-disabled)
            onClick: function(result) {

                return true;
            }
        }, ],
        onShow: function(r) {
            
            updateNZBLink();

            // jQuery functions to check if inputs are changed and call the updateNZBLink function
            if ($("#nzblinker-header").val() == "") {
                $("#nzblinker-header").addClass('required');
                $('small[id=nzblinker-required]').addClass('show');
                $('a[class*=nzblinker-send]').addClass('btn-disabled');
            }
            $("#nzblinker-header").on("change keydown paste input", function(){
                if ($( this ).val() == "") {
                    $( this ).addClass('required');
                    $('small[id=nzblinker-required]').addClass('show');
                    $('a[class*=nzblinker-send]').addClass('btn-disabled');
                }
                else {
                    $( this ).removeClass('required');
                    $('small[id=nzblinker-required]').removeClass('show');
                    $('a[class*=nzblinker-send]').removeClass('btn-disabled');
                    updateNZBLink();
                }
            });
            $("#nzblinker-title, #nzblinker-password, #nzblinker-group").on("change keydown paste input", function(){
                updateNZBLink();
            });
            $("#nzblinker-convert_spaces").on("change", function(){
                nzb.convert_spaces = $("#nzblinker-convert_spaces").val();
                if (nzb.storage) {
                    nzb.storage.set({ "convert_spaces" : nzb.convert_spaces });
                }
                updateNZBLink();
            });
            
        }, //After show Modal function
        callback: function(r) {
            if (r === false) {

            }
        }, //Callback Function after close Modal (ex: function(result){alert(result); return true;})
        closeClick: false, //Close Modal on click near the box
    });
}

// function to update the NZBLink field
function updateNZBLink() {
    $("#nzblinker-link").val(generateNZBLink($("#nzblinker-title").val(), $("#nzblinker-header").val(), $("#nzblinker-password").val(), $("#nzblinker-group").val()));
}

// function to generate the NZBLink
function generateNZBLink(title, header, password, group) {
    var setting = nzb.convert_spaces;
    // process spaces and periods in the title according to the user selection
    if (setting != "0") {
        if (setting === "1") {
            title = title.replace(/\s/g, ".");
        }
        else if (setting === "2") {
            title = title.replace(/\./g, " ");
        }
    }

    // sanitize title
    var cleanTitle = title.normalize("NFD").replace(/[^\x20-\x7E]/g, "").replace(/[/\\?%*:|"<>]/g, "");

    var groups = "";
        
    // repeat the 'g' parameter for each mentioned group if any
    if (group) {
        group = group.split("\n");
        for (i = 0; i < group.length; i++) {
            group[i] = "g=" + encodeURIComponent(group[i].replace(/^a\.b\./img, "alt.binaries.")); // if the abbreviation a.b. is used (e.g. if entered manually in the groups field) replace with alt.binaries.
        }
        groups = group.join("&")
    }

    // return the link
    var parameters = []
    if (cleanTitle) { parameters.push( "t=" + encodeURIComponent(cleanTitle) ) };
    if (header) { parameters.push( "h=" + encodeURIComponent(header) ) };
    if (password) { parameters.push( "p=" + encodeURIComponent(password) ) };
    if (groups) { parameters.push( groups ) };
    return "nzblnk://?" + parameters.join("&");
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
    return "<div>" + html + "</div>"; // encapsulate with a div container otherwise jQuery.text() will remove plain text, e.g. if selection was done in a text field only
}
