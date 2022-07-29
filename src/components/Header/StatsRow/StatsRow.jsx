import FlexWrap from '../../FlexWrap/FlexWrap';
import Avatar from './../Avatar/Avatar';
import GameClock from './../GameClock/GameClock';
import StatsContainer from './../StatsContainer/StatsContainer';
import './StatsRow.scss';
import UserInfo from './../UserInfo';
import Username from './../Username';

const StatsRow = () => {
  return (
    <FlexWrap className={'wrapper'}>
      <StatsContainer className={'user-info'}>
        <div className={'user-info-left'}>
          <Avatar />
        </div>
        <div className={'user-info-right'}>
          <Username />
          <UserInfo />
        </div>
      </StatsContainer>
      <GameClock />
      <StatsContainer className={'user-attributes'} />
    </FlexWrap>
  );
};
export default StatsRow;
