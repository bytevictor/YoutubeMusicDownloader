import React, { useState } from "react";

function SongPlayer() {
  const [songUrl, setSongUrl] = useState("");
  const [songTitle, setSongTitle] = useState("");
  const [songArtist, setSongArtist] = useState("");
  const [songThumbnail, setSongThumbnail] = useState("");

  const handleInputChange = (event) => {
    setSongUrl(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const videoId = songUrl.split("=")[1];
    fetch(`https://youtube-music-api.herokuapp.com/api/yt/songs/${videoId}`)
      .then((response) => response.json())
      .then((data) => {
        setSongTitle(data.title);
        setSongArtist(data.artist);
        setSongThumbnail(data.thumbnail);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          URL de la canción de YouTube Music:
          <input type="text" value={songUrl} onChange={handleInputChange} />
        </label>
        <button type="submit">Reproducir</button>
      </form>
      {songTitle && (
        <div>
          <h2>{songTitle}</h2>
          <h3>{songArtist}</h3>
          <img src={songThumbnail} alt={`${songTitle} thumbnail`} />
          <audio controls src={`https://www.youtube.com/watch?v=${songUrl.split("=")[1]}`}></audio>
        </div>
      )}
    </div>
  );
}

export default SongPlayer;
