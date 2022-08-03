import './BankPage.scss';
import ContentArea from '../../components/ContentArea/ContentArea';
import Table from '../../components/tables/Table/Table';
import { useEffect, useState } from 'react';
import { getBankInfo } from '../../api/bank-api';
import toastr from 'toastr';
import { formatMoney } from '../../utils/helpers/formatters';
import FlexRow from '../../components/layouts/FlexRow/FlexRow';
import FlexElement from '../../components/layouts/FlexElement/FlexElement';
import WithdrawForm from './WithdrawForm';
import DepositForm from './DepositForm';

export default function BankPage() {
  const [bankInfo, setBankInfo] = useState(null);

  useEffect(() => {
    document.title = 'Bank | Criminal Warfare';

    if (bankInfo === null) {
      getBankInfo()
        .then((response) => {
          setBankInfo(response.data.bankInfo);
        })
        .catch((error) => {
          if (error.response) {
            toastr.error(error.response.data.message);
          }
        });
    }
  }, []);

  if (bankInfo === null) {
    return 'Loading...';
  }

  const bankAccountInfoTable = [
    ['Balance', formatMoney(bankInfo.bank)],
    ['Interest Rate', '1%'],
    ['Interest Prospects', formatMoney(bankInfo.bank / 100)],
  ];

  return (
    <FlexRow>
      <FlexElement>
        <ContentArea title={'Bank Account Info'}>
          <Table noHeader data={bankAccountInfoTable} />
        </ContentArea>
      </FlexElement>

      <FlexElement>
        <ContentArea title={'Manage Money'}>
          <FlexRow className={'justify-content-between p-15'}>
            <div>
              <WithdrawForm />
            </div>
            <div>
              <DepositForm />
            </div>
          </FlexRow>
        </ContentArea>
      </FlexElement>
    </FlexRow>
  );
}
