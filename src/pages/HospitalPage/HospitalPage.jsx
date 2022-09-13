import toastr from "toastr";
import ContentArea from "../../components/ContentArea/ContentArea";
import {useEffect, useState} from "react";
import {getCriminalsInHospital} from "../../api/hospital-api";
import './HospitalPage.scss'

export default () => {
  const [criminals, setCriminals] = useState(null);

  useEffect(() => {
    getCriminalsInHospital()
      .then(response => {
        setCriminals(response.data.patients);
      })
      .catch(error => {
        if (error.response) {
          toastr.error(error.response.data.message);
        }

        console.log(error);
      })
  }, []);

  if (criminals === null) {
    return 'Loading...';
  }

  return <div id={'hospital-page'}>
    <ContentArea title={'Hospital'}>
      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Time Remaining</th>
          <th>Reason</th>
          <th>Status</th>
        </tr>
        </thead>
        <tbody>
        {
          criminals instanceof Array
            ? criminals.map((criminal, index) => {
              return <tr>
                <td dangerouslySetInnerHTML={{__html: criminal.user.username}}></td>
                <td>{criminal.time} minutes left</td>
                <td>{criminal.reason}</td>
                <td dangerouslySetInnerHTML={{__html: criminal.status}}></td>
              </tr>
            })
            : ''
        }
        </tbody>
      </table>
    </ContentArea>
  </div>
}