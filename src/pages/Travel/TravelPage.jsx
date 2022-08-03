import { useEffect, useState } from 'react';
import toastr from 'toastr';
import { getAllCities } from '../../api/travel-api';
import Button from '../../components/buttons/Button/Button';
import ContentArea from '../../components/ContentArea/ContentArea';
import Table from '../../components/tables/Table/Table';
import { formatMoney, formatNumber } from '../../utils/helpers/formatters';

export default function TravelPage() {
  const [cities, setCities] = useState(null);

  useEffect(() => {
    if (cities === null) {
      getAllCities()
        .then((response) => {
          setCities(response.data.cities);
        })
        .catch((error) => {
          if (error.response) {
            toastr.error(error.response.data.message);
          }
        });
    }
  }, []);

  if (cities === null) {
    return 'Loading ...';
  }

  let citiesTable = [
    ['Name', 'Cost', 'Level', 'Population', 'Action'],
    ...cities.map((city) => [
      city.name,
      formatMoney(city.cost),
      city.level,
      formatNumber(0),
      <Button text={'Travel'}></Button>,
    ]),
  ];

  return (
    <>
      <ContentArea title={'Travel'}>
        <Table data={citiesTable} />
      </ContentArea>
    </>
  );
}
