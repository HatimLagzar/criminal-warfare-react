import FlexElement from '../../FlexElement/FlexElement';
import './GameClock.scss';

const GameClock = (props) => {
  return (
    <FlexElement>
      <div className={'game-clock'}>
        <i className='fas fa-clock'></i> 30 May 2022, 4:06:38 PM |
        <div className='countdown'>1:10</div>
      </div>
    </FlexElement>
  );
};
export default GameClock;
