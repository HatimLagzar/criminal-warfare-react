import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {getGangActions} from "../../api/gangs-api";
import toastr from "toastr";
import './GangActions.scss'

export default () => {
  const [actions, setActions] = useState(null);

  useEffect(() => {
    if (actions === null) {
      getGangActions()
        .then(response => {
          setActions(response.data.links);
        })
        .catch(error => {
          if (error.response) {
            toastr.error(error.response.data.message);
          }
        })
    }
  }, [actions]);

  if (actions === null) {
    return 'Loading...';
  }

  return <div className={'gang-actions'}>
    {
      Object.entries(actions).length > 0
        ? Object.entries(actions).map((action, index) => {
          return <div className="gang-actions-item" key={index + '-action-link'}>
            <Link to={action[1]}>{action[0]}</Link>
          </div>
        })
        : ''
    }
  </div>
}