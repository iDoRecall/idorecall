import t from 'i18n'
import React from 'react'
import { markIconSet } from 'utils/icons'
import { InlineStyle } from './styles'

export const Mark = (props: {
    i: number
    style: InlineStyle
    active: boolean
    toggleMarkAction: (e: React.MouseEvent, s: InlineStyle) => void
}) => {
    const { i, style, active, toggleMarkAction } = props

    return (
        <div
            key={i}
            //@ts-ignore
            aria-label={t.styles[style.label]}
            className={`mk-mark ${
                style.mark && active ? 'mk-mark-active' : ''
            }`}
            dangerouslySetInnerHTML={{ __html: markIconSet[style.icon] }}
            onMouseDown={(e) => toggleMarkAction(e, style)}
        ></div>
    )
}
