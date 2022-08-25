import toastr from "toastr";
import ButtonForm from "../forms/ButtonForm/ButtonForm";
import {startOperation} from "../../api/operations-api";
import {useState} from "react";

export default function OperationItem({operation}) {
  const [isStartingOperation, setIsStartOperation] = useState(false);

  return <div className={'operation-item'}>
    <table className={'table'}>
      <thead>
      <tr>
        <th dangerouslySetInnerHTML={{__html: operation['title']}}></th>
        <td>#{operation['tounlock']}</td>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td dangerouslySetInnerHTML={{__html: operation['objectives']}}></td>
        <td dangerouslySetInnerHTML={{__html: operation['pay']}}></td>
      </tr>
      <tr>
        <td colSpan={2}>
          <ButtonForm isLoading={isStartingOperation}
                      showLoadingIcon={isStartingOperation}
                      text={'Start'}
                      classes={'btn btn-link'}
                      onSubmitHandler={() => {
                        setIsStartOperation(true);
                        startOperation(operation['id'])
                          .then(response => {
                            setIsStartOperation(false);
                            toastr.success(response.data.message);
                          })
                          .catch(error => {
                            setIsStartOperation(false);

                            if (error.response) {
                              toastr.error(error.response.data.message);
                            }

                            console.log(error);
                          })
                      }}/>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
}