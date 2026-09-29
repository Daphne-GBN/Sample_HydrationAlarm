import { useEffect, useRef, useState } from "react";

function useHydration(initialWater = 0) {
const [water, setWater] = useState(() => {
  const savedWater = localStorage.getItem("ducky-water");
  return savedWater ? Number(savedWater) : initialWater;
});
const [speed, setSpeed] = useState(1);

const [lastDrinkTime, setLastDrinkTime] = useState(Date.now());
const reminderSent = useRef(false);
const [streak, setStreak] = useState(() => {
  const savedStreak = localStorage.getItem("ducky-streak");
  return savedStreak ? Number(savedStreak) : 0;
});
const [lastGoalDate, setLastGoalDate] = useState(() => {
  return localStorage.getItem("ducky-last-goal-date") || "";
});
 useEffect(() => {
  const reminderInterval = setInterval(() => {
    const timeSinceLastDrink = Date.now() - lastDrinkTime;

    const oneHour = 60 * 60 * 1000;

    if (
      timeSinceLastDrink >= oneHour &&
      !reminderSent.current
    ) {
      if ("Notification" in window) {
        if (Notification.permission === "granted") {
          new Notification("🦆 Ducky is thirsty!", {
            body: "You haven't had any water in an hour. Give Ducky a drink! 💧",
          });
        }
      }

      reminderSent.current = true;
    }
  }, 60 * 1000);

  return () => clearInterval(reminderInterval);
 
}, [lastDrinkTime]);

useEffect(() => {
  localStorage.setItem("ducky-water", water);
}, [water]);


const addWater = (amount) => {
  setWater((currentWater) => {
    const newWater = currentWater + amount;

    // Check if daily goal is reached
    if (newWater >= 2000) {
      const today = new Date().toDateString();

      if (lastGoalDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        const yesterdayString = yesterday.toDateString();

        if (lastGoalDate === yesterdayString) {
          setStreak((currentStreak) => {
            const newStreak = currentStreak + 1;
            localStorage.setItem("ducky-streak", newStreak);
            return newStreak;
          });
        } else {
          setStreak(1);
          localStorage.setItem("ducky-streak", 1);
        }

        setLastGoalDate(today);
        localStorage.setItem("ducky-last-goal-date", today);
      }
    }

    return newWater;
  });

  setLastDrinkTime(Date.now());
  reminderSent.current = false;
};
const resetHydration = () => {
  setWater(0);
  localStorage.setItem("ducky-water", 0);

  setLastDrinkTime(Date.now());
  reminderSent.current = false;
};
 const hydration = Math.min((water / 2000) * 100, 100);

return {
  water,
  addWater,
  resetHydration,
  speed,
  setSpeed,
  hydration,
  streak,
};
}

export default useHydration;