# [1.0.0](https://github.com/Tensai75/NZBLinker/compare/v0.7.3...v1.0.0) (2025-09-08)


### Features

* complete rewrite of the code base and update to Manifest v3 ([8580736](https://github.com/Tensai75/NZBLinker/commit/8580736376c9aa7cc34dbc0f97e6f0e8b1795e76))


### BREAKING CHANGES

* Only compatible with Manifest v3

### New features:
* manifest v3 support
* new options page
* new options to add search terms for the parameters
* improved text analysis regexp
* new design with light/dark mode according to system settings

# [1.0.0-beta.1](https://github.com/Tensai75/NZBLinker/compare/v0.7.3...v1.0.0-beta.1) (2025-09-07)


* feat!: complete rewrite of the code base and compatibility with Manifest v3 ([5bbd355](https://github.com/Tensai75/NZBLinker/commit/5bbd3551033134362b35bbe3832895722934b1ac))


### BREAKING CHANGES

* Complete rewrite of the code base and compatibility with Manifest v3

### New features:
* manifest v3 support
* new options page
* new options to add search terms for the parameters
* improved text analysis regexps
* light/dark mode according to system settings

## v0.7.3

- Bug fix: fix for the eventhandler error.
- Addition of NZBLNK parameter "post date" (d) also in the popup window for the NZBLNK creation.

## v0.7.2

- Support for additional NZBLNK parameter "post date" (d) and experimental post date detection (thanks to [plneappl](https://github.com/plneappl))

## v0.7.1

- Deletion of a debug alert
- Update to jQuery 3.5.1

## v0.7.0

- Completely reworked interface
- Browser action when clicking on the icon: Opening a window for manual creation of an NZBLNK
- Multilingual: German / English
- Now also works without storage.sync (fallback to storage.local) or if no storage exists at all
- The NZBLNK is now always created syntactically 100% correct
- Added "File(s)" as additional keyword for header search
