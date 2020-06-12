import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Slider from "../common/Slider";

import { ReactComponent as Play } from "../common/icons/play.svg";
import { ReactComponent as Pause } from "../common/icons/pause.svg";
import { ReactComponent as Skip } from "../common/icons/skip-forward.svg";
import { ReactComponent as VolumeOff } from "../common/icons/volume/volume-x.svg";
import { ReactComponent as VolumeLow } from "../common/icons/volume/volume-1.svg";
import { ReactComponent as VolumeHigh } from "../common/icons/volume/volume-2.svg";
import { ReactComponent as List } from "../common/icons/list.svg";

let playInterval;

export default function Controls({
	audioState,
	resume,
	pause,
	nextSong,
	prevSong,
	updateTime,
	changeVolume,
}) {
	const audio = useRef();

	const [time, setTime] = useState(0);
	const [scrubbing, setScrubbing] = useState(false);
	const [transition, setTransition] = useState(false);
	const [hasLoaded, setLoaded] = useState(true);
	const [keyPressed, setKeyPressed] = useState(false);

	const onplaying = () => {
		!audioState.isPlaying && resume();
	};
	const onpause = () => {
		audioState.isPlaying && pause();
	};

	const togglePlaying = () => {
		if (audioState.isPlaying && audio.current) {
			audio.current.pause();
			pause();
		} else {
			audio.current.play();
			resume();
		}
	};

	const onload = () => {
		setLoaded(true);
	};

	const onEnded = () => {
		resume();
		nextSong();
	};

	const downHandler = (e) => {
		if (audioState.isFocused === false) {
			if (e.key === " ") {
				e.preventDefault();
				!keyPressed && togglePlaying();
			}
			setKeyPressed(true);
		}
	};

	const upHandler = (e) => {
		setKeyPressed(false);
	};

	useEffect(() => {
		window.addEventListener("keydown", downHandler);
		window.addEventListener("keyup", upHandler);
		return () => {
			window.removeEventListener("keydown", downHandler);
			window.removeEventListener("keyup", upHandler);
		};
	});

	useEffect(() => {
		const createTimeInterval = () => {
			playInterval = setInterval(() => {
				if (audio.current) {
					updateTime({
						current: audio.current.currentTime,
						max: audio.current.duration,
					});
				}
			}, 1000);
		};

		if (audioState.isPlaying && audio.current) {
			clearInterval(playInterval);
			audio.current
				.play()
				.then(() => {
					hasLoaded && createTimeInterval();
				})
				.catch((err) => console.log(err));
		} else if (
			!audioState.isPlaying &&
			audio.current &&
			audio.current.src
		) {
			audio.current.pause();
			clearInterval(playInterval);
		}
	}, [audioState.isPlaying, hasLoaded, updateTime]);

	function timeFormat(time) {
		const hours = ~~(time / 3600);
		const minutes = ~~((time % 3600) / 60);
		const seconds = ~~time % 60;

		var ret = "";

		if (hours > 0) {
			ret += "" + hours + ":" + (minutes < 10 ? "0" : "");
		}

		ret += "" + minutes + ":" + (seconds < 10 ? "0" : "");
		ret += "" + seconds;
		return ret;
	}

	let volume = parseFloat(audioState.volume);

	if (isFinite(volume) && audio.current) {
		audio.current.volume = volume;
	}

	let volumeIcon;

	if (volume === 0) {
		volumeIcon = <VolumeOff />;
	} else if (volume < 0.5) {
		volumeIcon = <VolumeLow />;
	} else {
		volumeIcon = <VolumeHigh />;
	}

	const propTime = audioState.time.current;
	const stateTime = time;
	const timeVal = scrubbing || transition ? stateTime : propTime;

	return (
		<div className="controls">
			<div className="controlWrapper">
				<div className="currentSong">
					<audio
						id="audio"
						ref={audio}
						onCanPlayThrough={onload}
						onPlaying={onplaying}
						onPause={onpause}
						onLoadStart={() => setLoaded(false)}
						volume={audioState.volume}
						onEnded={onEnded}
						onError={(err) => console.log(err)}
						src={
							audioState.playlist[audioState.currentIndex]
								? // && audioState.playlist[0]
								  audioState.playlist[audioState.currentIndex]
										.file
								: null
							// queue.length && inQueue
							// 	? queue[0]
							// 	: !!playlist.length
							// 	? playlist[currentIndex].file
							// 	: null
						}
					></audio>
					{audioState.playlist[audioState.currentIndex] &&
						audioState.playlist[0] && (
							<>
								<Link
									className="album-cover"
									to={
										"/album/" +
										audioState.playlist[
											audioState.currentIndex
										].album
									}
								>
									<img
										src={
											audioState.playlist[
												audioState.currentIndex
											].img
										}
										alt="album cover"
									/>
								</Link>
								<div className="info ellipsis-one-line">
									<Link
										to={
											"/album/" +
											audioState.playlist[
												audioState.currentIndex
											].album
										}
										className="title link-border"
									>
										{
											audioState.playlist[
												audioState.currentIndex
											].name
										}
									</Link>

									<div className="artist ellipsis-one-line">
										{audioState.playlist[
											audioState.currentIndex
										].artists.map((artist, i) => {
											return (
												<span key={i}>
													<Link
														className=""
														to={
															"/artist/" +
															artist._id
														}
													>
														{artist.name}
													</Link>
													{i <
														audioState.playlist[
															audioState
																.currentIndex
														].artists.length -
															1 && ", "}
												</span>
											);
										})}
									</div>
								</div>
							</>
						)}
				</div>
				<div className="control">
					<div className="buttons">
						<button
							className="skipButton"
							style={{ transform: "matrix(-1, 0, 0, 1, 0, 0)" }}
							onClick={prevSong}
						>
							<Skip />
						</button>
						<button
							className={
								!hasLoaded ? "playButton loading" : "playButton"
							}
							onClick={togglePlaying}
						>
							{audioState.isPlaying ? <Pause /> : <Play />}
						</button>
						<button className="skipButton" onClick={nextSong}>
							<Skip />
						</button>
					</div>
					<div className="progress">
						<div className="progress-time">
							{timeFormat(audioState.time.current)}
						</div>
						<Slider
							value={timeVal}
							max={audio.current && audio.current.duration}
							onChangeStart={(val) => {
								setScrubbing(true);
								setTime(val);
							}}
							onChange={(val) => {
								setTime(val);
							}}
							onChangeComplete={(val) => {
								setTime(val);
								setScrubbing(false);
								setTransition(true);

								if (
									isFinite(parseFloat(val)) &&
									audio.current
								) {
									audio.current.currentTime = val;
								}
								setTimeout(() => {
									setTransition(false);
									updateTime({
										current: val,
										max: audio.current.duration,
									});
								}, 100);
							}}
						/>
						<div className="progress-time">
							{timeFormat(audioState.time.max)}
						</div>
					</div>
				</div>
				<div className="options">
					<div className="options-inner">
						<div className="options-container">
							<Link to="/queue" className="queue">
								<button className="control-button">
									<List />
								</button>
							</Link>
							<div className="volume-bar">
								<button className="control-button">
									{volumeIcon}
								</button>
								<Slider
									value={audioState.volume}
									onChange={(val) => changeVolume(val)}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
