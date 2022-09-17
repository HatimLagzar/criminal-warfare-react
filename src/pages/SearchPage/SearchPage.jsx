import {useEffect, useState} from "react";
import ContentArea from "../../components/ContentArea/ContentArea";
import InputGroup from "../../components/forms/InputGroup/InputGroup";
import {getAllCities} from "../../api/travel-api";
import toastr from "toastr";
import SelectGroup from "../../components/forms/SelectGroup/SelectGroup";
import './SearchPage.scss'
import {getGangsList} from "../../api/gangs-api";
import Select from "../../components/forms/Select/Select";
import Input from "../../components/forms/Input/Input";
import Button from "../../components/buttons/Button/Button";
import {searchForPlayers} from "../../api/user-api";
import {formatMoney} from "../../utils/helpers/formatters";
import AttackButton from "../../components/AttackButton/AttackButton";
import MugButton from "../../components/MugButton/MugButton";
import RefillEnergyButton from "../../components/RefillEnergyButton/RefillEnergyButton";
import RefillNerveButton from "../../components/RefillNerveButton/RefillNerveButton";
import MessageArea from "../../components/MessageArea/MessageArea";

export default () => {
  const [cities, setCities] = useState(null);
  const [gangs, setGangs] = useState(null);
  const [players, setPlayer] = useState(null);
  const [id, setId] = useState(null);
  const [username, setUsername] = useState(null);
  const [levelMin, setLevelMin] = useState(null);
  const [levelMax, setLevelMax] = useState(null);
  const [money, setMoney] = useState(null);
  const [city, setCity] = useState(null);
  const [gang, setGang] = useState(null);
  const [attackable, setAttackable] = useState(null);
  const [online, setOnline] = useState(null);
  const [pickpocket, setPickpocket] = useState(null);
  const [saveSearch, setSaveSearch] = useState(null);
  const [searchName, setSearchName] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (cities === null) {
      getAllCities()
        .then(response => {
          setCities(response.data.cities);
        })
        .catch(error => {
          if (error.response) {
            toastr.error(error.response.data.message);
          }
        })
    }

    if (gangs === null) {
      getGangsList()
        .then(response => {
          setGangs(response.data.gangs);
        })
        .catch(error => {
          if (error.response) {
            toastr.error(error.response.data.message);
          }
        })
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    setIsSearching(true);

    let paramsUrl = '';// `id=${id}&username=${username}&levelMin=${levelMin}&levelMax=${levelMin}&money=${money}&city=${city}&gang=${gang}&pickpocket=${pickpocket}&attackable=${attackable}`;
    if (id) {
      paramsUrl += `id=${id}`
    }
    if (username) {
      paramsUrl += `username=${username}`
    }
    if (levelMin) {
      paramsUrl += `levelMin=${levelMin}`
    }
    if (levelMax) {
      paramsUrl += `levelMax=${levelMax}`
    }
    if (money) {
      paramsUrl += `money=${money}`
    }
    if (city) {
      paramsUrl += `city=${city}`
    }
    if (gang) {
      paramsUrl += `gang=${gang}`
    }
    if (attackable) {
      paramsUrl += `attackable=${attackable}`
    }
    if (online) {
      paramsUrl += `online=${online}`
    }
    if (pickpocket) {
      paramsUrl += `pickpocket=${pickpocket}`
    }

    searchForPlayers(paramsUrl)
      .then(response => {
        setIsSearching(false);
        setPlayer(response.data.result);
      })
      .catch(error => {
        setIsSearching(false);
        if (error.response) {
          toastr.error(error.response.data.message);
        }

        console.log(error);
      })
  }

  return <div id={'search-page'}>
    <ContentArea title={'Search Player'}>
      <form style={{width: '40%', padding: 20}} onSubmit={handleSubmit}>
        <InputGroup
          id={'id-input'}
          label={'ID:'}
          handleInputChange={e => setId(e.currentTarget.value)}
          inline
        />
        <InputGroup
          id={'username-input'}
          label={'Username:'}
          handleInputChange={e => setUsername(e.currentTarget.value)}
          inline
        />
        <InputGroup
          id={'level-min-input'}
          label={'Level Min:'}
          handleInputChange={e => setLevelMin(e.currentTarget.value)}
          inline
        />
        <InputGroup
          id={'level-max-input'}
          label={'Level Max:'}
          handleInputChange={e => setLevelMin(e.currentTarget.value)}
          inline
        />
        <InputGroup
          id={'money-input'}
          label={'Money:'}
          handleInputChange={e => setMoney(e.currentTarget.value)}
          inline
        />
        <SelectGroup
          id={'city-input'}
          label={'City:'}
          handleInputChange={e => setCity(e.currentTarget.value)}
          data={cities || []}
          textKeyName={'name'}
          valueKeyName={'id'}
          inline
        />
        <SelectGroup
          id={'gang-input'}
          label={'Gang:'}
          handleInputChange={e => setGang(e.currentTarget.value)}
          data={gangs instanceof Array ? gangs.map(gang => {
            return {
              id: gang.id,
              name: `[${gang.tag}] ${gang.name}`
            };
          }) : []}
          textKeyName={'name'}
          valueKeyName={'id'}
          inline
        />
        <SelectGroup
          id={'attackable-input'}
          label={'Attackable:'}
          handleInputChange={e => setAttackable(e.currentTarget.value)}
          data={[{name: 'Yes', value: 'yes'}, {name: 'No', value: 'no'}]}
          textKeyName={'name'}
          valueKeyName={'value'}
          inline
        />
        <SelectGroup
          id={'online-input'}
          label={'Online:'}
          handleInputChange={e => setOnline(e.currentTarget.value)}
          data={[{name: 'Yes', value: 'yes'}, {name: 'No', value: 'no'}]}
          textKeyName={'name'}
          valueKeyName={'value'}
          inline
        />
        <SelectGroup
          id={'pickpocket-input'}
          label={'Pickpocket:'}
          handleInputChange={e => setPickpocket(e.currentTarget.value)}
          data={[{name: 'Yes', value: 'yes'}, {name: 'No', value: 'no'}]}
          textKeyName={'name'}
          valueKeyName={'value'}
          inline
        />
        <div className={'select-group inline-select-group'}>
          <label className='label-form' htmlFor={'save-search-input'}>Save Search:</label>
          <Select
            id={'save-search-input'}
            handleInputChange={e => setSaveSearch(e.currentTarget.value)}
            data={[{name: 'Yes', value: 'yes'}, {name: 'No', value: 'no'}]}
            textKeyName={'name'}
            valueKeyName={'value'}
          />
          <Input
            id={'search-name-input'}
            placeholder={'Search Name'}
            styles={{marginLeft: 5}}
            handleInputChange={e => setSearchName(e.currentTarget.value)}
          />
        </div>

        <footer>
          <Button isLoading={isSearching} showLoadingIcon={isSearching} text={'Search'}/>
          <Button isLoading={isSearching} text={'Reset'} classes={'btn btn-gray'} type={'reset'}/>
        </footer>
      </form>
    </ContentArea>
    {
      players instanceof Array
        ? <ContentArea title={'Search Results'}>
          {
            message
              ? <MessageArea message={message}/>
              : ''
          }

          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 10}}>
            <div></div>
            <div>
              <RefillNerveButton setMessage={setMessage}/>
              <RefillEnergyButton setMessage={setMessage}/>
            </div>
          </div>
          <table>
            <thead>
            <tr>
              <th>Username</th>
              <th>City</th>
              <th>Level</th>
              <th>Money</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {
              players.length > 0
                ? players.map(player => {
                  return <tr key={player.id}>
                    <td dangerouslySetInnerHTML={{__html: player.username}}></td>
                    <td>{player.city}</td>
                    <td>{player.level}</td>
                    <td>{formatMoney(player.money)}</td>
                    <td dangerouslySetInnerHTML={{__html: player.status}}></td>
                    <td>
                      <AttackButton player={player}/>
                      <MugButton player={player}/>
                    </td>
                  </tr>
                })
                : <tr>
                  <td>No results were found!</td>
                </tr>
            }
            </tbody>
          </table>
        </ContentArea>
        : ''
    }
  </div>
}