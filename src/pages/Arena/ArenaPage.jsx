import { useEffect, useState } from 'react';
import toastr from 'toastr';
import { getArenaStats } from '../../api/arena-api';
import ContentArea from '../../components/ContentArea/ContentArea';
import { DateTime } from 'luxon';
import './ArenaPage.scss';

export default function ArenaPage() {
  const [arena, setArena] = useState(null);

  useEffect(() => {
    document.title = 'Arena | Criminal Warfare';

    if (arena === null) {
      getArenaStats()
        .then((response) => {
          setArena(response.data);
        })
        .catch((error) => {
          if (error.response) {
            toastr.error(error.response.data.message);
          }

          console.log(error);
        });
    }
  });

  if (arena === null) {
    return 'Loading...';
  }

  return (
    <div id='arena-page'>
      <ContentArea title='Arena'>
        <table>
          <tbody>
            <tr>
              <th colSpan={6} className='text-center'>
                {arena.timeLeft}
              </th>
            </tr>
            <tr>
              <th
                colSpan={6}
                className='text-center'
                style={{
                  backgroundColor: 'rgba(220,0,0,.1)',
                }}
              >
                Your Progress
              </th>
            </tr>
            <tr>
              {Object.values(arena.categoriesOfTheWeek).map((key) => {
                return (
                  <th className='text-center' key={key + '-progress-header'}>
                    {arena.categories[key].header}
                  </th>
                );
              })}
            </tr>
            <tr>
              {Object.values(arena.categoriesOfTheWeek).map((key) => {
                key = arena.categories[key].key;
                return (
                  <td className='text-center' key={key + '-progress'}>
                    <span
                      style={{
                        display: 'block',
                        fontSize: 15,
                        marginBottom: 3,
                      }}
                    >
                      {arena.yourProgress[key].value}
                    </span>
                    {arena.yourProgress[key].position} / {arena.totalUsers}
                  </td>
                );
              })}
            </tr>

            {Object.values(arena.categoriesOfTheWeek).map((key) => {
              const nameKey = arena.categories[key].key;

              return (
                <>
                  <tr>
                    <th
                      colSpan={6}
                      style={{
                        backgroundColor: 'rgba(220,0,0,.1)',
                      }}
                      className='text-center'
                      key={nameKey + '-leader-board-header'}
                    >
                      {arena.categories[key].header}
                    </th>
                  </tr>

                  {arena.categoriesStats[nameKey].map((item, index) => {
                    return (
                      <tr key={nameKey + '-leader-board-' + index}>
                        <td style={{ width: '10%' }}>{item.position}</td>
                        <td
                          dangerouslySetInnerHTML={{ __html: item.name }}
                        ></td>
                        <td style={{ color: '#a4a4a4' }}>{item.value}</td>
                        <td style={{ color: 'green' }}>{item.payout}</td>
                        <td></td>
                      </tr>
                    );
                  })}
                </>
              );
            })}
          </tbody>
        </table>
      </ContentArea>
    </div>
  );
}
