// declare module 'obsidian' {
//     interface App {
//         commands: {
//             listCommands(): Command[];
//             findCommand(id: string): Command;
//             removeCommand(id: string): void;
//             executeCommandById(id: string): void;
//             commands: Record<string, Command>;
//         };
//         mobileToolbar: {
//             containerEl: HTMLElement;
//         };
//         hotkeyManager: {
//             getHotkeys(id: string): Hotkey[];
//             getDefaultHotkeys(id: string): Hotkey[];
//         };
//         internalPlugins: {
//             getPluginById(id: string): { instance: { options: { pinned: [] } } };
//         };
//     }
//
//     interface WorkspaceLeaf {
//         containerEl: HTMLElement;
//         tabHeaderInnerTitleEl: HTMLElement;
//     }
// }
