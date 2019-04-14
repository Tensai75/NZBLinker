# NZBLinker
Chrome und Firefox Erweiterung zur Erstellung eines NZBlnk entweder aus einem selektierten Text oder durch manuelle Eingabe

## Download
Download für Chrome: [Chrome Webstore](https://chrome.google.com/webstore/detail/nzblinker/podpddhcepkggomgplkpkdhehckkllab)

Download für Firefox: [Firefox Add-on](https://addons.mozilla.org/de/firefox/addon/nzblinker/)

## Beschreibung
Auf Basis eines im Browser markierten Texts, welcher den Titel, Header sowie gegebenenfalls ein Passwort und die Gruppe enthält, wird mit dieser Erweiterung automatisch ein NZBlnk erstellen, welcher dann entweder in die Zwischenablage kopiert oder direkt aufgerufen werden kann.
Alternativ kann mit einem Klick auf das NZBLinker-Icon ein Browser-Fenster geöffnet werden, in welchem komplett manuell ein NZBlnk erstellt werden kann.

## Anleitung
Den gewünschten Text markieren. Dieser sollte in der ersten Zeile den Titel enthalten sowie irgendwo im weiteren Text den Header sowie gegebenenfalls Passwort und Gruppe.
Anschliessend mittels rechtsklick "NZBlnk erstellen" auswählen.
![Screen Shot 1](https://github.com/Tensai75/NZBLinker/raw/master/screenshots/NZBLinker1.jpg)

Im darauf erscheinenden Overlay-Fenster können die Angaben zu Titel, Header und gegebenenfalls Passwort und Gruppe überprüft und allenfalls korrigiert werden. Der Einfachheit halber wird dazu der markierte Text ebenfalls nochmals angezeigt.
Mit dem Select-Feld kann ausgewählt werden, wie mit den Punkten bzw. Leerzeichen im Titel bei der Generierung des NZBLinks verfahren werden soll.
Mit den Buttons unten kann der erstellte NZBLink dann entweder in die Zwischenablage kopiert oder direkt aufgerufen und an den NZBMonkey übergeben werden, oder aber das Fenster wieder geschlossen werden.
![Screen Shot 2](https://github.com/Tensai75/NZBLinker/raw/master/screenshots/NZBLinker2.jpg)

## System-Anforderungen
* Aktueller Chrome oder Firefox Browser
* Installierter und funktionierender NZBMonkey ([siehe hier](https://nzblnk.info/nzb-monkey/))

## Installationsanleitung
1. Die Erweiterung aus dem entsprechenden Webstore (siehe oben) installieren - fertig!

## Urheberrechtsnachweis
Diese Erweiterung basiert auf der Idee und dem ursprünglichen Skript von Zandrial und wurde von mir und wilriker gemeinsam weiterentwickelt.
v0.7.0 wurde von mir komplett neu designed und überarbeitet.

## Change Log
### v0.7.0
* Komplett neu überarbeitete Oberfläche
* Browser-Action beim Klick auf das Icon: Öffnen eines Fenster zur manuellen Erstellung eines NZBlnk
* Mehrsprachig: Deutsch / English
* Funktioniert nun auch ohne storage.sync (Fallback auf storage.local) oder wenn gar kein storage vorhanden ist
* Der NZBlnk wird nun immer syntaktisch 100% richtig erstellt
* "File(s)" als zusätzliches Key-Wort für die Header-Suche hinzugefügt