import React from "react";
import { useState, useEffect } from "react";
import beep from "./sound/beep.mp3";
import { Howl, Howler } from "howler";

const Pomodoro = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [displayMessage, setDisplayMessage] = useState(false);
  const [start, setStart] = useState(false);
  const [breakTime, setBreakTime] = useState(5);
  const [disabled, setDisabled] = useState(false);

  const reset = (e) => {
 

    setStart(false);

    setTimeout(() => {
      setMinutes(25);
      setSeconds(0);
      setBreakTime(5);
      setDisabled(true);
      setTimeout(() => {
        setDisabled(false);
      }, 500);
    }, 1000);
  };

  useEffect(() => {
    let interval = setInterval(() => {
      clearInterval(interval);
      if (start) {
        setDisabled(true);

        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59);
            setMinutes(minutes - 1);
          } else {
            setStart(false);
            if (start) {
              let min = displayMessage ? 24 : breakTime;
              let sec = 0;

              setSeconds(sec);
              setMinutes(min);
              setDisplayMessage(!displayMessage);
              if (displayMessage) {
                setDisabled(false);
              }
            }
          }
        } else {
          setSeconds(seconds - 1);
        }
      }
    }, 1000);
  }, [seconds, start]);

  const timer = minutes < 10 ? `0${minutes}` : minutes;
  const timerSec = seconds < 10 ? `0${seconds}` : seconds;

  const handleInc = (e) => {
    if (minutes < 60) {
      setMinutes(minutes + 1);
    } else {
      setMinutes(0);
    }
  };
  const handleDec = (e) => {
    if (minutes > 0) {
      setMinutes(minutes - 1);
    } else {
      setMinutes(0);
    }
  };

  const breakInc = (e) => {
    if (breakTime < 60) {
      setBreakTime(breakTime + 1);
    } else {
      setBreakTime(0);
    }
  };

  const breakDec = (e) => {
    if (breakTime > 0) {
      setBreakTime(breakTime - 1);
    } else {
      setBreakTime(0);
    }
  };

  return (
    <div className="pomodoro">
      {!displayMessage && (
        <div>
          {" "}
          <p>Break:{breakTime}</p>
          <button disabled={disabled} className="button-27" onClick={breakInc}>
            +
          </button>
          <button disabled={disabled} className="button-27" onClick={breakDec}>
            -
          </button>
        </div>
      )}
      <div className="msg">
        <div className="timer">
          {timer}:{timerSec}
          {displayMessage && (
            <div>
              Break time !<p>Press Start</p>
              <button
                className="button-27"
                onClick={() => {
                  setStart(true);
                }}
              >
                Start
              </button>
            </div>
          )}
          {!displayMessage && (
            <button
              disabled={disabled}
              className="button-27"
              onClick={handleInc}
            >
              +
            </button>
          )}
          {!displayMessage && (
            <button
              disabled={disabled}
              className="button-27"
              onClick={handleDec}
            >
              -
            </button>
          )}
          {!displayMessage && (
            <button
              className="button-27"
              disabled={disabled}
              onClick={() => {
                setStart(true);
              }}
            >
              Start
            </button>
          )}
          {!displayMessage && (
            <button className="button-27" onClick={reset}>
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;
