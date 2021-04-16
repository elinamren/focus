import "./App.css";
import Header from "./components/Header";
import PlayList from "./components/PlayList";
import TimeDisplay from "./components/TimeDisplay";

const sessionBreak = false;

function App() {
  return (
    <div
      className="App"
      style={
        sessionBreak
          ? {
              backgroundImage:
                "linear-gradient(rgb(141, 205, 138) 40%, rgb(148, 179, 255))",
            }
          : {
              backgroundImage:
                "linear-gradient(rgb(255, 208, 182) 40%, rgb(255, 183, 195))",
            }
      }
    >
      <Header session={sessionBreak ? "Break" : "Focus"} />
      <TimeDisplay />
      <button id="reset-button">Reset</button>
      <button id="session-button">{sessionBreak ? "Focus" : "Break"}</button>
      <br />
      <PlayList />
    </div>
  );
}

export default App;
