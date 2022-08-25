import toastr from "toastr";
import './PremiumOperationItem.scss'
import ButtonForm from "../forms/ButtonForm/ButtonForm";
import {buyPremiumOperation} from "../../api/operations-api";
import {useState} from "react";

export default function PremiumOperationItem({title, cost, opSet, loadOperations}) {
  const [isBuying, setIsBuying] = useState(false);

  return <div className={'premium-operation-item'}>
    <table className={'table'}>
      <tbody>
      <tr>
        <th colSpan={2} style={{textAlign: 'center'}}>{title}</th>
      </tr>
      <tr>
        <td>Cost: {cost}</td>
        <td>
          <ButtonForm text={'Buy'}
                      isLoading={isBuying}
                      showLoadingIcon={isBuying}
                      onSubmitHandler={() => {
                        setIsBuying(true);

                        buyPremiumOperation(opSet)
                          .then(response => {
                            toastr.success(response.data.message);
                            setIsBuying(false);
                            loadOperations()
                          })
                          .catch(error => {
                            setIsBuying(false);

                            if (error.response) {
                              toastr.error(error.response.data.message);
                            }

                            console.log(error)
                          })
                      }}/>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
}