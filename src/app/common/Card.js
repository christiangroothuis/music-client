import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as User } from './icons/user.svg';
import { ReactComponent as Music } from './icons/music.svg';

function Card({ title, type, id, artists, img }) {
    const [error, setError] = useState(false);

    let cardClass = 'card-image';
    let href = '';
    let desc = '';

    switch (type) {
        case 'album':
            href = `/album/${id}`;
            if (artists) {
                desc = artists.map((artist, i) => {
                    return (
                        <>
                            <Link
                                className="link-border"
                                key={i}
                                to={'/artist/' + artist._id}
                            >
                                {artist.name}

                            </Link>
                            {i < artists.length - 1 ? ',  ' : ''}
                        </>
                    )
                })
            }
            break;
        case 'song':
            console.log(type, artists)
            href = `/album/${id}`;
            if (artists) {
                desc = artists.map((artist, i) => {
                    return (
                        // <div key={i}>
                        <>
                            <Link
                                className="link-border"

                                to={'/artist/' + artist._id}
                            >
                                {artist.name}

                            </Link>
                            {i < artists.length - 1 ? ',  ' : ''}
                        </>
                        // </div>
                    )
                })
            }
            break;
        case 'artist':
            href = `/artist/${id}`;
            desc = 'Artist';
            cardClass = 'card-image artist';
            break;
        case 'playlist':
            href = `/playlist/${id}`;
            desc = 'Playlist';
            break;
        default:
    }

    const onError = () => {
        setError(true)
    }

    return (

        <div className="card">
            <div className="card-wrapper">
                <div className={cardClass}>
                    <img
                        onError={onError}
                        src={img}
                        alt=""
                    />
                    {error &&
                        <div className='placeholder'>
                            {type === 'artist' ? <User /> : <Music />}
                        </div>
                    }
                </div>
                <div className="card-text">
                    <span className="title">{title}</span>
                    <span className="desc">{desc}</span>
                </div>

            </div>
            <Link to={href} className="card-link"></Link>
        </div>

    )
}

export default Card;