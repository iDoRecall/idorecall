import { App, PluginSettingTab, Setting } from 'obsidian';
import IDRPlugin from '../main';
import { setDarkTheme } from './setDarkTheme';
import { SettingsService } from '../services';

export class IDRSettingTab extends PluginSettingTab {
    plugin: IDRPlugin;

    constructor(app: App, plugin: IDRPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;

        containerEl.empty();

        containerEl.createEl('h2', { text: 'Settings' });

        this.apiKeySettings(containerEl);

        this.themeSettings(containerEl);
    }

    private apiKeySettings(containerEl: HTMLElement): void {
        new Setting(containerEl)
            .setName('IDR api key')
            .setDesc('Use IDR api key for obsidian on profile page')
            .addText((text) =>
                text
                    .setPlaceholder('Enter your IDR api key')
                    .setValue(this.plugin.settings.apiKey)
                    .onChange(async (value) => {
                        this.plugin.settings.apiKey = value;
                        await this.plugin.saveSettings();
                        SettingsService.instance.setSettings(
                            this.plugin.settings,
                        );
                    }),
            );
    }

    private themeSettings(containerEl: HTMLElement): void {
        new Setting(containerEl)
            .setName('IDR dark theme')
            .setDesc('Use dark theme if you prefer')
            .addToggle((toggle) =>
                toggle
                    .setValue(this.plugin.settings.isDarkTheme)
                    .onChange(async (checked) => {
                        this.plugin.settings.isDarkTheme = checked;
                        setDarkTheme(checked);
                        await this.plugin.saveSettings();
                        SettingsService.instance.setSettings(
                            this.plugin.settings,
                        );
                    }),
            );
    }
}
