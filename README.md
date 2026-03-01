# RNK Macro Button

**Version**: 1.0.0  
**Status**: Production Ready  
**License**: RNK Proprietary  
**Foundry VTT Compatibility**: v12+, verified on v13  
**Module Type**: Free Utility Module  

---

## Overview

RNK Macro Button is a lightweight, free utility module that injects a configurable macro execution button directly into every actor sheet header. Left-click to execute, right-click to assign. Works across all game systems with zero dependencies.

---

## Quick Start

1. Open any actor sheet
2. Look for the RNK Macro Button in the sheet header
3. Right-click to assign a macro from your world
4. Left-click to execute the assigned macro
5. Done!

---

## Features

- Adds a button to every actor sheet header (system-agnostic)
- Left-click executes the assigned macro
- Right-click opens the macro picker to assign or change macros
- Per-actor macro storage - each character remembers its own macro
- Real-time button updates after assignment
- Zero configuration needed - install and use immediately
- Lightweight and performant
- Works with macros of any type (script, chat commands, etc.)

---

## Installation

Paste this manifest URL into Foundry's Add-on Modules installer:

```
https://github.com/RNK-Enterprise/rnk-macro/releases/latest/download/module.json
```

Then enable the module in your world settings.

---

## Usage

### Assigning a Macro

1. Open an actor sheet
2. Right-click the RNK Macro Button in the header
3. A macro picker dialog will appear
4. Select any macro from your world macro list
5. Click to assign - the button updates immediately

### Executing a Macro

1. With a macro assigned, left-click the button
2. The macro executes instantly with the actor context
3. No cooldown or limitations

### Removing an Assignment

1. Right-click the macro button
2. Click "Remove Assignment"
3. The button returns to unassigned state

---

## Compatibility

Works with:
- All Foundry VTT game systems
- All actor types (characters, NPCs, creatures, etc.)
- Foundry VTT v12 and v13
- All macro types (script, chat, roll, etc.)

---

## Why Free?

RNK Macro Button is completely free because we believe quality-of-life utilities should be accessible to everyone. Our free modules help the entire Foundry community.

Want to support continued development of free modules like this one, plus exclusive premium modules? Consider joining us on Patreon.

---

## Support RNK Enterprise

RNK Macro Button is 100% free and always will be.

But if you love our work and want to support us while getting access to premium modules and exclusive features:

**Patreon**: https://www.patreon.com/RagNaroks

### What Your Support Funds

- Development of free modules like RNK Macro Button
- Premium modules (like RNK Koinage, RNK Dedpewl, RNK Mystix)
- Ongoing maintenance and updates
- Community features and support
- Future innovation in Foundry module development

### Patreon Tiers

**Free (Everyone)**:
- Access to all free modules
- Bug reports and feedback
- GitHub community

**Copper Tier ($1/month)**:
- Access to all premium modules
- Monthly development updates
- Patreon-only Discord channel

**Silver Tier ($5/month)**:
- Copper tier benefits, plus:
- Priority support (24-48 hour response)
- Early access to new modules (1 week early)
- Feature request consideration

**Gold Tier ($10/month)**:
- Silver tier benefits, plus:
- Exclusive development roadmap
- Direct influence on what we build next
- Custom module consulting

**Platinum Tier ($25/month)**:
- Gold tier benefits, plus:
- Private Discord channel with developers
- Priority bug fixes
- New module names include your company/brand

Support RNK: https://www.patreon.com/RagNaroks

---

## Troubleshooting

### Button Doesn't Appear

**Problem**: The RNK Macro Button doesn't show on actor sheets

**Solutions**:
1. Verify module is enabled in World Settings
2. Try refreshing the browser (Ctrl+F5)
3. Check browser console (F12) for errors
4. Verify you're using Foundry v12 or higher
5. Try disabling other modules to check for compatibility

### Macro Won't Execute

**Problem**: Left-clicking the button doesn't execute the macro

**Solutions**:
1. Verify a macro is assigned (right-click button to check)
2. Verify the assigned macro exists in your macro library
3. Check that the macro you assigned has valid code
4. Check browser console (F12) for JavaScript errors
5. Try assigning a different macro to test

### Button Position Wrong

**Problem**: The button appears in an unexpected location on the sheet header

**Solutions**:
1. This depends on the character sheet system being used
2. Try a different character sheet theme
3. Report the issue on GitHub with system/sheet details
4. The button may be hidden in sheet menu on some themes

---

## Technical Details

- **Type**: Client-side utility module
- **Performance**: Minimal - adds one button per actor sheet
- **Socket Free**: No networking required
- **System Agnostic**: Works with any game system
- **Code**: Clean, documented, open-source on GitHub

---

## Changelog

### v1.0.0 - Initial Release (March 1, 2026)

**Features**:
- Macro button injection into all actor sheets
- Per-actor macro assignment storage
- Macro picker dialog for easy selection
- Real-time button updates
- Works across all game systems
- Full Foundry v12-13 compatibility

**Bug Fixes**: N/A (Initial release)

**Known Issues**: None reported

---

## Contact & Community

- **GitHub Issues**: Report bugs or request features  
  https://github.com/RNK-Enterprise/rnk-macro/issues

- **Patreon**: Support development  
  https://www.patreon.com/RagNaroks

- **Discord**: Join our community  
  https://discord.com/invite/rnk

- **Email**: Asgardinnovations@protonmail.com

---

## License

RNK Macro Button is released under the **RNK Proprietary License**.

This module and all associated assets are the intellectual property of RNK Enterprise. Unauthorized reproduction, modification, or distribution is prohibited.

This is a free module. You may use it freely in your Foundry worlds. For licensing inquiries beyond personal use, contact: Asgardinnovations@protonmail.com

---

## Credits

**Created by**: Odinn - RNK Enterprise  
**Special Thanks**: Ms. Lisa for endless support and encouragement

**Inspiration**: The Foundry VTT community and developers who push the platform forward

---

Made with dedication by a self-taught developer, retired truck driver, and stroke survivor.

Love and respect from RNK Enterprise — Odinn
