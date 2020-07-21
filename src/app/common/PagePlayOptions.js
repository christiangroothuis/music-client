import React from "react";
import { ReactComponent as Play } from "../common/icons/play.svg";
import { ReactComponent as Pause } from "../common/icons/pause.svg";
import { ReactComponent as MoreHorizontal } from "../common/icons/more-horizontal.svg";

const PagePlayOptions = ({ play, pause, playlist, currentIndex, id, isPlaying }) => {
	const isCurrent =
		playlist[currentIndex] && playlist[currentIndex].album === id && isPlaying;
	console.log(playlist[currentIndex] && playlist[currentIndex].album === id);
	return (
		<div className="pagePlayOptions">
			<button className="playButton" onClick={isCurrent ? pause : play}>
				{isCurrent ? <Pause /> : <Play />}
			</button>
			<button className="options">
				<MoreHorizontal />
			</button>
		</div>
	);
};

export default PagePlayOptions;
