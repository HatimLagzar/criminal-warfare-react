import toastr from 'toastr';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './JobsPage.scss';
import ContentArea from './../../components/ContentArea/ContentArea';
import { clockIn, getClockIns } from '../../api/jobs-api';
import FlexRow from './../../components/layouts/FlexRow/FlexRow';
import FlexElement from './../../components/layouts/FlexElement/FlexElement';
import ButtonForm from './../../components/forms/ButtonForm/ButtonForm';
import { setIsInJob } from '../../store/features/pages/jobSlice';

export default function JobsPage() {
  const [jobsData, setJobsData] = useState(null);
  const [isClockingIn, setIsClockingIn] = useState(false);
  const dispatch = useDispatch();
  const isInJob = useSelector((state) => state.jobs.isInJob);

  useEffect(() => {
    if (jobsData === null) {
      getClockIns()
        .then((response) => {
          setJobsData(response.data);
        })
        .catch((error) => {
          if (error.response) {
            toastr.error(error.response.data.message);
          }

          console.log(error);
        });
    }
  });

  if (jobsData === null) {
    return 'Loading...';
  }

  return (
    <div id='jobs-page'>
      <ContentArea title={'JOB INFORMATION'}>
        <ul className='info-list'>
          <li>
            The clock-ins listed in the table are the requirements to keep your
            current rank or to move up to the next rank.
          </li>
          <li>
            A week is defined by Sunday to Saturday, promotions/demotions are
            given out 12 AM Sunday morning.
          </li>
          <li>
            You can only move up or down 1 rank per week. It would take 10 weeks
            to get from Intern to CEO no matter how many times you clock-in
            during the week. Same as de-ranking from CEO to Intern.
          </li>
          <li>
            Clock-ins give a random number of points/money or activity points,
            that scale with the rank you are currently clocking into.
          </li>
          <li>You are allowed to clock-in once per hour.</li>
        </ul>
      </ContentArea>
      <FlexRow gap={5}>
        <FlexElement flex={4}>
          <ContentArea title={'YOUR JOB'}>
            <p>You are currently working as an {jobsData.jobName}</p>
            <p>You have clocked in {jobsData.clockInsToday} times today.</p>
            <p>
              You have clocked in {jobsData.clockInsThisWeek} times this week.
            </p>
            {!isInJob ? (
              <ButtonForm
                text={'Clock In'}
                showLoadingIcon={isClockingIn}
                isLoading={isClockingIn}
                onSubmitHandler={() => {
                  setIsClockingIn(true);
                  clockIn()
                    .then((response) => {
                      setIsClockingIn(false);
                      dispatch(setIsInJob(true));

                      toastr.success(response.data.message);
                    })
                    .catch((error) => {
                      setIsClockingIn(false);

                      if (error.response) {
                        toastr.error(error.response.data.message);
                      }

                      console.log(error);
                    });
                }}
              />
            ) : (
              ''
            )}
          </ContentArea>
          <ContentArea title={'RECENT CLOCKINS'}>
            <ul className='recent'>
              {jobsData.clockIns.length > 0 ? (
                jobsData.clockIns.map((log) => (
                  <li>
                    <span>{log.timestamp}</span>
                    <span className='text-right'>{log.reward}</span>
                  </li>
                ))
              ) : (
                <p>You have not clocked in recently.</p>
              )}
            </ul>
          </ContentArea>
        </FlexElement>
        <FlexElement flex={6}>
          <ContentArea title={'Jobs'}>
            <table className='jobs'>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Clockin Requirements</th>
                </tr>
              </thead>
              <tbody>
                {jobsData.jobs.length > 0
                  ? jobsData.jobs.map((job, index) => (
                      <tr
                        key={index + '-job'}
                        style={{
                          backgroundColor:
                            job.id === jobsData.jobId
                              ? 'rgba(220,0,0,.1)'
                              : 'none',
                        }}
                      >
                        <td>{job.name}</td>
                        <td>{job.clockin_requirement + ' Clockins a Week'}</td>
                      </tr>
                    ))
                  : ''}
              </tbody>
            </table>
          </ContentArea>
        </FlexElement>
      </FlexRow>
    </div>
  );
}
