import toastr from "toastr";
import './EventsPage.scss'
import ContentArea from "../../components/ContentArea/ContentArea";
import {useEffect, useState} from "react";
import {getEvents} from "../../api/events-api";
import Table from "../../components/tables/Table/Table";
import {ucfirst} from "../../utils/helpers/strings";

export default () => {
  const [eventsData, setEventsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    getEvents(selectedCategory)
      .then(response => {
        setIsLoading(false);
        setEventsData(response.data);
      })
      .catch(error => {
        setIsLoading(false);
        if (error.response) {
          toastr.error(error.response.data.message);
        }

        console.log(error);
      })
  }, [selectedCategory])

  if (eventsData === null) {
    return 'Loading...';
  }

  return <div id={'events-page'}>
    <ContentArea title={'Events'}>
      <select
        className={'events-category'}
        defaultValue={selectedCategory}
        onChange={e => {
          setIsLoading(true);
          setSelectedCategory(e.currentTarget.value)
        }}
        disabled={isLoading}
      >
        <option value=''>All</option>
        {
          eventsData.categories && eventsData.categories.length > 0
            ? eventsData.categories.map((category, index) => {
              return <option key={index + '-category-event'}
                             value={category}>{ucfirst(category)}</option>
            })
            : ''
        }
      </select>
      {
        !isLoading
          ? <Table data={[['Event', 'Timestamp'], ...eventsData.events.map(event => [event.text, event.timestamp])]}/>
          : 'Loading...'
      }
    </ContentArea>
  </div>
}