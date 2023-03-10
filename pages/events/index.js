import { Fragment } from "react";
import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { getAllEvents } from "../../dummy-data";


function AllEventsPage() {
	const router = useRouter();

	const events = getAllEvents();

	const findEventsHandler = (year, month) => {
		router.push(`/events/${year}/${month}`)
	}

	return (
		<Fragment>
			<EventsSearch onSearch={findEventsHandler} />
			<EventList items={events} />
		</Fragment>
	);
}

export default AllEventsPage;
