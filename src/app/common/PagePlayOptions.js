import React from 'react';
import { ReactComponent as Play } from '../common/icons/play.svg';
import { ReactComponent as Pause } from '../common/icons/pause.svg';
import { ReactComponent as MoreHorizontal } from '../common/icons/more-horizontal.svg';

const PagePlayOptions = (props) => {
    return (
        <div className="pagePlayOptions">
            <button className="playButton" onClick={props.play}><Play /></button>
            <button className="options"><MoreHorizontal /></button>
        </div>
    )
}

export default PagePlayOptions;
