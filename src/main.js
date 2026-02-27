/**
 * RNK™ Macro Button
 * @module rnk-macro
 * @description Injects a configurable macro button into every actor sheet header.
 *              Left-click executes the assigned macro. Right-click opens the picker.
 * @author RNK Enterprise - Odinn
 * @license RNK Proprietary
 * @version 1.0.0
 */

import { injectMacroButton } from './sheet-button.js';

const MODULE_ID = 'rnk-macro';

// ─── Initialization ──────────────────────────────────────────────────────────

Hooks.once('init', () => {
    console.log(`${MODULE_ID} | RNK Macro Button v1.0.0 — Initializing`);
    _registerHooks();
});

// ─── Hook Registration ────────────────────────────────────────────────────────

/**
 * Register all module hooks. Trigger-based, no polling.
 * Fires on BOTH legacy (v12) and ApplicationV2 (v13) render hooks.
 * @private
 */
function _registerHooks() {
    // v12 legacy actor sheets
    Hooks.on('renderActorSheet', (app, html, _data) => {
        injectMacroButton(app, html);
    });

    // v13 ApplicationV2 actor sheets — this is the hook that fires in v13
    Hooks.on('renderActorSheetV2', (app, html, _data) => {
        injectMacroButton(app, html);
    });
}
