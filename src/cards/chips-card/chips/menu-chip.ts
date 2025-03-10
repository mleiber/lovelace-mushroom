import { fireEvent, HomeAssistant } from "custom-card-helpers";
import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { actionHandler } from "../../../utils/directives/action-handler-directive";
import {
    computeChipComponentName,
    computeChipEditorComponentName,
} from "../../../utils/lovelace/chip/chip-element";
import { LovelaceChip, MenuChipConfig } from "../../../utils/lovelace/chip/types";
import { LovelaceChipEditor } from "../../../utils/lovelace/types";

export const DEFAULT_MENU_ICON = "mdi:menu";

@customElement(computeChipComponentName("menu"))
export class MenuChip extends LitElement implements LovelaceChip {
    public static async getConfigElement(): Promise<LovelaceChipEditor> {
        await import("./menu-chip-editor");
        return document.createElement(computeChipEditorComponentName("menu")) as LovelaceChipEditor;
    }

    public static async getStubConfig(_hass: HomeAssistant): Promise<MenuChipConfig> {
        return {
            type: `menu`,
        };
    }

    @property({ attribute: false }) public hass?: HomeAssistant;

    @state() private _config?: MenuChipConfig;

    public setConfig(config: MenuChipConfig): void {
        this._config = config;
    }

    private _handleAction() {
        fireEvent(this, "hass-toggle-menu" as any);
    }

    protected render(): TemplateResult {
        if (!this.hass || !this._config) {
            return html``;
        }

        const icon = this._config.icon || DEFAULT_MENU_ICON;

        return html`
            <mushroom-chip @action=${this._handleAction} .actionHandler=${actionHandler()}>
                <ha-icon .icon=${icon}></ha-icon>
            </mushroom-chip>
        `;
    }

    static get styles(): CSSResultGroup {
        return css`
            mushroom-chip {
                cursor: pointer;
            }
        `;
    }
}
