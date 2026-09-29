import duckImage from "../assets/duck.png";
function Duck({ progress, isDrinking }) {
  let mood;
  let message;

  if (progress >= 80) {
    mood = "😍";
    message = "I'm feeling amazing!";
  } else if (progress >= 50) {
    mood = "😊";
    message = "I'm feeling good!";
  } else if (progress >= 25) {
    mood = "🙂";
    message = "A little more water would be nice.";
  } else if (progress >= 10) {
    mood = "😟";
    message = "I'm getting thirsty...";
  } else {
    mood = "🥵";
    message = "I REALLY need some water!";
  }

  return (
    <div>
  <div className={`duck ${isDrinking ? "drinking" : ""}`}>
  <img src={duckImage} alt="Ducky" />
</div>

      <h2>{message}</h2>

      <p>Hydration: {Math.round(progress)}%</p>
    </div>
  );
}

export default Duck;