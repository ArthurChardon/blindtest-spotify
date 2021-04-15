/*global swal*/

import React from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';
import { useState, useEffect } from 'react';

const apiToken = 'BQDcvCoFlelGuKGxTLP1jvgKrdXvPjEyEZScMcT5caQsOm4tkGhgyIC8gpt2gmzCuB7vzKLy43reFxPcTcfGmstuGjfHNC8puPfMpYUr2j3cmgULVSF8lhGiQPmDVC3i3dXfYMXKG2R6WNkZ3zY20Zg';

function shuffleArray(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = getRandomNumber(counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

/* Return a random number between 0 included and x excluded */
function getRandomNumber(x) {
  return Math.floor(Math.random() * x);
}



const App = () => {
  const [text, setText] = useState('');
  const [tracks, setTracks] = useState([]);
  const [songsLoaded, setSongsLoaded] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(null);

  const AlbumCover = (props) => {
    const src = props.track.track.album.images[0].url;
    return (
      <img src={src} style={{ width: 400, height: 400}} />
    )
  }

  useEffect (() => {fetch('https://api.spotify.com/v1/me/tracks', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + apiToken,
    },
  }).then(response=>response.json())
    .then((data) => {
      console.log("Réponse reçue ! Voilà ce que j'ai reçu : ", data);
      setTracks(data.items);
      setCurrentTrack(data.items[getRandomNumber(data.items.length)]);
      setSongsLoaded(true)
    })}, []);

    function checkAnswer(id)
    {
      if(id == currentTrack.track.id)
      {
        swal('Bravo', 'encore bravo', 'success');
      }
      else
      {
        swal('Nul', 'Très nul', 'error')
      }
    }


    if(!songsLoaded) {
      return (
        <div className="App">
          <header className="App-header">
            <img src={loading} className="App-loading" alt="loading"/>
            <h1 className="App-title">Chargement des musiques</h1>
          </header>
          <div className="App-images">
            <p>{text}</p>
          </div>
          <div className="App-buttons">
          </div>
        </div>
      )
    }
    else {
      //currentTrack = tracks[0];
      let previewUrl = currentTrack.track.preview_url;

      let track0 = tracks[getRandomNumber(tracks.length)];
      let track1 = tracks[getRandomNumber(tracks.length)];
      let track2 = currentTrack;

      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1 className="App-title">Bienvenue sur le Blindtest de la zone !!</h1>
          </header>
          <div className="App-images">
          <h2 className="App-texte">Il y a {tracks.length} chansons.</h2>
            <AlbumCover track={currentTrack} />
            <Sound url={previewUrl} playStatus={Sound.status.PLAYING}/>
          </div>
          <div className="App-buttons">
            <Button onClick={() => checkAnswer(track0.track.id)}>{track0.track.name}</Button>
            <Button onClick={() => checkAnswer(track1.track.id)}>{track1.track.name}</Button>
            <Button onClick={() => checkAnswer(track2.track.id)}>{track2.track.name}</Button>
          </div>
        </div>
      );
    }
}

export default App;
