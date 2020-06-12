import React, { useRef, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import { ReactComponent as Arrow } from './icons/chevron-left.svg';

const Main = ({ history, color, header, navBar, children }) => {
    const contentRef = useRef();

    const [topBarOpacity, setTopBarOpacity] = useState(0);
    const [showNavContent, setShowNavContent] = useState(false);

    // Change opacity of topbar based of offsetTop of contentRef
    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY <= contentRef.current.offsetTop - 60) {
                setTopBarOpacity(0)
                setShowNavContent(false)
            }
            else if (window.scrollY >= contentRef.current.offsetTop) {
                setTopBarOpacity(1)
                setShowNavContent(true);
            }
            else {
                setTopBarOpacity((1 - (contentRef.current.offsetTop - window.scrollY) / 60))
                setShowNavContent(false)
            }
        };
        
        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const goBack = () => {
        history.goBack();
    }
    const goForward = () => {
        history.goForward();
    }

    const shadeColor = (color, percent) => {

        var R = parseInt(color.substring(1, 3), 16);
        var G = parseInt(color.substring(3, 5), 16);
        var B = parseInt(color.substring(5, 7), 16);

        R = parseInt(R * (100 + percent) / 100);
        G = parseInt(G * (100 + percent) / 100);
        B = parseInt(B * (100 + percent) / 100);

        R = (R < 255) ? R : 255;
        G = (G < 255) ? G : 255;
        B = (B < 255) ? B : 255;

        var GG = ((G.toString(16).length === 1) ? "0" + G.toString(16) : G.toString(16));
        var RR = ((R.toString(16).length === 1) ? "0" + R.toString(16) : R.toString(16));
        var BB = ((B.toString(16).length === 1) ? "0" + B.toString(16) : B.toString(16));

        return "#" + RR + GG + BB;
    }

    const darkenedColor = color ? shadeColor(color, -60) : '';

    return (
        <div>
            <header>
                <div style={{ opacity: topBarOpacity, backgroundColor: darkenedColor }} className="bg cover-full"></div>
                <div className="nav-buttons">
                    <button onClick={goBack} title='Go back'><Arrow /></button>
                    <button style={{ transform: "matrix(-1, 0, 0, 1, 0, 0)" }} title='Go forward' onClick={goForward}><Arrow /></button>
                </div>
                <div className="content-wrapper">
                    <div className={showNavContent ? 'top-bar-content show' : 'top-bar-content'}>
                        {navBar}
                    </div>
                </div>
            </header>

            {header ? header : <div className="topNav-spacer"></div>}

            <div className="main-container">
                <div className="content content-spacing" ref={contentRef}>
                    {children}
                </div>
            </div>
        </div>
    )
};

export default withRouter(Main);
