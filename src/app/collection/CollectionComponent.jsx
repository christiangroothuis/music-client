import React, { useEffect } from "react";
import { NavLink, Route, Redirect } from "react-router-dom";
import Main from "../common/Main";
import CardSection from "../common/CardSection";

function Collection({ getAlbums, getArtists, albums, artists }) {
	useEffect(() => {
		if (albums.length === 0) {
			getAlbums();
		}
		if (artists.length === 0) {
			getArtists();
		}
	}, [getArtists, getAlbums, albums, artists]);

	return (
		<Main
			navBar={
				<nav>
					<ul>
						<li>
							<NavLink to="/collection/albums">Albums</NavLink>
						</li>
						<li>
							<NavLink to="/collection/artists">Artists</NavLink>
						</li>
					</ul>
				</nav>
			}
		>
			<Route path="/collection/" exact>
				<Redirect to="/collection/albums" />
			</Route>
			<Route path="/collection/albums">
				<CardSection title="Albums" data={albums} />
			</Route>
			<Route path="/collection/artists">
				<CardSection title="Artists" data={artists} />
			</Route>
		</Main>
	);
}

export default Collection;
