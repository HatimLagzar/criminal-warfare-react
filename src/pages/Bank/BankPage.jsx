import './BankPage.scss';
import ContentArea from '../../components/ContentArea/ContentArea';
import Table from '../../components/tables/Table/Table';
import { useEffect, useState } from 'react';
import { getBankInfo } from '../../api/bank-api';
import toastr from 'toastr';

export default function BankPage() {
  const [bankInfo, setBankInfo] = useState(null);

  useEffect(() => {
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

  const bankAccountInfoTable = [
    ['Balance', ''],
    ['Interest Rate', '1%'],
    ['Interest Prospects', '1%'],
  ];

  return (
    <>
      <ContentArea title={'BANK ACCOUNT INFO'}>
        <Table noHeader data={bankAccountInfoTable} />
      </ContentArea>
    </>
  );
}
