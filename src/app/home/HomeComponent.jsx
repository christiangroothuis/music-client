import React, { useEffect } from "react";
import Main from "../common/Main";
import CardSection from "../common/CardSection";

function Home({getHome, home, recents}) {
	useEffect(() => {
		if (home.albums.length === 0 && home.artists.length === 0) {
			getHome();
		}
	}, [getHome, home.albums.length, home.artists.length]);

	return (
		<Main>
			{recents.length > 0 && (
				<CardSection
					// link="/genre/recently-played"
					rows="1"
					title="Recently played"
					data={recents}
				/>
			)}
			<CardSection
				link="/collection/albums"
				rows="1"
				title="Featured albums"
				data={home.albums}
			/>
			<CardSection
				link="/collection/artists"
				rows="1"
				title="Featured artists"
				data={home.artists}
			/>
		</Main>
	);
}

export default Home;
