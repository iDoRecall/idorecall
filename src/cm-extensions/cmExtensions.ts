import IDRPlugin from 'main'
import { cursorTooltip } from './inlineStylerView/inlineStyler'
import { toggleMarkExtension } from './inlineStylerView/marks'
import { tooltips } from './tooltip'

export const cmExtensions = (plugin: IDRPlugin) => {
    let extensions = []

    extensions.push(
        ...[toggleMarkExtension, tooltips({ parent: document.body })]
    )
    extensions.push(cursorTooltip(plugin))

    return extensions
}
