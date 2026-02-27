/**
 * RNK Macro Button — Sheet Button Injection
 * @module rnk-macro/sheet-button
 * @description Handles DOM injection of the macro button into actor sheet headers
 *              and the execution of the assigned macro on click.
 * @author RNK Enterprise - Odinn
 * @license RNK Proprietary
 * @version 1.0.0
 */

const MODULE_ID = 'rnk-macro';
const BTN_WRAP_CLASS = 'rnk-macro-btn-wrap';

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Inject the macro button into an actor sheet header.
 * Called on every renderActorSheet hook — deduplication handled internally.
 *
 * In Foundry v13 (ApplicationV2), the `html` parameter is the inner content
 * element only. The window chrome (.window-header) lives in app.element.
 * We always resolve the window root from app.element first.
 *
 * @param {ActorSheet} app  - The actor sheet Application instance
 * @param {jQuery|HTMLElement} html - The rendered inner content element
 */
export function injectMacroButton(app, html) {
    const actor = _resolveActor(app);
    if (!actor) return;

    // Normalize html to jQuery — mirrors rnk-header's exact pattern
    if (!html.jquery) html = $(html);

    // Resolve the full window element via app.element (v13) or climb from html (v12)
    let $window;
    if (app.element?.length) {
        $window = app.element.jquery ? app.element : $(app.element);
    } else {
        $window = html.closest('.app.window-app, .window-app, .app, [role="dialog"]');
    }

    if (!$window.length) return;

    // .window-header is inside the outer window wrapper
    const $header = $window.find('.window-header');
    if (!$header.length) return;

    // Prevent duplicate injection
    if ($header.find(`.${BTN_WRAP_CLASS}`).length) return;

    const macroId = actor.getFlag(MODULE_ID, 'macroId') ?? null;
    const macro   = macroId ? game.macros.get(macroId) : null;

    const $wrap = $(_buildButton(macro));

    // Left-click: execute
    $wrap.find('.rnk-macro-btn').on('click', async (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        await _executeMacro(actor);
    });

    // Right-click: open picker
    $wrap.find('.rnk-macro-btn').on('contextmenu', async (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        const { MacroPickerApp } = await import('./macro-picker.js');
        new MacroPickerApp(actor).render(true);
    });

    // v13: inject into .header-elements if present, else append to header (v12)
    const $headerElements = $header.find('.header-elements');
    if ($headerElements.length) {
        $headerElements.prepend($wrap);
    } else {
        $header.append($wrap);
    }
}

// ─── Private Helpers ──────────────────────────────────────────────────────────

/**
 * Resolve the actor from a sheet Application instance.
 * Handles both legacy (app.actor) and v13 (app.document) patterns.
 *
 * @param {ActorSheet} app
 * @returns {Actor|null}
 * @private
 */
function _resolveActor(app) {
    return app?.actor ?? app?.document ?? null;
}

/**
 * Build the button wrapper element with icon and optional macro name label.
 *
 * @param {Macro|null} macro - Currently assigned macro, or null if none
 * @returns {HTMLDivElement}
 * @private
 */
function _buildButton(macro) {
    const wrap = document.createElement('div');
    wrap.classList.add(BTN_WRAP_CLASS);

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.classList.add('rnk-macro-btn');
    btn.title = macro
        ? game.i18n.format('RNKMACRO.ButtonTitleAssigned', { name: macro.name })
        : game.i18n.localize('RNKMACRO.ButtonTitleEmpty');

    // Icon — bolt if assigned, link if empty
    const icon = document.createElement('i');
    icon.className = macro ? 'fas fa-bolt' : 'fas fa-link';
    btn.appendChild(icon);

    // Label — only shown when a macro is assigned
    if (macro) {
        const label = document.createElement('span');
        label.classList.add('rnk-macro-btn-label');
        label.textContent = macro.name;
        btn.appendChild(label);
    }

    wrap.appendChild(btn);
    return wrap;
}

/**
 * Execute the macro assigned to the given actor.
 * Emits user-facing notifications for missing or invalid macro state.
 *
 * @param {Actor} actor
 * @returns {Promise<void>}
 * @private
 */
async function _executeMacro(actor) {
    const macroId = actor.getFlag(MODULE_ID, 'macroId') ?? null;

    if (!macroId) {
        ui.notifications.warn(game.i18n.localize('RNKMACRO.NoMacroAssigned'));
        return;
    }

    const macro = game.macros.get(macroId);
    if (!macro) {
        ui.notifications.error(game.i18n.localize('RNKMACRO.MacroNotFound'));
        return;
    }

    await macro.execute({ actor });
}
