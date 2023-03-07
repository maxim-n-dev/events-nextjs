import { Fragment } from 'react';
// import { useRouter } from 'next/router';

// import { getEventById } from '../../dummy-data';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';
import { getEventById, getFeaturedEvents } from '../../helpers/api-util';
import Head from 'next/head';

function EventDetailPage(props) {
  // const router = useRouter();

  // const eventId = router.query.eventId;
  // const event = getEventById(eventId);

  const { event } = props;

  // if (!event) {
  //   return (
  //     <ErrorAlert>
  //       <p>No event found!</p>
  //     </ErrorAlert>
  //   );
  // }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta 
          name='description' 
          content={event.description} 
        />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}
export default EventDetailPage;

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);

  if(!event) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      event,
      revalidate: 30
    }
  }
}

export async function getStaticPaths() {
  const allEvents = await getFeaturedEvents();

  const paths = allEvents.map(e => ({ params: { eventId: e.id } }));

  return {
    paths,
    fallback: 'blocking'
  }
}
