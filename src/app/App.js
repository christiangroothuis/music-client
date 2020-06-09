import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Nav from './components/nav';
import Controls from './components/ControlsContainer';

import Home from './home/HomeContainer';
import Search from './search/SearchContainer';
import Collection from './collection/CollectionContainer';

import Artist from './artist/ArtistContainer';
import Album from './album/AlbumContainer';

import './App.scss';

function App() {
    return (
        <Router>
            <div className="wrapper">
                <div className="App">

                    <Nav />

                    <div className="main">
                        <Switch>
                            <Route path="/" exact><Home /></Route>
                            <Route path="/search"><Search /></Route>
                            <Route path="/collection"><Collection /></Route>

                            <Route path="/about"></Route>

                            <Route path="/queue">Queue</Route>

                            <Route path="/album/:albumId"><Album /></Route>
                            <Route path="/artist/:artistId"><Artist /></Route>
                            <Route path="/playlist/:playlistId">Library</Route>
                        </Switch>
                    </div>

                    <Controls />

                </div>
            </div>
        </Router>
    );
}


export default App;