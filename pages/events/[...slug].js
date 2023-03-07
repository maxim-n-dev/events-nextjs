import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

// import { getFilteredEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import Head from "next/head";

function FilteredEventsPage(props) {
	const [loadedEvents, setLoadedEvents] = useState();
	const router = useRouter();

	const filterData = router.query.slug;

	const fetcher = (url) => fetch(url).then((res) => res.json());

	const { data, error } = useSWR(
		"https://nextjs-course-1b7c4-default-rtdb.europe-west1.firebasedatabase.app/events.json",
		fetcher
	);
	useEffect(() => {
		if (data) {
			const events = [];
			for (const key in data) {
				events.push({
					id: key,
					...data[key],
				});
			}
			setLoadedEvents(events);
		}
	}, [data]);

  let pageHeadData = <Head>
    <title>Filtered events</title>
		<meta name="description" content={`A list of filtered events.`} />
  </Head>;



	if (!loadedEvents) {
		return (
			<Fragment>
				{pageHeadData}
				<p className="center">Loading...</p>
			</Fragment>
		);
	}

  const filteredYear = filterData[0];
	const filteredMonth = filterData[1];

	const numYear = +filteredYear;
	const numMonth = +filteredMonth;

  pageHeadData = (
		<Head>
			<title>Filtered events</title>
			<meta name="description" content={`All events for ${numMonth}/${numYear}.`} />
		</Head>
	);

	if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 
      || numMonth < 1 || numMonth > 12 || error) 
  {
		return (
			<Fragment>
        {pageHeadData}
				<ErrorAlert>
					<p>Invalid filter. Please adjust your values!</p>
				</ErrorAlert>
				<div className="center">
					<Button link="/events">Show All Events</Button>
				</div>
			</Fragment>
		);
	}

	let filteredEvents = loadedEvents.filter((event) => {
		const eventDate = new Date(event.date);
		return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
	});

	if (!filteredEvents || filteredEvents.length === 0) {
		return (
			<Fragment>
        {pageHeadData}
				<ErrorAlert>
					<p>No events found for the chosen filter!</p>
				</ErrorAlert>
				<div className="center">
					<Button link="/events">Show All Events</Button>
				</div>
			</Fragment>
		);
	}

	const date = new Date(numYear, numMonth - 1);

	return (
		<Fragment>
      {pageHeadData}
			<ResultsTitle date={date} />
			<EventList items={filteredEvents} />
		</Fragment>
	);
}

export default FilteredEventsPage;

// export async function getServerSideProps(context) {
//   const { params } = context;

//   const filterData = params.slug;

//   const filteredYear = filterData[0];
//   const filteredMonth = filterData[1];

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: { hasError: true },
//       // notFound: true,
//       // redirect: {
//       //   destination: '/error'
//       // }
//     };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   // if (!filteredEvents || filteredEvents.length === 0) {
//   //   return {
//   //     props: { filteredEvents: []}
//   //   }
//   // }
//   return {
//     props: { filteredEvents, numYear, numMonth }
//   }
// }
