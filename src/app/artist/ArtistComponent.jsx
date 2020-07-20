import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { API_URL } from "../../constants";

import Main from "../common/Main";
// import PagePlayOptions from "../common/PagePlayOptions";
import CardSection from "../common/CardSection";

import SpinnerPage from "../common/Spinner";
import ErrorPage from "../common/ErrorPage";

function Artist({ artists, getArtist, playArtist }) {
	const { artistId } = useParams();

	const [artist, setArtist] = useState();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const [imgError, setimgError] = useState(false);
	const [imgLoaded, setImgLoaded] = useState(false);

	useEffect(() => {
		axios
			.get(`${API_URL}/artists/${artistId}`)
			.then((res) => setArtist(res.data.artist))
			.then(setLoading(false))
			.catch((err) => {
				setError(err.response.status);
				console.log(err.config);
			});
	}, [artistId]);

	if (error) {
		return <ErrorPage item="artist" />;
	}

	if (loading || !artist) {
		return <SpinnerPage />;
	}

	return (
		<Main
			navBar={<span>{artist.name}</span>}
			color={artist.color}
			header={
				<div style={{ backgroundColor: artist.color }} className="head">
					<div className="cover-full bg"></div>
					<div className="avatar cover-full">
						<img
							className={imgLoaded ? "loaded" : ""}
							src={artist.img}
							alt={artist.name}
							onLoad={() => setImgLoaded(true)}
							onError={() => setimgError(true)}
						/>
					</div>
					{imgError && (
						<div
							style={{ backgroundColor: artist.color }}
							className="cover-full bg"
						></div>
					)}
					<div className="overlay cover-full"></div>
					<div className="info">
						<div className="name">
							<h1>{artist.name}</h1>
						</div>
					</div>
					<div
						style={{ backgroundColor: artist.color }}
						className={
							imgLoaded
								? "loaded gradient artist"
								: "gradient artist"
						}
					></div>
				</div>
			}
		>
			{/* <PagePlayOptions play={() => playArtist({ artist: artist._id })} /> */}
			{artist.albums.length > 0 && (
				<CardSection title="Albums" data={artist.albums} />
			)}
			{artist.featuredAlbums.length > 0 && (
				<CardSection title="Appears on" data={artist.featuredAlbums} />
			)}
		</Main>
	);
}

export default Artist;
