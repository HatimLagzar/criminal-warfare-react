import {useEffect, useState} from 'react';
import toastr from 'toastr';
import {getAllCities, travel} from '../../api/travel-api';
import Button from '../../components/buttons/Button/Button';
import ContentArea from '../../components/ContentArea/ContentArea';
import Table from '../../components/tables/Table/Table';
import {formatMoney, formatNumber} from '../../utils/helpers/formatters';
import ButtonForm from "../../components/forms/ButtonForm/ButtonForm";

export default function TravelPage() {
  const [cities, setCities] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  function handleTravel(cityId) {
    setIsLoading(true)

    return travel(cityId)
      .then(response => {
        toastr.success(response.data.message);
      })
      .catch(error => {
        if (error.response) {
          toastr.error(error.response.data.message)
        }
      })
  }

  let citiesTable = [
    ['Name', 'Cost', 'Level', 'Population', 'Action'],
    ...cities.map((city) => [
      city.name,
      formatMoney(city.cost),
      city.level,
      formatNumber(0),
      <ButtonForm isLoading={isLoading} text={'Travel'} onSubmitHandler={() => {
        handleTravel(city.id)
          .then(() => {
            setIsLoading(false)
          })
      }}></ButtonForm>,
    ]),
  ];

  return (
    <>
      <ContentArea title={'Travel'}>
        <Table data={citiesTable}/>
      </ContentArea>
    </>
  );
}
