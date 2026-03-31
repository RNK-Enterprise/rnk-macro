/**
 * RNK™ Macro Button — Macro Picker Application
 * @module rnk-macro/macro-picker
 * @description ApplicationV2 dialog that allows a player to assign any available
 *              macro to their character sheet button. Accessible via right-click.
 * @author RNK Enterprise - Odinn
 * @license RNK Proprietary
 * @version 1.0.1
 */

const MODULE_ID = 'rnk-macro';

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

// ─── MacroPickerApp ───────────────────────────────────────────────────────────

/**
 * Modal dialog rendered by ApplicationV2 for selecting and assigning a macro
 * to a specific actor. Stores the selection as an actor flag.
 *
 * @extends {HandlebarsApplicationMixin(ApplicationV2)}
 */
export class MacroPickerApp extends HandlebarsApplicationMixin(ApplicationV2) {

    // ── Static Configuration ──────────────────────────────────────────────────

    static DEFAULT_OPTIONS = {
        id: 'rnk-macro-picker',
        classes: ['rnk-macro', 'rnk-macro-picker'],
        position: { width: 420, height: 480 },
        window: {
            title: 'RNKMACRO.PickerTitle',
            resizable: false,
            minimizable: false
        },
        tag: 'form'
    };

    static PARTS = {
        main: {
            template: 'modules/rnk-macro/templates/macro-picker.hbs'
        }
    };

    // ── Constructor ───────────────────────────────────────────────────────────

    /**
     * @param {Actor} actor - The actor to assign the macro to
     * @param {object} [options={}] - ApplicationV2 options
     */
    constructor(actor, options = {}) {
        super(options);
        /** @type {Actor} */
        this.actor = actor;
    }

    // ── Context Preparation ───────────────────────────────────────────────────

    /**
     * Build the template context for the picker dialog.
     * Fetches all macros the current user can execute, sorted alphabetically.
     *
     * @param {object} [options={}]
     * @returns {Promise<object>}
     * @override
     */
    async _prepareContext(options = {}) {
        const currentId = this.actor.getFlag(MODULE_ID, 'macroId') ?? null;

        const macros = game.macros.contents
            .filter(m => m.canExecute)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(m => ({
                id:       m.id,
                name:     m.name,
                img:      m.img,
                type:     m.type,
                selected: m.id === currentId
            }));

        return {
            macros,
            actorName: this.actor.name,
            hasMacro:  currentId !== null,
            currentId
        };
    }

    // ── Event Binding ─────────────────────────────────────────────────────────

    /**
     * Bind DOM event listeners after the application renders.
     * Uses native DOM — no jQuery.
     *
     * @param {object} context
     * @param {object} options
     * @override
     */
    onRender(context, options) {
        super.onRender(context, options);
        const html = this.element;

        // Assign macro on row click
        html.querySelectorAll('.rnk-macro-row').forEach(row => {
            row.addEventListener('click', async (ev) => {
                ev.preventDefault();
                const id = ev.currentTarget.dataset.macroId;
                if (id) await this._assignMacro(id);
            });
        });

        // Clear the current assignment
        const clearBtn = html.querySelector('.rnk-macro-clear');
        if (clearBtn) {
            clearBtn.addEventListener('click', async (ev) => {
                ev.preventDefault();
                await this._clearMacro();
            });
        }
    }

    // ── Private Actions ───────────────────────────────────────────────────────

    /**
     * Persist the selected macro ID to the actor's flags, notify, and close.
     *
     * @param {string} macroId
     * @returns {Promise<void>}
     * @private
     */
    async _assignMacro(macroId) {
        await this.actor.setFlag(MODULE_ID, 'macroId', macroId);
        ui.notifications.info(game.i18n.localize('RNKMACRO.MacroAssigned'));
        await this.close();
        _refreshActorSheet(this.actor);
    }

    /**
     * Remove the actor flag entirely, notify, and close.
     *
     * @returns {Promise<void>}
     * @private
     */
    async _clearMacro() {
        await this.actor.unsetFlag(MODULE_ID, 'macroId');
        ui.notifications.info(game.i18n.localize('RNKMACRO.MacroCleared'));
        await this.close();
        _refreshActorSheet(this.actor);
    }
}

// ─── Module-level Utilities ───────────────────────────────────────────────────

/**
 * Re-render the actor's open sheet so the button reflects the new macro state.
 *
 * @param {Actor} actor
 * @private
 */
function _refreshActorSheet(actor) {
    const sheet = actor?.sheet;
    if (sheet?.rendered) sheet.render(false);
}
