# NZBLinker
Chrome Erweiterung zur Erstellung eines NZBLink für den NZBMonkey aus einem markierten Text

## Beschreibung
Auf Basis eines im Chrome Browser markierten Texts, welcher den Titel, Header sowie gegebenenfalls ein Passwort und die Gruppe enthält, wird mit dieser Erweiterung automatisch ein NZBLink erstellen, welcher dann entweder in die Zwischenablage kopiert oder direkt aufgerufen werden kann.

## Bedienungsanleitung
Den gewünschten Text markieren. Dieser sollte in der ersten Zeile den Titel enthalten sowie irgendwo in im weiteren Text den Header sowie gegebenenfalls Passwort und Gruppe.
Anschliessend mittels rechtsklick "NZBLink erstellen" auswählen.
![Screen Shoot 1](https://github.com/Tensai75/NZBLinker/raw/master/screenshoots/NZBLinker1.jpg)

Im darauf erscheinenden Overlay-Fenster können die Angaben zu Titel, Header und gegebenenfalls Passwort und Gruppe überprüft und allenfalls korrigiert werden. Der Einfachheit halber wird dazu der markierte Text ebenfalls nochmals angezeigt.
Der erstellte NZBLink wird zuunterst angezeigt. Mit den Buttons kann der erstellte NZBLink dann entweder in die Zwischenablage kopiert oder direkt aufgerufen und an den NZBMonkey übergeben werden, oder aber das Fenster wieder geschlossen werden.
![Screen Shoot 2](https://github.com/Tensai75/NZBLinker/raw/master/screenshoots/NZBLinker2.jpg)

## System-Anforderungen
* Chrome Browser
* Installierter und funktionierender NZBMonkey ([siehe hier](https://github.com/Tensai75/nzb-monkey))

## Installationsanleitung
1. Das GitHub Repository in einen lokalen Ordner klonen bzw. die zip-Datei herunterladen und in einen lokalen Ordner entpacken
2. In der Adressleiste des Chrome Browsers "chrome://extensions" eingeben und Return drücken
3. Das Häkchen bei "Entwicklermodus" setzten
4. Auf "Entpackte Erweiterungen laden..." klicken
5. Den Ordner auswählen, wohin die Erweiterung geklont bzw. entpackt wurde (siehe Schritt 1.)

**Achtung:** Nach jedem Neustart von Chrome wird man aufgefordert den Entwicklermodus wieder zu deaktivieren. Um die Erweiterung jedoch weiter benutzen zu können muss der Entwicklermodus aktiviert bleiben.

## Urheberrechtsnachweis
Diese Erweiterung basiert auf der Idee und dem ursprünglichen Skript von Zandrial aus dem U4A Forum und wurde von mir und wilriker gemeinsam weiterentwickelt.