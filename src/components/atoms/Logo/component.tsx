import React from 'react'
import './styles.scss'

export const Logo = () => {
    return (
        <div className="logoContent">
            <div className="wrapImg">
                <img src={'assets/images/sync-icon.svg'} alt="logo" />
            </div>
            <div className="wrapTitle">
                <strong>iDoRecall</strong>
                <div>obsidian</div>
            </div>
        </div>
    )
}
