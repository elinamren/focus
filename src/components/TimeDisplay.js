import { useState } from "react";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import audioBells from "../bells.wav";

momentDurationFormatSetup(moment);

const TimeDisplay = () => {
  const [timeLeft, setTimeLeft] = useState(5);
  const [intervalId, setIntervalId] = useState(null);
  const formattedTimeLeft = moment
    .duration(timeLeft, "s")
    .format("mm.ss", { trim: false });
  const timeIsUpSound = new Audio(audioBells);
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
            return 0;
          }
          return newTime;
        });
      }, 1000);
      setIntervalId(newIntervalId);
    }
  };

  return (
    <div className="time-container">
      <div className="time-display">
        <h2>{formattedTimeLeft}</h2>
      </div>
      <button onClick={handleStartStop} id="start-button">
        <img
          src={
            isStarted
              ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAdVBMVEX///8AAACrq6uHh4elpaXe3t7k5OQMDAx8fHyampqAgIBnZ2fy8vLT09OSkpLZ2dlcXFxxcXHMzMxJSUnBwcH4+PhQUFA2NjY/Pz8aGhqpqalWVla3t7fCwsJsbGwrKyskJCTq6uo4ODgnJycTExONjY1CQkJwr7ExAAAEp0lEQVR4nO3dW3OiQBQEYJRc0BjjJUTdGFAT8v9/4ia72dqqA47jOT0MYvejD3Z9OMwgIiSDo9ksZ0WRZeOqqtJqJDJNq+/Xs2xeFA+z5brcHH8jVTaH5evsoZhnaZVOZfvob3dWFMXsZXlwlidHXl9Vj3lyTvL9It2heKvpee35/mmbrs8RltvzeD/ZjyG+3VDVnr8dvIWpquE7C8BgHavb8wdP4Vbb8JXJuxV4Y2hPGogNwmdLRXJnJI5M7fnSQ2jahl95NAEzY/uktpvUhDNjRZJYpptyYm3fnhQuzMLJh15oG6N/8npC+GKvSKZ6oXoa/Z/nE0LrXvidvRo4B7QnYk+UQvsg/UqpFdqm8Z98uoWPiI5CK7xFtIsdUQohHXOt8A7RLlZ9KYR0ZFqhea34jti+QYTqFREiFNtXCveIjrhC0R5EmGqFgOWw1i6FkK1YRRWKAw4pDNHRsnDkFiIqZEfLwpveC391WHh/MUIxTryzaUF4j6iILBxSiO/wThmiXQg/QnS0LBRnaoRwF6LDO6sQ7UGE8lSJb9aQdrcQM066LDxAOuIK35xCzJ4QVyjagwi1M83lCMU48c4S0t6GcKEUIk64nxJiZpq4QvdMgxkncYWinUJEB4VXJLT//tzQfnXCIOOkZaG4VCIJ0RFX+EQhIBRevlB7WdQDpJ1CRLosLCAdcYV3FAJCIYW2UIhIl4WQCzw7LRxDOrRCzAiatCAURxXewYwgChGhkEJbKESEwssX3iqF1j+u/Q2FiHRZmEI64gpzp3AK6YgrFCQKVaGQQmMoBIRCCo2hEBAKKTTGKUTcNEIvxHyzoRARCik0hkJAKKTQmBaE4pf0PgrvKaTQFAoBoZBCYygEhEIKjaEQEAopNIZCQCik0BgKAaGQQmMoBIRCCo2hEBAKKTSGQkAopNAYCgHp/7UYFFJoDIWAUEihMVcuBDwHNNELMf8kv/Z/lFDoFwopNIZCQCik0BgKAaGQQmOcwv7fJ4pCv1B4+cL+31WQQgptoRARCim0xS3ErLlx76u/dwr7/2wECv1CIYW2UIhIl4WYjrhC8f1bCPv/ZDkK/dJ/Yf+f0kkhhba4hf1/LjeFqg7vvIZo75QwyJPdKUR0dEr4GaKjU8JViI6Whc8U4ju8sw7RfnXCQ4iOTgn7/xnuQnS0LNy2IBQd3sHsI27hBtIxVApLSLtbeA/piCsU7UGEv5TCXY5ob0N4oxRuKPSKWzhAVEQWin0kiHCkFA4o9MoJIaQjrlC0BxFWXRZOEB1xhaJdCveIjrFWCNm+qVt4h+iIK8xaEIqObglvA3T4B7KPFG7hE6JjrhVCRtDMLXxEdLxqhZD2F7fwDdGhBWJuWrFyCxGX0L6phYgTNfIPO1K4Aezs6kEKGaZiOawJAfcX0X+EiN9Ia3dSq+8zC2NFfjAIB1ursDaA6sIP4ziVo+S87IwLRv2QuGHeW5uOLNTfnH7ybmpvOAfWNLOvDZ/i1AgcDErDp9h0+qRx7dpoV8Xbl6a3OzfaVXHSeLR4ZHWea47e9tMPBPBrRtXMdpNh2fhmR48/ylk2Gp6TFPL5/Wufn1V+kxafx7bub4/cgbi5bNXIAAAAAElFTkSuQmCC"
              : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAeFBMVEUAAAD///91dXWGhoZiYmJQUFA+Pj76+vooKCjc3Nzv7+/n5+f19fWampoSEhJDQ0PR0dHDw8NpaWmtra0xMTG0tLR6enrr6+uAgIDHx8egoKA5OTkMDAwXFxdXV1e6urqOjo6enp5UVFQgICAsLCyTk5NmZmZJSUnsKUPMAAAFwElEQVR4nO3d23ITORAGYJqQKHbGYMdxnISDnSWQ93/DFUWxS4JnRi314W8V/y03+oqMJfVo1G/enMz53Wr17fri/el/jZ/bK/qZ4f6uS+SBfsvVmfdw5LOml9nfeY9IOPf0RxbvvAclmYc/gTmbD97jEst5OimktPUemVReP4S/Gfv4yfkwCuzlcVxNCfPjeOM9wOYcpoVEj94jbM34Y/gr+2vvMbZlMSskWj97j7IlV/PAnF3gxeqySEhD3JljKBPmmeO791ArUwrMuf/oPdiqMISUQs4cHCHR8q33ePnhCfPM8Y/3iLnhCokOX73HzAtfSMPRe9CcfKoQEl0FWsjVCfPMEaYEUCuk9OA99MJUC/PMEaMi97lemBdyX7yHX5DLFmGeOfBLAI1CGr55C+bSKsxG8IVcuzDPHNAlAAkhpS1wCeBJQghdAriQEeaFHOrMISbMM8eFN+ZkBIWgCzlJIWYJQFZItD73Fr2OtJDSDqwEIC6EmzkUhGCvHVWERBucmUNJCDRzaAmJ9rfetp95VhOiFI/PFYV5Iffk7dMWUjp6A7WFAMVjdSHRve/MYSDMM4dnCcBC6LvnsBHmhZzbzGElJNpd9i6kpU/x2FCYZw6PAyumQpfzY8ZCSlvrEoC1MD+OxiUAe6F18dhDmPcchufHfIQ02JUAnISGCzk3oVnx2FFItLVYyLkKTU4BfHEV5plDvXj8zlmofwrAX6hdAgAQ5plDs3gMIVQtAYAIFc+PwQgpKc0cOEKt4jGSMC/kFE4eYwnzQk68BIAmlD95DCcUP3kMKBT+hAxSSGn1qXNhnjnESgCoQrkSAK5Q6l0OspCWx96FIiUAcKHAJ2TwQkoPnzsXtpYAIgjzQq5h5oghzDNHdQkgirC+eBxGmB/HupkjkLDy/rFQQkpb/szx3XvQzPBPAbz1HjI73JkjnpA7c0QU0rDqXcjacwQVMq7KCyss/lONKyz9U40sLLtGLraQlvMnVoMLiWafxvBCmjshF19IMxvHDoQ0/a6qB+GieyFNvv/vQrjuXkhTbxv7EE791vQhnCpt/BXGSP9/pRPAPoSH7oWTpfAehLspYA/CxfTpovjCxUwlI7xwM+2LLzzOAYMLFwUvFEMLi2rCgYWF34WHFQ6lp6WjCsubpsQUct4DRxTy3uWfeQ+XH+Z5jHBC9mc1wYQVB9xDCdOq4mvTSMJN1TdRcYTryo+Fogjrm78GETZ87h1C2NRmMoCw8c5eeGHxHiKqsL1lL7ZQ4sJlZKHMpdm4QqneZ7BCsZ7ZoELBS2sghXvJe8AAhcLNB/GEu7bPDeGF8pe4YQlFH0BAoc4dPEDCg84NfDDC2iJFFKHiTZgYQs3bTBGEG9Ubaf2F2o2FvIXNRQpwYRLbI4EKq77NDiQ06s/iJkxWV7M7CWs+rA8ltOyv6yFcmjZIshda97k2F5q3mzEWOrQMurX0aRQpZmN4Jop110NEodplzyBC4WtX4YQuD6ChMD3K3bcKKdQtUvgL/R5AG6Fq1wMAoeEeyUfYfPWoSPSEKO3HtYTCL3IboiQ06eRUFhWhQx/H8SgI995dnF9GXOjUT3U80sIdQDf1l5EVGrXDY0VSuPdfop2InHCo+dzDINdSwKbT5poRukfYfY80HhHh3rjFLysSwgfrNs2stAvXvkWK2bQKUfZI42kTWvfYrkmTEGiPNJ6GXrJrgc89DFLdD3iBtUcaT6UwHb0HXpw64QFujzSeGiFUkWI2fCHmHmk8z0xfegQoY7NywQM6v0eqCUvocJKiPR/LfSKd7OxzWQzE3iONp1Qo2vzUNO+LfEaHXXVS4IMrY/MyD8QrY/Oyn/EtQi3RTuUw/QCqfw6hn7sJX1pFW6Kdys04ELaMzcxm7AEEfI9Ul9O1qB4ewP9y6j/x6HnWTjyXy1e8YYv5nqw+Ny/mxGXUJfZUvu7+/305i1DlrcjTcfsjt13MD/8CYaGG9H6p4P0AAAAASUVORK5CYII="
          }
          alt="play icon"
          width="30"
        />
      </button>
    </div>
  );
};

export default TimeDisplay;
