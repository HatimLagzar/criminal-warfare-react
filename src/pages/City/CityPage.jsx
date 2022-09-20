import './CityPage.scss'
import FlexRow from "../../components/layouts/FlexRow/FlexRow";
import ContentArea from "../../components/ContentArea/ContentArea";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {getOthsAndOtds, getThroneData} from "../../api/user-api";
import toastr from "toastr";
import CityOthOtdItem from "../../components/CityOthOtdItem/CityOthOtdItem";
import noAvatar from '../../assets/img/avatars/no-avatar.png'

export default () => {
  const [throne, setThrone] = useState(null);
  const [ofthes, setOfthes] = useState(null);

  useEffect(() => {
    if (ofthes === null) {
      getOthsAndOtds()
        .then(response => {
          setOfthes(response.data.ofthes);
        })
        .catch(error => {
          if (error.response) {
            toastr.error(error.response.data.message);
          }

          console.log(error);
        })
    }

    if (throne === null) {
      getThroneData()
        .then(response => {
          setThrone(response.data);
        })
        .catch(error => {
          if (error.response) {
            toastr.error(error.response.data.message);
          }

          console.log(error);
        })
    }
  }, []);

  return <div id={'city-page'}>
    <FlexRow gap={8}>
      <CityOthOtdItem title={'Leveler OTH'} ofthes={ofthes} keyName={'leveler_oth'} name={'EXP'}/>
      <CityOthOtdItem title={'Mugger OTH'} ofthes={ofthes} keyName={'mugger_oth'} name={'Mugs'}/>
      <CityOthOtdItem title={'Buster OTH'} ofthes={ofthes} keyName={'buster_oth'} name={'Busts'}/>
      <CityOthOtdItem title={'Hitman OTH'} ofthes={ofthes} keyName={'hitman_oth'} name={'Kills'}/>

      <div className={'city-content-item'}>
        <ContentArea centerHeader title={'Stores'}>
          <ul>
            <li>
              <Link to={'/store/weapon'}>Weapon Store</Link>
            </li>
            <li>
              <Link to={'/store/armour'}>Armour Store</Link>
            </li>
            <li>
              <Link to={'/store/shoes'}>Shoes Store</Link>
            </li>
            <li>
              <Link to={'/store/pharmacy'}>Pharmacy Store</Link>
            </li>
          </ul>
        </ContentArea>
      </div>

      <div className={'city-content-item'}>
        <ContentArea centerHeader title={'Business'}>
          <ul>
            <li>
              <Link to={'/estate-agent'}>Estate Agent</Link>
            </li>
            <li>
              <Link to={'/bank'}>Bank</Link>
            </li>
            <li>
              <Link to={'/jobs'}>Job Center</Link>
            </li>
            <li>
              <Link to={'/itempedia'}>Itempedia</Link>
            </li>
          </ul>
        </ContentArea>
      </div>

      <div className={'city-content-item'}>
        <ContentArea centerHeader title={'Headquarters'}>
          <ul>
            <li>
              <Link to={'/users-list'}>Users List</Link>
            </li>
            <li>
              <Link to={'/users-online'}>Users Online</Link>
            </li>
            <li>
              <Link to={'/world-leaders'}>World Leaders</Link>
            </li>
            <li>
              <Link to={'/hall-of-fame'}>Hall Of Fame</Link>
            </li>
          </ul>
        </ContentArea>
      </div>

      <div className={'city-content-item'}>
        <ContentArea centerHeader title={'Casino'}>
          <ul>
            <li>
              <Link to={'/slot-machine'}>Slots Machine</Link>
            </li>
            <li>
              <Link to={'/lucky-dip'}>Lucky Dip</Link>
            </li>
            <li>
              <Link to={'/lottery'}>Lottery</Link>
            </li>
            <li>
              <Link to={'/50-50'}>50/50</Link>
            </li>
            <li>
              <Link to={'/high-low'}>High/Low</Link>
            </li>
            <li>
              <Link to={'/russian-roulette'}>Russian Roulette</Link>
            </li>
          </ul>
        </ContentArea>
      </div>

      <div className={'city-content-item'}>
        <ContentArea centerHeader title={'Marketplace'}>
          <ul>
            <li>
              <Link to={'/point-dealer'}>Point Dealer</Link>
            </li>
            <li>
              <Link to={'/market/items'}>Item Market</Link>
            </li>
            <li>
              <Link to={'/market/points'}>Point Market</Link>
            </li>
            <li>
              <Link to={'/market/credits'}>Credits Market</Link>
            </li>
            <li>
              <Link to={'/death-contracts'}>Death Contracts</Link>
            </li>
          </ul>
        </ContentArea>
      </div>

      <div className={'city-content-item'}>
        <ContentArea centerHeader title={'Mysterious'}>
          <ul>
            <li>
              <Link to={'/search-downtown'}>Search Downtown</Link>
            </li>
            <li>
              <Link to={'/activity'}>Activity</Link>
            </li>
            <li>
              <Link to={'/busting-bots'}>Busting Bots</Link>
            </li>
            <li>
              <Link to={'/missions'}>Missions</Link>
            </li>
            <li>
              <Link to={'/relationships'}>Relationships</Link>
            </li>
          </ul>
        </ContentArea>
      </div>

      <div className={'city-content-item'}>
        <ContentArea centerHeader title={'Pets'}>
          <ul>
            <li>
              <Link to={'/your-pets'}>Your Pets</Link>
            </li>
            <li>
              <Link to={'/pet-gym'}>Pet Gym</Link>
            </li>
            <li>
              <Link to={'/pet-crimes'}>Pet Crimes</Link>
            </li>
            <li>
              <Link to={'/pet-prison'}>Pet Prison</Link>
            </li>
            <li>
              <Link to={'/pet-market'}>Pet Market</Link>
            </li>
          </ul>
        </ContentArea>
      </div>

      <div className={'city-content-item'}>
        <ContentArea centerHeader title={'Gangs'}>
          <ul>
            <li>
              <Link to={'/gangs-list'}>Gangs List</Link>
            </li>
            <li>
              <Link to={'/gang-territories'}>Gang Territories</Link>
            </li>
            <li>
              <Link to={'/gang-wars'}>Gang Wars</Link>
            </li>
          </ul>
        </ContentArea>
      </div>

      <CityOthOtdItem title={'Leveler OTD'} ofthes={ofthes} keyName={'leveler_otd'} name={'EXP'}/>
      <CityOthOtdItem title={'Mugger OTD'} ofthes={ofthes} keyName={'mugger_otd'} name={'Mugs'}/>
      <CityOthOtdItem title={'Buster OTD'} ofthes={ofthes} keyName={'buster_otd'} name={'Busts'}/>
      <CityOthOtdItem title={'Hitman OTD'} ofthes={ofthes} keyName={'hitman_otd'} name={'Kills'}/>
    </FlexRow>
    {
      throne
        ? <ContentArea title={'Throne: ' + throne.title}>
          <img src={throne.king.user ? throne.king.user.avatar || noAvatar : noAvatar}
               alt={'avatar'}
               style={{margin: '0 auto', display: 'block'}}
          />
          <p className={'text-center'}
             dangerouslySetInnerHTML={{__html: throne.king.user ? throne.king.user.username : 'Expired Account'}}></p>
        </ContentArea>
        : <p>Loading...</p>
    }

  </div>
}