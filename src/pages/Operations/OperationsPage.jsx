import toastr from "toastr";
import './OperationsPage.scss';
import ContentArea from "../../components/ContentArea/ContentArea";
import ButtonForm from "../../components/forms/ButtonForm/ButtonForm";
import {getAllOperations, toggleOperationsAutoStarter} from "../../api/operations-api";
import {useEffect, useState} from "react";
import OperationItem from "../../components/OperationItem/OperationItem";

export default function OperationsPage() {
  const [operationsData, setOperationsData] = useState(null);
  const [operationsPremium, setOperationsPremium] = useState(null);
  const [isAutoStarterEnabled, setIsAutoStarterEnabled] = useState(false);
  const [isLoadingAutoStart, setIsLoadingAutoStart] = useState(false);

  useEffect(() => {
    getAllOperations()
      .then(response => {
        setOperationsData(response.data.operations);
        setIsAutoStarterEnabled(response.data.isOperationAutoStartEnabled);
        setOperationsPremium(response.data.premiumOperations);
      })
      .catch(error => {
        if (error.response) {
          toastr.error(error.response.data.message)
        }

        console.log(error)
      })
  });

  if (operationsData === null) {
    return 'Loading...'
  }

  return <div id={'operations-page'}>
    <ContentArea title={'Operations'}>
      <div id="auto-starter">
        <ButtonForm
          text={isAutoStarterEnabled ? 'Disable Auto Operation Starter' : 'Enable Operation Auto Starter'}
          isLoading={isLoadingAutoStart}
          showLoadingIcon={isLoadingAutoStart}
          onSubmitHandler={() => {
            setIsLoadingAutoStart(true)
            toggleOperationsAutoStarter()
              .then(response => {
                setIsAutoStarterEnabled(!isAutoStarterEnabled)
                setIsLoadingAutoStart(false)
              })
              .catch(error => {
                if (error.response) {
                  toastr.error(error.response.data.message)
                }

                setIsLoadingAutoStart(false)

                console.log(error)
              })
          }}
        />
      </div>

      <div className="operations-list">
        {
          operationsData.map((operation, index) => <OperationItem key={index + '-operation'} operation={operation} />)
        }
      </div>
    </ContentArea>
  </div>
}