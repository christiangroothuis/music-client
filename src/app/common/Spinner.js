import React from 'react';

import Main from "./Main";

const ErrorPage = () => {
    return (
        <Main>
            <div className="center">
                <svg className="circular" viewBox="25 25 50 50">
                    <circle cx="50" cy="50" r="20" fill="none" strokeMiterlimit="10" />
                </svg>
            </div>
        </Main>
    )
}

export default ErrorPage;
