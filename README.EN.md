# NZBLinker
Chrome and Firefox addon to create a [NZBLNK](https://nzblnk.info) either from a selected text or from scratch

## Download
Download for Chrome: [Chrome Webstore](https://chrome.google.com/webstore/detail/nzblinker/podpddhcepkggomgplkpkdhehckkllab)

Download for Firefox: [Firefox Add-on](https://addons.mozilla.org/de/firefox/addon/nzblinker/)

## Description
Based on a text marked in the browser, which contains the title, header as well as a password and the group, this extension will automatically create an NZBLNK, which can then either be copied to the clipboard or opened directly.
Alternatively, a browser window can be opened by clicking on the NZBLinker icon, in which an NZBLNK can be created manually.

## Instructions
Select the desired text. It should contain the title in the first line and the header, password and group somewhere else.
Then right-click and select "Create NZBLNK".
![Screen Shot 1](https://github.com/Tensai75/NZBLinker/raw/master/screenshots/NZBLinker1.jpg)

In the overlay window that appears, the title, header and, if necessary, password and group details can be checked and, if necessary, corrected. For the sake of simplicity, the marked text is also displayed again.
The select field can be used to select how to proceed with the periods or spaces in the title when generating the NZBLNK.
With the buttons below you can either copy the created NZBLNK to the clipboard, open it directly and pass it to the NZB Monkey, or close the window again.
![Screen Shot 2](https://github.com/Tensai75/NZBLinker/raw/master/screenshots/NZBLinker2.jpg)

## System requirements
* Current Chrome or Firefox browser
* Installed and working NZB Monkey ([see here](https://nzblnk.info/nzb-monkey/))

## Install instructions
1. install the extension from the corresponding webstore (see above) - done!

## Copyright information
This extension is based on the idea and the initial script of Zandrial and was further developed by me and wilriker.
v0.7.0 was completely redesigned and revised by me.

## Change Log
### v0.7.2
* Support for additional NZBLNK parameter "post date" (d) and experimental post date detection (thanks to [plneappl](https://github.com/plneappl))

### v0.7.1
* Deletion of a debug alert
* Update to jQuery 3.5.1

### v0.7.0
* Completely reworked interface
* Browser action when clicking on the icon: Opening a window for manual creation of an NZBLNK
* Multilingual: German / English
* Now also works without storage.sync (fallback to storage.local) or if no storage exists at all
* The NZBLNK is now always created syntactically 100% correct
* Added "File(s)" as additional keyword for header search
