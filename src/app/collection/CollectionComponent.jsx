import React, { useEffect } from "react";
import Main from "../common/Main";
import CardSection from "../common/CardSection";

function Collection(props) {
    useEffect(() => {
		if (props.artists.length === 0) {
			props.getArtists();
		}
	}, [props]);

    return (
        <Main>
            <CardSection title='Artists' data={props.artists} />
        </Main>
    );
}

export default Collection;
