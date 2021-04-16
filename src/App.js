import "./App.css";
import Header from "./components/Header";
import PlayList from "./components/PlayList";
import TimeDisplay from "./components/TimeDisplay";
import { useState } from "react";
import audioBells from "./bells.wav";

function App() {
  const timeIsUpSound = new Audio(audioBells);
  const [sessionType, setSessionType] = useState("Focus");
  const [timeLeft, setTimeLeft] = useState(5);
  const [intervalId, setIntervalId] = useState(null);
  const isStarted = intervalId !== null;

  const sessionBreak = sessionType === "Break";

  const handleStartStop = () => {
    if (isStarted) {
      clearInterval(intervalId);
      setIntervalId(null);
    } else {
      const newIntervalId = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1;
          if (prevTime <= 0) {
            timeIsUpSound.play();
            return;
          }
          return newTime;
        });
      }, 1000);
      setIntervalId(newIntervalId);
    }
  };

  function handleReset() {
    clearInterval(intervalId);
    setIntervalId(null);
    if (sessionType === "Break") {
      setTimeLeft(5 * 60);
    } else {
      setTimeLeft(25 * 60);
    }
  }

  function handleSessionType() {
    clearInterval(intervalId);
    setIntervalId(null);
    if (sessionType === "Break") {
      setTimeLeft(25 * 60);
      setSessionType("Focus");
    } else {
      setTimeLeft(5 * 60);
      setSessionType("Break");
    }
  }

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
      <Header session={sessionType} />
      <TimeDisplay
        timeLeft={timeLeft}
        handleStartStop={handleStartStop}
        isStarted={isStarted}
      />
      <button id="reset-button" onClick={handleReset}>
        Reset
      </button>
      <button id="session-button" onClick={handleSessionType}>
        {sessionBreak ? "Focus" : "Break"}
      </button>
      <br />
      <PlayList sessionBreak={sessionBreak} />
    </div>
  );
}

export default App;
