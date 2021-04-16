import "./App.css";
import TimeDisplay from "./components/TimeDisplay";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Focus</h1>
      </header>
      <TimeDisplay />
      <iframe
        title="Deep Focus Playlist"
        src="https://open.spotify.com/embed/playlist/37i9dQZF1DWZeKCadgRdKQ"
        width="300"
        height="380"
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media"
      ></iframe>
    </div>
  );
}

export default App;
