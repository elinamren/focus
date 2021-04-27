import Header from "./Header";
import PlayList from "./PlayList";
import TimeDisplay from "./TimeDisplay";
import audioBells from "../../bells.wav";
import { useState } from "react";

const Pomodoro = (props) => {
  const timeIsUpSound = new Audio(audioBells);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [intervalId, setIntervalId] = useState(null);
  const isStarted = intervalId !== null;

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
    if (props.sessionType === "Break") {
      setTimeLeft(5 * 60);
    } else {
      setTimeLeft(25 * 60);
    }
  }

  function handleSessionType() {
    clearInterval(intervalId);
    setIntervalId(null);
    if (props.sessionType === "Break") {
      setTimeLeft(25 * 60);
      props.setSessionType("Focus");
    } else {
      setTimeLeft(5 * 60);
      props.setSessionType("Break");
    }
  }

  return (
    <div className="pomodoro-container">
      <Header session={props.sessionType} />
      <TimeDisplay
        timeLeft={timeLeft}
        handleStartStop={handleStartStop}
        isStarted={isStarted}
      />
      <button id="reset-button" onClick={handleReset}>
        Reset
      </button>
      <button id="session-button" onClick={handleSessionType}>
        {props.sessionBreak ? "Focus" : "Break"}
      </button>
      <br />
      <PlayList sessionBreak={props.sessionBreak} />
    </div>
  );
};

export default Pomodoro;
