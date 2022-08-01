import { useEffect, useState } from 'react';
import FlexElement from '../../FlexElement/FlexElement';
import './GameClock.scss';

const GameClock = (props) => {
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);

  let myInterval;

  useEffect(() => {
    myInterval = setInterval(() => {
      if (seconds === 0 && minutes === 0) {
        setMinutes(5);
        setSeconds(0);

        return;
      }

      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <FlexElement>
      <div className={'game-clock'}>
        <i className='fas fa-clock'></i> {new Date().toLocaleString()} |{' '}
        <div className='countdown'>
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
      </div>
    </FlexElement>
  );
};
export default GameClock;
