# RNK™ Macro Button

**Version:** 1.0.2  
**Module Type:** Free module  
**License:** RNK Proprietary License  
**Foundry Compatibility:** v13-14 (minimum: 13, verified: 14)  

## Overview

`RNK™ Macro Button` adds a dedicated macro button to actor sheet headers. Right-click the button to assign a macro to that actor, then left-click the same button to execute the saved macro with actor context.

## Features

- Adds one macro button to actor sheet headers
- Stores one macro assignment per actor
- Opens a picker window with every executable world macro
- Executes the assigned macro with actor and token context when available
- Refreshes the sheet button immediately after assignment changes
- Works without external dependencies

## Installation

Use this manifest URL in Foundry's **Install Module** dialog:

```text
https://github.com/RNK-Enterprise/rnk-macro/releases/latest/download/module.json
```

## Usage

### Assign a macro

1. Open an actor sheet.
2. Right-click the `RNK™ Macro Button` in the sheet header.
3. Choose a macro from the picker window.

### Execute a macro

1. Open the same actor sheet.
2. Left-click the assigned `RNK™ Macro Button`.

### Clear an assignment

1. Right-click the button.
2. Click `Remove Assignment`.

## Compatibility

- Foundry Virtual Tabletop v13-14 (minimum: 13, verified: 14)
- Actor sheets that render a standard Foundry window header
- World macros the current user can execute

## Repo layout

```text
rnk-macro/
├── languages/
│   └── en.json
├── scripts/
│   └── validate.mjs
├── src/
│   ├── macro-picker.js
│   ├── main.js
│   └── sheet-button.js
├── styles/
│   └── rnk-macro.css
├── templates/
│   └── macro-picker.hbs
├── CHANGELOG.md
├── LICENSE
├── module.json
├── module.zip
├── package.json
└── README.md
```

## Troubleshooting

### The button does not appear

1. Confirm the module is enabled in the world.
2. Confirm the sheet uses a standard Foundry window header.
3. Reload the browser and reopen the sheet.
4. Check the browser console for conflicts from other modules.

### The macro does not execute

1. Confirm a macro is assigned to the actor.
2. Confirm the macro still exists.
3. Confirm the current user is allowed to execute that macro.
4. Reassign the macro if the old reference is stale.

## Release files

- Manifest: `https://github.com/RNK-Enterprise/rnk-macro/releases/latest/download/module.json`
- Download: `https://github.com/RNK-Enterprise/rnk-macro/releases/latest/download/module.zip`
- Release notes: `https://github.com/RNK-Enterprise/rnk-macro/releases`

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).

## My story

RNK Enterprise is built by Odinn, a self-taught developer, retired truck driver, and stroke survivor. Every module is part of a larger commitment to build practical tools for Foundry tables without cutting corners.

## Support

- Patreon: <https://www.patreon.com/RagNaroks>
- GitHub Issues: <https://github.com/RNK-Enterprise/rnk-macro/issues>
- Email: <mailto:Asgardinnovations@protonmail.com>

## License

This module is released under the **RNK Proprietary License**. See [`LICENSE`](LICENSE) for the complete license text.
