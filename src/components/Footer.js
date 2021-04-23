import { useState } from "react";

const Footer = () => {
  const [moonphase, setMoonphase] = useState(null);

  const apiKey = "24QR6NARH6W3LVYURTPTXBFJA";
  const apiUrl =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Stockholm,Sweden?key=" +
    apiKey;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.currentConditions.moonphase);
      const moonphaseNumber = data.currentConditions.moonphase;
      setMoonphase(() => {
        if (moonphaseNumber === 0) {
          return "new moon";
        } else if (moonphaseNumber < 0.25) {
          return "waxing crescent";
        } else if (moonphaseNumber === 0.25) {
          return "first quarter";
        } else if (moonphaseNumber < 0.5) {
          return "waxing gibbous";
        } else if (moonphaseNumber === 0.5) {
          return "full moon";
        } else if (moonphaseNumber < 0.75) {
          return "waning gibbous";
        } else if (moonphaseNumber === 0.75) {
          return "last quarter";
        } else if (moonphaseNumber <= 1) {
          return "waning crescent";
        }
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return (
    <footer>
      <p>{moonphase}</p>
    </footer>
  );
};

export default Footer;
