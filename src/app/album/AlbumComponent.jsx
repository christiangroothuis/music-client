import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import { API_URL } from "../../constants";

import Main from "../common/Main";
import PagePlayOptions from "../common/PagePlayOptions";

import SpinnerPage from "../common/Spinner";
import ErrorPage from "../common/ErrorPage";

import { ReactComponent as Music } from "../common/icons/music.svg";
import { ReactComponent as Play } from "../common/icons/play.svg";
import { ReactComponent as Pause } from "../common/icons/pause.svg";
import { ReactComponent as Volume } from "../common/icons/volume/volume-2.svg";

function Album({ playAlbum, pause, isPlaying, playlist, currentIndex }) {
	const { albumId } = useParams();

	const [album, setAlbum] = useState();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		axios
			.get(`${API_URL}/albums/${albumId}`)
			.then((res) => setAlbum(res.data.album))
			.then(setLoading(false))
			.catch((err) => {
				setError(err.response.status);
				console.log(err.config);
			});
	}, [albumId]);

	if (error) {
		return <ErrorPage item="album" />;
	}

	if (loading || !album) {
		return <SpinnerPage />;
	}

	let time = "";

	if (album.tracks) {
		const total = Object.values(album.tracks).reduce(
			(t, { duration }) => t + duration,
			0
		);

		const hours = ~~(total / 3600);
		const minutes = ~~((total % 3600) / 60);
		const seconds = ~~total % 60;

		if (hours > 0) {
			time += "" + hours + " hr " + (minutes < 10 ? "0" : "");
		}

		time += "" + minutes + " min ";
		if (seconds !== 0) time += "" + seconds + " sec";
	}

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

	return (
		<Main
			navBar={<span>{album.name}</span>}
			color={album.color}
			header={
				<div className="head">
					<div
						style={{ backgroundColor: album.color }}
						className="cover-full"
					></div>
					<div className="overlay cover-full"></div>
					<div className="album">
						<img src={album.img} alt={album.name} />
					</div>
					<div className="info">
						<h2>Album</h2>
						<div className="name title">
							<h1>{album.name}</h1>
						</div>
						<div className="data">
							<div className="artists">
								{album.artists.map((artist, i) => {
									return (
										<div key={i}>
											<Link
												className="link-border"
												to={"/artist/" + artist._id}
											>
												{artist.name}
											</Link>
											{i < album.artists.length - 1 &&
												" • "}
										</div>
									);
								})}
							</div>
							•
							<span>
								{album.release_date &&
									new Date(album.release_date).getFullYear()}
							</span>
							•<span>{time}</span>
						</div>
					</div>
					<div
						style={{ backgroundColor: album.color }}
						className="gradient"
					></div>
				</div>
			}
		>
			<PagePlayOptions
				play={() => playAlbum({ album: album._id })}
				pause={()=>pause()}
				playlist={playlist}
				currentIndex={currentIndex}
				id={album._id}
				isPlaying={isPlaying}
			/>

			<ol>
				{album.tracks &&
					album.tracks.map((track, i) => {
						return (
							<li
								key={i}
								className={
									playlist[currentIndex] &&
									playlist[currentIndex]._id === track._id
										? "track active"
										: "track"
								}
							>
								<div
									className="icon top-align"
									onClick={() => {
										isPlaying &&
										playlist[currentIndex] &&
										playlist[currentIndex]._id === track._id
											? pause()
											: playAlbum({
													album: album._id,
													index: i,
											  });
									}}
								>
									{isPlaying && playlist[currentIndex] &&
									playlist[currentIndex]._id === track._id ? (
										<>
											<Pause className="hover" />
											<Volume />
										</>
									) : (
										<>
											<Play className="hover" />
											<Music />
										</>
									)}
								</div>
								<div className="name">
									<div className="name-wrapper top-align">
										<div className="track-name ellipsis-one-line">
											{track.name}
										</div>
										<div className="artists">
											{track.artists.map((artist, i) => {
												return (
													<span key={i}>
														<Link
															className="link-border"
															to={
																"/artist/" +
																artist._id
															}
														>
															{artist.name}
														</Link>
														{i <
															track.artists
																.length -
																1 && ", "}
													</span>
												);
											})}
										</div>
									</div>
								</div>
								<div className="duration">
									<div className="top-align">
										{timeFormat(track.duration)}
									</div>
								</div>
							</li>
						);
					})}
			</ol>
		</Main>
	);
}

export default Album;
