import FlexWrap from './../../components/layouts/FlexWrap/FlexWrap';
import FlexRow from './../../components/layouts/FlexRow/FlexRow';
import FlexElement from './../../components/layouts/FlexElement/FlexElement';
import ContentArea from './../../components/ContentArea/ContentArea';
import './LoginPage.scss';
import Table from '../../components/tables/Table/Table';
import LoginForm from '../../components/LoginForm/LoginForm';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

let usersStats = [
  ['Total Users', 'Last Hour', 'Last 24 Hours'],
  [559, 13, 30],
];

let lastestNews = [
  [<Link to='/forum/2/319'>Idiots returning raffle</Link>, '05/05/2022'],
  [<Link to='/forum/2/310'>Parks Minigame</Link>, '03/04/2022'],
  [<Link to='/forum/2/308'>CW Anniversary!</Link>, '01/04/2022'],
  [<Link to='/forum/2/305'>Criminal Pass</Link>, '17/03/2022'],
  [<Link to='/forum/2/297'>Auto Refills & Fast Crimes</Link>, '06/01/2022'],
  [<Link to='/forum/2/293'>Raffle Winners</Link>, '26/12/2021'],
];

let highestLeveledPlayers = [
  ['Username', 'Level'],
  ['[LO] Dogbert', 992],
  ['[LO] Candice', 916],
  ['[CK] Sneaky', 910],
  ['[FU] Bugaboo', 866],
  ['[FU] Zsadist', 855],
];

let strongestPlayers = [
  ['Username', 'Level'],
  ['[LO] Dogbert', 992],
  ['[AOD] Badbanane', 847],
  ['[LO] Candice', 916],
  ['[FU] Bugaboo', 866],
  ['[KI] Ghost', 824],
];

let lastActivePlayers = [
  ['Username', 'Last Active'],
  ['[KI] Evil', '39s'],
  ['[KI] Brady Tkachuk', '5m 3s'],
  ['[KI] Grumpy Willow', '5m 56s'],
  ['[FU] Capone', '7m 59s'],
  ['[KI] Booty Bandit', '8m 18s'],
];

export default function LoginPage() {
  useEffect(() => {
    document.title = 'Login | Criminal Warfare';
  });

  return (
    <>
      <FlexWrap>
        <FlexElement className={'login-content-area'}>
          <ContentArea title='About Criminal Warfare'>
            <p className={'the-story'}>
              Criminal Warfare is a free browser-based multiplayer game where
              you become a criminal working your way through the ranks to become
              the greatest and most powerful mobster in the crime world.
            </p>
          </ContentArea>
        </FlexElement>

        <FlexElement className={'login-content-area'}>
          <ContentArea title='User Stats'>
            <Table className='text-center' data={usersStats} />
          </ContentArea>
        </FlexElement>

        <FlexElement className={'login-content-area'}>
          <ContentArea title='Login'>
            <LoginForm />
          </ContentArea>
        </FlexElement>

        <FlexElement className={'login-content-area'}>
          <ContentArea title='Latest News'>
            <Table className='login-table' data={lastestNews} noHeader />
          </ContentArea>
        </FlexElement>
      </FlexWrap>

      <FlexRow>
        <FlexElement className={'login-stats-area'}>
          <ContentArea title='Highest Leveled Players' centerHeader>
            <Table className='login-table' data={highestLeveledPlayers} />
          </ContentArea>
        </FlexElement>

        <FlexElement className={'login-stats-area'}>
          <ContentArea title='Strongest Players' centerHeader>
            <Table className='login-table' data={strongestPlayers} />
          </ContentArea>
        </FlexElement>

        <FlexElement className={'login-stats-area'}>
          <ContentArea title='Active Players' centerHeader>
            <Table className='login-table' data={lastActivePlayers} />
          </ContentArea>
        </FlexElement>
      </FlexRow>
    </>
  );
}
