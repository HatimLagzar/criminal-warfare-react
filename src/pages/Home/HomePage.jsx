import React from 'react';
import { useSelector } from 'react-redux';
import ContentArea from './../../components/ContentArea/ContentArea';
import Table from './../../components/tables/Table/Table';
import { getPercentage } from '../../utils/helpers/math';
import { formatMoney, formatNumber } from '../../utils/helpers/formatters';

const formatAttributeProgress = (value, max) => {
  return value + ' / ' + max + ' [' + getPercentage(value, max) + ']';
};

const buildGeneralInformationArray = (generalInfo) => {
  return [
    [
      'Name',
      generalInfo.name,
      'Health',
      formatAttributeProgress(generalInfo.health, generalInfo.healthMax),
    ],
    [
      'Level',
      generalInfo.level,
      'Energy',
      formatAttributeProgress(generalInfo.energy, generalInfo.energyMax),
    ],
    [
      'Money',
      formatMoney(generalInfo.money),
      'Awake',
      formatAttributeProgress(generalInfo.awake, generalInfo.awakeMax),
    ],
    [
      'Bank',
      formatMoney(generalInfo.bank),
      'Nerve',
      formatAttributeProgress(generalInfo.nerve, generalInfo.nerveMax),
    ],
    [
      'Points',
      formatNumber(generalInfo.points),
      'EXP',
      formatAttributeProgress(generalInfo.exp, generalInfo.expMax),
    ],
    [
      'Credits',
      formatNumber(generalInfo.credits),
      'Job Rank',
      generalInfo.jobRank,
    ],
    [
      'Activity Points',
      formatNumber(generalInfo.activityPoints),
      'Slot Machine Profit',
      formatMoney(generalInfo.slotMachineProfit),
    ],
    [
      'Gradient Days',
      generalInfo.gradientDays + ' Days Left',
      'Premium Days',
      generalInfo.premiumDays + ' Days Left',
    ],
  ];
};

const buildAttributesArray = (attributes) => {
  return [
    ['Strength', attributes.strength, 'Defense', attributes.defense],
    ['Speed', attributes.speed, 'Total Stats', attributes.totalStats],
  ];
};

const buildEquippedAttributesArray = (attributes) => {
  return [
    ['Strength', attributes.strength, 'Defense', attributes.defense],
    ['Speed', attributes.speed, 'Total Stats', attributes.totalStats],
  ];
};

const buildBattleStatsArray = (battleStats) => {
  return [
    ['Kills', battleStats.kills, 'Deaths', battleStats.deaths],
    [
      'Total Battles',
      battleStats.totalBattles,
      'EXP Gained',
      battleStats.expGained,
    ],
  ];
};

const buildCriminalCareerArray = (criminalCareer) => {
  return [
    [
      'Successful Crimes',
      criminalCareer.successfulCrimes,
      'Failed Crimes',
      criminalCareer.failedCrimes,
    ],
    [
      'Total Crimes',
      criminalCareer.totalCrimes,
      'Crime Profit',
      formatMoney(criminalCareer.crimesProfit),
    ],
    [
      'Successful Mugs',
      criminalCareer.successfulMugs,
      'Failed Mugs',
      criminalCareer.failedMugs,
    ],
    [
      'Total Mugs',
      criminalCareer.totalMugs,
      'Mugging Profit',
      formatMoney(criminalCareer.mugsProfit),
    ],
    [
      'Successful Busts',
      criminalCareer.successfulBusts,
      'Failed Busts',
      criminalCareer.failedBusts,
    ],
    [
      'Completed Missions',
      criminalCareer.successfulMissions,
      'Failed Missions',
      criminalCareer.failedMissions,
    ],
  ];
};

export default function HomePage() {
  const generalInfo = useSelector((state) => state.auth.generalInfo);
  const attributes = useSelector((state) => state.home.attributes);
  const equippedAttributes = useSelector(
    (state) => state.home.equippedAttributes
  );
  const battleStats = useSelector((state) => state.home.battleStats);
  const criminalCareer = useSelector((state) => state.home.criminalCareer);

  return (
    <>
      {generalInfo !== null ? (
        <ContentArea title={'General Information'}>
          <Table noHeader data={buildGeneralInformationArray(generalInfo)} />
        </ContentArea>
      ) : (
        ''
      )}

      {attributes !== null ? (
        <ContentArea title={'Attributes'}>
          <Table noHeader data={buildAttributesArray(attributes)} />
        </ContentArea>
      ) : (
        ''
      )}

      {equippedAttributes !== null ? (
        <ContentArea title={'Equipped Attributes'}>
          <Table
            noHeader
            data={buildEquippedAttributesArray(equippedAttributes)}
          />
        </ContentArea>
      ) : (
        ''
      )}

      {battleStats !== null ? (
        <ContentArea title={'Battle Stats'}>
          <Table noHeader data={buildBattleStatsArray(battleStats)} />
        </ContentArea>
      ) : (
        ''
      )}

      {criminalCareer !== null ? (
        <ContentArea title={'Criminal Career'}>
          <Table noHeader data={buildCriminalCareerArray(criminalCareer)} />
        </ContentArea>
      ) : (
        ''
      )}
    </>
  );
}
