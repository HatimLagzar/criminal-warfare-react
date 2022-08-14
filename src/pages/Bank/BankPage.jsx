import './BankPage.scss';
import ContentArea from '../../components/ContentArea/ContentArea';
import Table from '../../components/tables/Table/Table';
import {useEffect, useState} from 'react';
import {getBankInfo} from '../../api/bank-api';
import toastr from 'toastr';
import {formatMoney} from '../../utils/helpers/formatters';
import FlexRow from '../../components/layouts/FlexRow/FlexRow';
import FlexElement from '../../components/layouts/FlexElement/FlexElement';
import WithdrawForm from './WithdrawForm';
import DepositForm from './DepositForm';
import ListQuickWithdrawals from './ListQuickWithdrawals';

export default function BankPage() {
  const [bankData, setBankData] = useState(null);

  useEffect(() => {
    document.title = 'Bank | Criminal Warfare';

    if (bankData === null) {
      getBankInfo()
        .then((response) => {
          setBankData(response.data);
        })
        .catch((error) => {
          if (error.response) {
            toastr.error(error.response.data.message);
          }
        });
    }
  });

  if (bankData === null) {
    return 'Loading...';
  }

  const bankInfo = bankData.bankInfo;

  const bankAccountInfoTable = [
    ['Balance', formatMoney(bankInfo.bank)],
    ['Interest Rate', '1%'],
    ['Interest Prospects', formatMoney(bankInfo.bank / 100)],
  ];

  const bankStatementTable = [
    ['Date/Time	', 'Withdrawal', 'Deposit', 'Notes'],
    ...bankData.bankLogs.map((row) => [
      row.timestamp,
      row.withdrawal,
      row.deposit,
      row.note,
    ]),
  ];

  console.log(bankStatementTable);

  return (
    <>
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
      <ContentArea title='Quick Withdrawal'>
        <ListQuickWithdrawals options={bankData.quickWithdrawalOptions} />
      </ContentArea>
      <ContentArea title='Bank Statement'>
        <Table data={bankStatementTable} />
      </ContentArea>
    </>
  );
}
