import React from 'react';

import Main from "./Main";

import { ReactComponent as Music } from './icons/music.svg';

const ErrorPage = ({ item }) => {
    return (
        <Main>
            <div className="center">
                <Music />

                <p>
                    Couldn't find that {item || 'page'}
                </p>
            </div>
        </Main>
    )
}

export default ErrorPage;
