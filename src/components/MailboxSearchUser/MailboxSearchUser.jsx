import Input from "../forms/Input/Input";
import {useState} from "react";
import './MailboxSearchUser.scss'
import {searchForUserByUsername} from "../../api/user-api";
import toastr from "toastr";
import MailboxSearchUserItem from "../MailboxSearchUserItem/MailboxSearchUserItem";

export default () => {
  const [value, setValue] = useState('');
  const [results, setResults] = useState(null);

  function handleChange() {
    searchForUserByUsername(value)
      .then(response => {
        setResults(response.data.result);
      })
      .catch(error => {
        if (error.response) {
          toastr.error(error.response.data.message);
        }

        console.log(error);
      })
  }

  return <div className={'mailbox-search-user'}>
    <p className={'text-center'}>Search User</p>

    <Input
      value={value}
      handleInputChange={e => setValue(e.currentTarget.value)}
      onBlur={handleChange}
    />

    {
      results instanceof Array
        ? <div className="results">
          <ul>
            {
              results.length
                ? results.map(result => <MailboxSearchUserItem key={result.id + '-user'} user={result}/>)
                : 'No users found'
            }
          </ul>
        </div>
        : ''
    }

  </div>
}