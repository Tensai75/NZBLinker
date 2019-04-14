$(document).ready(function() {
    // define the variables
    var nzb = {
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
            <label for="nzblinker-link" style="color: rgb(0, 119, 125) !important; -webkit-text-fill-color: rgb(0, 119, 125) !important">NZBlnk:</label>
            <input type="text" id="nzblinker-link" name="nzblinker-link" value="${nzb.link}" class="modal-prompt-input" style="background-color: rgb(0, 119, 125) !important; color: rgb(255, 255, 255) !important; -webkit-text-fill-color: rgb(255, 255, 255) !important"/>
        </p>
        <hr / style="height: 0px; border: 0px; border-top: 1px solid gray; margin: 20px 0px;">
        <p>
            <label for="nzblinker-convert_spaces">${chrome.i18n.getMessage('extNZBConvertTitle')}:</label>
            <select id="nzblinker-convert_spaces" name="nzblinker-convert_spaces" class="modal-prompt-input">
            <option value="0"${selected[0]}>${chrome.i18n.getMessage('extNZBConvertTitleUntouched')}</option>
            <option value="1"${selected[1]}>${chrome.i18n.getMessage('extNZBConvertTitleToPeriods')}</option>
            <option value="2"${selected[2]}>${chrome.i18n.getMessage('extNZBConvertTitleToSpaces')}</option>
        </p>`

        var buttons = `<a id="nzblinker-copy" class="modal-btn btn-light-blue-outline nzblinker-send">${chrome.i18n.getMessage('extNZBCopyLink')}</a>
        <a id="nzblinker-open" class="modal-btn btn-light-blue nzblinker-send">${chrome.i18n.getMessage('extNZBOpenLink')}</a>
        <a id="nzblinker-close" class="modal-btn btn-light-blue-outline">${chrome.i18n.getMessage('close')}</a>`

        $("#modal-text").append(html);
        $("#modal-buttons").append(buttons);

        $("#close-btn, #nzblinker-close").click(function() {
            window.close();
        });

        $("#nzblinker-copy").click(function() {
            $("#nzblinker-link").select();
            document.execCommand("Copy");
            $("#nzblinker-link").blur();
        });

        $("#nzblinker-open").click(function() {
            window.open($("#nzblinker-link").val(),"_self");
        });

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

        updateNZBLink();

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
});