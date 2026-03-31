/**
 * RNK™ Macro Button
 * @module rnk-macro
 * @description Injects a configurable macro button into every actor sheet header.
 *              Left-click executes the assigned macro. Right-click opens the picker.
 * @author RNK Enterprise - Odinn
 * @license RNK Proprietary
 * @version 1.0.1
 */

import { injectMacroButton } from './sheet-button.js';

const MODULE_ID = 'rnk-macro';
const MODULE_TITLE = 'RNK™ Macro Button';

// ─── Initialization ──────────────────────────────────────────────────────────

Hooks.once('init', () => {
    const version = game.modules.get(MODULE_ID)?.version ?? 'unknown';
    console.log(`${MODULE_ID} | ${MODULE_TITLE} v${version} initializing`);
    _registerHooks();
});

// ─── Hook Registration ────────────────────────────────────────────────────────

/**
 * Register all module hooks. Trigger-based, no polling.
 * Fires on BOTH legacy (v12) and ApplicationV2 (v13) render hooks.
 * @private
 */
function _registerHooks() {
    Hooks.on('renderActorSheet', (app, html, _data) => {
        injectMacroButton(app, html);
    });

    Hooks.on('renderApplicationV2', (app, html, _data) => {
        if (!_isActorSheet(app)) return;
        injectMacroButton(app, html);
    });
}

/**
 * Determine whether the rendered application is backed by an Actor document.
 *
 * @param {Application} app
 * @returns {boolean}
 * @private
 */
function _isActorSheet(app) {
    return app?.document?.documentName === 'Actor' || app?.actor?.documentName === 'Actor';
}
