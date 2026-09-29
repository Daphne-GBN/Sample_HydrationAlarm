import { useState, useEffect } from "react";
import Duck from "./components/Duck";
import useHydration from "./hooks/useHydration";
import "./App.css";
import waterSound from "./assets/water-drink.mp3";

function App() {

  // STATES
  const [isDrinking, setIsDrinking] = useState(false);
  const [remindersEnabled, setRemindersEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // HYDRATION
const {
  water,
  addWater,
  resetHydration,
  speed,
  setSpeed,
  hydration,
  streak
} = useHydration(0);

  const GOAL_ML = 2000;

  // FUNCTIONS
  const handleAddWater = (amount) => {
    addWater(amount);

    if (soundEnabled) {
  const audio = new Audio(waterSound);
  audio.play();

  setTimeout(() => {
    audio.pause();
    audio.currentTime = 0;
  }, 1500);
}
    setIsDrinking(true);

    setTimeout(() => {
      setIsDrinking(false);
    }, 1000);
  };

  const enableReminders = async () => {
    if (!("Notification" in window)) {
      alert("Your browser does not support notifications.");
      return;
    }

    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      setRemindersEnabled(true);

      new Notification("🦆 Duckyhydration Alarm", {
        body: "Reminders are enabled! I'll let you know when Ducky gets thirsty. 💧",
      });
    }
  };

  // EFFECTS
  useEffect(() => {
    if (!remindersEnabled) return;

    const checkReminder = setInterval(() => {
      // Reminder logic will go here later
    }, 60000);

    return () => clearInterval(checkReminder);
  }, [remindersEnabled]);

  const progress = hydration;

  // UI
  return (
    <div className={`app ${darkMode ? "dark-mode" : ""}`}>
      <div className="card">

        <h1>🦆 SlayG Duckyhydration Alarm</h1>

        <Duck
          progress={progress}
          isDrinking={isDrinking}
        />

        <h2>
          Water consumed: {water} ml
        </h2>

        <h3>
          Daily goal: {GOAL_ML} ml
        </h3>

        <p>
          Progress: {Math.round(progress)}%
        </p>
        <p>
  🔥 Hydration Streak: {streak} day{streak !== 1 ? "s" : ""}
</p>

        <progress
          value={progress}
          max="100"
        ></progress>

        <div className="water-buttons">

          <button onClick={() => handleAddWater(100)}>
            +100 ml
          </button>

          <button onClick={() => handleAddWater(250)}>
            +250 ml
          </button>

          <button onClick={() => handleAddWater(500)}>
            +500 ml
          </button>

          <button onClick={() => handleAddWater(750)}>
            +750 ml
          </button>

        </div>
        <button
  className="reset-button"
  onClick={resetHydration}
>
  🔄 Reset Hydration
</button>

        <div className="speed-controls">

          <p>Time Speed</p>

          <div className="speed-buttons">

            <button onClick={() => setSpeed(1)}>
              1×
            </button>

            <button onClick={() => setSpeed(60)}>
              60×
            </button>

            <button onClick={() => setSpeed(600)}>
              600×
            </button>

          </div>

        </div>

        {/* REMINDER */}

        <div className="reminder-controls">

          {!remindersEnabled ? (
            <button onClick={enableReminders}>
              🔔 Enable Reminders
            </button>
          ) : (
            <p>🔔 Reminders are ON</p>
          )}

        </div>
        <div className="theme-controls">
  <button onClick={() => setDarkMode(!darkMode)}>
    {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
  </button>
</div>
<div className="sound-controls">
  <button onClick={() => setSoundEnabled(!soundEnabled)}>
    {soundEnabled ? "🔊 Sound ON" : "🔇 Sound OFF"}
  </button>
</div>

      </div>
    </div>
  );
}

export default App;