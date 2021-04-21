import "./App.css";
import { useState } from "react";
import Pomodoro from "./components/pomodoro/Pomodoro";
import ToDo from "./components/todo/ToDo";

function App() {
  const [sessionType, setSessionType] = useState("Focus");
  const sessionBreak = sessionType === "Break";
  return (
    <div
      className="App"
      style={
        sessionBreak
          ? {
              backgroundImage:
                "linear-gradient(to top, #37ecba 0%, #72afd3 100%)",
            }
          : { backgroundImage: "linear-gradient( #FFC796 0%, #ff95b3)" }
      }
    >
      <Pomodoro
        sessionType={sessionType}
        setSessionType={setSessionType}
        sessionBreak={sessionBreak}
      />
      <ToDo />
    </div>
  );
}

export default App;
