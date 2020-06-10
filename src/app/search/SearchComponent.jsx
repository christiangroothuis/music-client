import React, { useState, useEffect, useRef } from "react";

import { API_URL } from "../../constants";

import Main from "../common/Main";
import CardSection from "../common/CardSection";

import { ReactComponent as Search } from "../common/icons/search.svg";

function Artist({ setFocus }) {
	const [query, setQuery] = useState("");
	const [result, setResult] = useState("");

	const inputRef = useRef();

	useEffect(() => {
		inputRef.current.focus();
	}, []);

	const fetchSearch = (query) => {
		fetch(`${API_URL}/search/${query}`)
			.then((res) => res.json())
			.then((res) => setResult(res))
			.catch((err) => console.log(err));
	};

	const onChange = (e) => {
		const searchQuery = e.target.value;
		setQuery(searchQuery);

		if (searchQuery.length > 0) {
			if (query.length % 2 === 0) {
				fetchSearch(searchQuery);
			}
		}
	};

	return (
		<Main
			navBar={
				<>
					<div className="search">
						<input
							ref={inputRef}
							onChange={onChange}
							maxLength="80"
							autoCorrect="off"
							autoCapitalize="off"
							spellCheck="false"
							placeholder="Search for Artists and Albums"
							value={query}
							onFocus={() => setFocus(true)}
							onBlur={() => setFocus(false)}
						/>
						<div className="search-icon">
								<Search />
						</div>
					</div>
				</>
			}
		>
			{
				query.length > 0 && [
					result.albums && result.albums.length > 0 && (
						<CardSection
							title="Albums"
							rows="1"
							data={result.albums}
						/>
					),
					result.artists && result.artists.length > 0 && (
						<CardSection
							title="Artists"
							rows="1"
							data={result.artists}
						/>
					),
					result.songs && result.songs.length > 0 && (
						<CardSection
							title="Songs"
							rows="1"
							data={result.songs}
						/>
					),
				]
				// <CardSection title="Recent searches" />
			}
		</Main>
	);
}

export default Artist;
