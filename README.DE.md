# NZBLinker
Chrome und Firefox Erweiterung zur Erstellung eines [NZBLNK](https://nzblnk.info) entweder aus einem selektierten Text oder durch manuelle Eingabe

## Download
Download für Chrome: [Chrome Webstore](https://chrome.google.com/webstore/detail/nzblinker/podpddhcepkggomgplkpkdhehckkllab)

Download für Firefox: [Firefox Add-on](https://addons.mozilla.org/de/firefox/addon/nzblinker/)

## Beschreibung
Auf Basis eines im Browser markierten Texts, welcher den Titel, Header sowie gegebenenfalls ein Passwort und die Gruppe enthält, wird mit dieser Erweiterung automatisch ein NZBLNK erstellen, welcher dann entweder in die Zwischenablage kopiert oder direkt aufgerufen werden kann.
Alternativ kann mit einem Klick auf das NZBLinker-Icon ein Browser-Fenster geöffnet werden, in welchem komplett manuell ein NZBLNK erstellt werden kann.

## Anleitung
Den gewünschten Text markieren. Dieser sollte in der ersten Zeile den Titel enthalten sowie irgendwo im weiteren Text den Header sowie gegebenenfalls Passwort und Gruppe.
Anschliessend mittels rechtsklick "NZBLNK erstellen" auswählen.
![Screen Shot 1](https://github.com/Tensai75/NZBLinker/raw/master/screenshots/NZBLinker1.jpg)

Im darauf erscheinenden Overlay-Fenster können die Angaben zu Titel, Header und gegebenenfalls Passwort und Gruppe überprüft und allenfalls korrigiert werden. Der Einfachheit halber wird dazu der markierte Text ebenfalls nochmals angezeigt.
Mit dem Select-Feld kann ausgewählt werden, wie mit den Punkten bzw. Leerzeichen im Titel bei der Generierung des NZBLNK verfahren werden soll.
Mit den Buttons unten kann der erstellte NZBLNK dann entweder in die Zwischenablage kopiert oder direkt aufgerufen und an den NZB Monkey übergeben werden, oder aber das Fenster wieder geschlossen werden.
![Screen Shot 2](https://github.com/Tensai75/NZBLinker/raw/master/screenshots/NZBLinker2.jpg)

## System-Anforderungen
* Aktueller Chrome oder Firefox Browser
* Installierter und funktionierender NZB Monkey ([siehe hier](https://nzblnk.info/nzb-monkey/))

## Installationsanleitung
1. Die Erweiterung aus dem entsprechenden Webstore (siehe oben) installieren - fertig!

## Urheberrechtsnachweis
Diese Erweiterung basiert auf der Idee und dem ursprünglichen Skript von Zandrial und wurde von mir und wilriker gemeinsam weiterentwickelt.
v0.7.0 wurde von mir komplett neu designed und überarbeitet.

## Change Log
### v0.7.3
* Fehlerbehebung: Fix für den Eventhandler-Fehler.
* Unterstützung für den zusätzlichen NZBLNK-Parameter "Post-Datum" (d) auch im Popup-Fenster für die NZBLNK-Erstellung.

### v0.7.2
* Unterstützung für den zusätzlichen NZBLNK-Parameter "Post-Datum" (d) und experimentelle Erkennung des Post-Datums (Danke an [plneappl](https://github.com/plneappl))

### v0.7.1
* Löschung eines vergessen Debug-Alert
* Update auf jQuery 3.5.1

### v0.7.0
* Komplett neu überarbeitete Oberfläche
* Browser-Action beim Klick auf das Icon: Öffnen eines Fenster zur manuellen Erstellung eines NZBLNK
* Mehrsprachig: Deutsch / English
* Funktioniert nun auch ohne storage.sync (Fallback auf storage.local) oder wenn gar kein storage vorhanden ist
* Der NZBLNK wird nun immer syntaktisch 100% richtig erstellt
* "File(s)" als zusätzliches Key-Wort für die Header-Suche hinzugefügt
