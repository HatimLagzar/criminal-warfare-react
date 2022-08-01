import FlexWrap from '../../FlexWrap/FlexWrap';
import Avatar from './../Avatar/Avatar';
import GameClock from './../GameClock/GameClock';
import StatsContainer from './../StatsContainer/StatsContainer';
import './StatsRow.scss';
import UserInfo from './../UserInfo';
import Username from './../Username';
import { useSelector } from 'react-redux';

const StatsRow = () => {
  const generalInfo = useSelector((state) => state.auth.generalInfo);

  if (!generalInfo) {
    return '';
  }

  return (
    <FlexWrap className={'wrapper'}>
      <StatsContainer className={'user-info'}>
        <div className={'user-info-left'}>
          <Avatar generalInfo={generalInfo} />
        </div>
        <div className={'user-info-right'}>
          <Username generalInfo={generalInfo} />
          <UserInfo generalInfo={generalInfo} />
        </div>
      </StatsContainer>
      <GameClock />
      <StatsContainer className={'user-attributes'} />
    </FlexWrap>
  );
};
export default StatsRow;
