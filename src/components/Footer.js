import { useEffect, useState } from "react";
import newMoonImg from "../images/nm.png";
import waxCreImg from "../images/waxc.png";
import firstQuarImg from "../images/fq.png";
import waxGibImg from "../images/waxg.png";
import fullMoonImg from "../images/fm.png";
import wanGibbImg from "../images/wang.png";
import lastQuarImg from "../images/lq.png";
import wanCreImg from "../images/wanc.png";
import MoonImage from "./MoonImage";

const Footer = () => {
  const [moonphase, setMoonphase] = useState(null);
  const [moonImage, setMoonImage] = useState(null);
  const [apiStatus, setApiStatus] = useState(true);

  useEffect(() => {
    const apiLatitude = 59.309384;
    const apiLongitude = 18.034847;
    const apiKey =
      "2dd88788-a4f3-11eb-8d12-0242ac130002-2dd8883c-a4f3-11eb-8d12-0242ac130002";
    const apiUrl =
      "https://api.stormglass.io/v2/astronomy/point?lat=" +
      apiLatitude +
      "&lng=" +
      apiLongitude +
      "&key=" +
      apiKey;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const currentMoon = data.data[0].moonPhase.current.text;
        setApiStatus(true);
        setMoonphase(currentMoon);
      })
      .catch((error) => {
        console.error("Error:", error);
        console.error(
          "You have reached your daily quota: 50, request count: 51"
        );
        setApiStatus(false);
      });
  }, []);

  if (moonphase === "New moon") {
    return setMoonImage(newMoonImg);
  } else if (moonphase === "Waxing crescent") {
    return setMoonImage(waxCreImg);
  } else if (moonphase === "First quarter") {
    return setMoonImage(firstQuarImg);
  } else if (moonphase === "Waxing gibbous") {
    return setMoonImage(waxGibImg);
  } else if (moonphase === "Full moon") {
    return setMoonImage(fullMoonImg);
  } else if (moonphase === "Waning gibbous") {
    return setMoonImage(wanGibbImg);
  } else if (moonphase === "Last quarter") {
    return setMoonImage(lastQuarImg);
  } else if (moonphase === "Waning crescent") {
    return setMoonImage(wanCreImg);
  }

  return (
    <footer>
      {apiStatus ? (
        <div className="moon-container">
          <MoonImage src={moonImage} alt={moonphase} />
          <div>
            <p>{moonphase}</p>
          </div>
        </div>
      ) : (
        <div>
          <MoonImage src={newMoonImg} alt="New moon" />
          <MoonImage src={waxCreImg} alt="Waxing crescent" />
          <MoonImage src={firstQuarImg} alt="First quarter" />
          <MoonImage src={waxGibImg} alt="Waxing gibbous" />
          <MoonImage src={fullMoonImg} alt="Full moon" />
          <MoonImage src={wanGibbImg} alt="Waning gibbous" />
          <MoonImage src={lastQuarImg} alt="Last quarter" />
          <MoonImage src={wanCreImg} alt="Waning crescent" />
        </div>
      )}
    </footer>
  );
};

export default Footer;
