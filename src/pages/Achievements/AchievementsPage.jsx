import { useEffect, useState } from 'react';
import toastr from 'toastr';
import { getAllAchievements } from '../../api/achievements-api';
import ContentArea from '../../components/ContentArea/ContentArea';
import { formatMoney, formatNumber } from '../../utils/helpers/formatters';
import { ucfirst } from '../../utils/helpers/strings';
import { CDN_URL } from './../../utils/constants/global';
import './AchievementsPage.scss';

export default function AchievementsPage() {
  const [achievementsData, setAchievementsData] = useState(null);

  useEffect(() => {
    document.title = 'Achievements | Criminal Warfare';

    if (achievementsData === null) {
      getAllAchievements()
        .then((response) => {
          setAchievementsData(response.data);
        })
        .catch((error) => {
          if (error.response) {
            toastr.error(error.response.data.message);
          }

          console.log(error);
        });
    }
  });

  if (achievementsData === null) {
    return 'Loading...';
  }

  const achLayout = [
    ['levels', achievementsData.stats.level, 'Get to Level %AMOUNT%'],
    [
      'crimes',
      achievementsData.stats.crimes,
      'Complete %AMOUNT% Successful Crimes',
    ],
    ['kills', achievementsData.stats.kills, 'Kill %AMOUNT% Players'],
    ['missions', achievementsData.stats.missions, 'Complete %AMOUNT% Missions'],
    [
      'referrals',
      achievementsData.stats.referrals,
      'Refer %AMOUNT% people to the game',
    ],
    [
      'busts',
      achievementsData.stats.busts,
      'Bust %AMOUNT% players from prison',
    ],
    ['mugs', achievementsData.stats.mugs, 'Mug %AMOUNT% players'],
    [
      'operations',
      achievementsData.stats.operations,
      'Complete %AMOUNT% Operations',
    ],
    [
      'job_clockins',
      achievementsData.stats.job_clockins,
      'Clock in for your job %AMOUNT% times',
    ],
    ['total_stats', achievementsData.stats.total_stats, 'Train %AMOUNT% stats'],
    [
      'syd_attacks',
      achievementsData.stats.syd_attacks,
      'Attack the Sydney Throne %AMOUNT% times',
    ],
    [
      'syd_mins',
      achievementsData.stats.syd_mins,
      'Hold the Sydney Throne for %AMOUNT% minutes',
    ],
    [
      'syd_stats',
      achievementsData.stats.syd_stats,
      'Gain %AMOUNT% stats from the Sydney Throne<br />(Only includes the 10% bonus)',
    ],
    [
      'syd_final',
      achievementsData.stats.syd_final,
      'Slay the Sydney Throne %AMOUNT% times',
    ],
    [
      'mil_attacks',
      achievementsData.stats.mil_attacks,
      'Attack the Milan Throne %AMOUNT% times',
    ],
    [
      'mil_mins',
      achievementsData.stats.mil_mins,
      'Hold the Milan Throne Throne for %AMOUNT% minutes',
    ],
    [
      'mil_exp',
      achievementsData.stats.mil_exp,
      'Gain %AMOUNT% EXP from the Milan Throne<br />(Only includes the 10% bonus)',
    ],

    [
      'mil_final',
      achievementsData.stats.mil_final,
      'Slay the Milan Throne %AMOUNT% times',
    ],
    [
      'death_contracts',
      achievementsData.stats.death_contracts,
      'Complete %AMOUNT% Death Contracts',
    ],
  ];

  return (
    <div id='achievements-page'>
      <ContentArea title={'ACHIEVEMENTS'}>
        <table>
          <tbody>
            {achLayout.map((layoutArray) => {
              const achievement =
                achievementsData.achievements[layoutArray[0]][0];
              const header = layoutArray[0].replace('_', ' ');
              const paymentType = achievement.payment.split(':')[0];
              const paymentAmount = achievement.payment.split(':')[1];
              const progress = Math.floor(
                (layoutArray[1] / achievement['requirement']) * 100
              );

              return (
                <>
                  <tr>
                    <th
                      style={{
                        backgroundColor: 'rgba(220,0,0,.1)',
                      }}
                      colSpan={5}
                      className={'text-center'}
                    >
                      {ucfirst(header)}
                    </th>
                  </tr>
                  <tr>
                    <td>
                      <img
                        src={
                          CDN_URL +
                          'upload/achievements/' +
                          layoutArray[0] +
                          '/' +
                          achievement.image
                        }
                        width={65}
                        height={65}
                        alt='Achievement Image'
                      />
                    </td>
                    <td
                      dangerouslySetInnerHTML={{
                        __html: layoutArray[2].replace(
                          '%AMOUNT%',
                          formatNumber(achievement.requirement)
                        ),
                      }}
                    />
                    <td>{formatPayment(achievement.payment)}</td>
                    {layoutArray[1] >= achievement.requirement ? (
                      <td>Completed</td>
                    ) : (
                      <>
                        <td>
                          <div
                            class='progress'
                            title={
                              formatNumber(layoutArray[1]) +
                              ' / ' +
                              formatNumber(achievement.requirement) +
                              ' [' +
                              progress +
                              '%]'
                            }
                          >
                            <div
                              class='inner'
                              style={{
                                backgroundColor: '#b3992c',
                                width: progress + '%',
                                maxWidth: '100%',
                              }}
                            ></div>
                          </div>
                        </td>
                        <td>
                          <span>
                            {formatNumber(layoutArray[1]) +
                              ' / ' +
                              formatNumber(achievement['requirement']) +
                              ' [' +
                              progress +
                              '%]'}
                          </span>
                        </td>
                      </>
                    )}
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </ContentArea>
    </div>
  );
}

function formatPayment(payment) {
  let payout = payment.split(':');

  if (payout[0] == 'points') {
    return formatNumber(payout[1]) + ' points';
  } else if (payout[0] == 'money') {
    return formatMoney(payout[1]);
  } else if (payout[0] == 'activity') {
    return formatNumber(payout[1]) + ' Activity Points';
  } else if (payout[0] == 'item') {
    let item = payout[1];
    let qty = payout[2];

    return 'item: ' + item + ' x' + qty;
  } else if (payout[0] == 'xp') {
    return formatNumber(payout[1]) + ' EXP';
  } else if (payout[0] == 'credits') {
    return formatNumber(payout[1]) + ' Credits';
  }
}
