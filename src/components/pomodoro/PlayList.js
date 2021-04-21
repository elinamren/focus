const PlayList = (props) => {
  return (
    <iframe
      title="Deep Focus Playlist"
      src={
        props.sessionBreak
          ? "https://open.spotify.com/embed/playlist/30AJVDE87gt94w4LoPO3lM"
          : "https://open.spotify.com/embed/playlist/37i9dQZF1DWZeKCadgRdKQ"
      }
      width="300"
      height="330"
      frameBorder="0"
      allowtransparency="true"
      allow="encrypted-media"
    ></iframe>
  );
};

export default PlayList;
