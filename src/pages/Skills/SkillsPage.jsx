import {useEffect, useState} from 'react';
import toastr from 'toastr';
import {getSkills} from '../../api/skills-api';
import ContentArea from '../../components/ContentArea/ContentArea';
import './SkillsPage.scss';

export default function SkillsPage() {
  const [skillsData, setSkillsData] = useState(null);

  useEffect(() => {
    if (skillsData === null) {
      getSkills()
        .then((response) => {
          setSkillsData(response.data);
        })
        .catch((error) => {
          if (error.response) {
            toastr.error(error.response.data.message);
          }

          console.log(error);
        });
    }
  }, [skillsData]);

  if (skillsData === null) {
    return 'Loading...';
  }

  return (
    <div id='skills-page'>
      <ContentArea title={'Skills'}>
        <table>
          <thead>
            <tr>
              <th
                colSpan={6}
                className={'text-center'}
                style={{
                  backgroundColor: 'rgba(220,0,0,.1)',
                }}
              >
                Bust Fail Bonus
              </th>
            </tr>
          </thead>
        </table>
      </ContentArea>
    </div>
  );
}
