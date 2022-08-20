import FlexWrap from '../../FlexWrap/FlexWrap';
import Avatar from './../Avatar/Avatar';
import GameClock from './../GameClock/GameClock';
import StatsContainer from './../StatsContainer/StatsContainer';
import './StatsRow.scss';
import UserInfo from './../UserInfo';
import Username from './../Username';
import {useDispatch, useSelector} from 'react-redux';
import PlayerAttribute from '../../../PlayerAttribute/PlayerAttribute';
import {setGeneralInfo} from '../../../../store/features/auth/authSlice';

const StatsRow = () => {
  const dispatch = useDispatch();
  const generalInfo = useSelector((state) => state.auth.generalInfo);

  if (!generalInfo) {
    return '';
  }

  return (
    <FlexWrap className={'wrapper'}>
      <StatsContainer className={'user-info'}>
        <div className={'user-info-left'}>
          <Avatar generalInfo={generalInfo}/>
        </div>
        <div className={'user-info-right'}>
          <Username generalInfo={generalInfo}/>
          <UserInfo generalInfo={generalInfo}/>
        </div>
      </StatsContainer>
      <GameClock/>
      <StatsContainer className={'user-attributes'}>
        <PlayerAttribute
          label={'Health'}
          value={generalInfo.health}
          maxValue={generalInfo.healthMax}
          color='blue'
        />
        <PlayerAttribute
          label={'Energy'}
          value={generalInfo.energy}
          maxValue={generalInfo.energyMax}
          color='green'
          refillType={'energy'}
          isRefillable
          handleAfterRefill={(newValue) => {
            dispatch(
              setGeneralInfo({
                ...generalInfo,
                energy: newValue,
              })
            );
          }}
        />
        <PlayerAttribute
          label={'Awake'}
          value={generalInfo.awake}
          maxValue={generalInfo.awakeMax}
          color='yellow'
          refillType={'awake'}
          isRefillable
          handleAfterRefill={(newValue) => {
            dispatch(
              setGeneralInfo({
                ...generalInfo,
                awake: newValue,
              })
            );
          }}
        />
        <PlayerAttribute
          label={'Nerve'}
          value={generalInfo.nerve}
          maxValue={generalInfo.nerveMax}
          color='red'
          refillType={'nerve'}
          isRefillable
          handleAfterRefill={(newValue) => {
            dispatch(
              setGeneralInfo({
                ...generalInfo,
                nerve: newValue,
              })
            );
          }}
        />
        <PlayerAttribute
          label={'EXP'}
          value={generalInfo.exp}
          maxValue={generalInfo.expMax}
          color='gray'
        />
      </StatsContainer>
    </FlexWrap>
  );
};

export default StatsRow;
