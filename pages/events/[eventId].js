import { useRouter } from "next/router";
import { Fragment } from "react";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";

import { getEventById } from "../../dummy-data";

function EventDetailPage() {
	const router = useRouter();

	const eventId = router.query.eventId;

	const event = getEventById(eventId);

	if (!event) {
		return <p> No event found! </p>;
	}

	return (
		<Fragment>
			<EventSummary />
			<EventLogistics
				id={event.id}
				imageAlt={event.title}
				address={event.location}
				date={event.date}
				image={event.image}
			/>
			<EventContent>
				<p>{event.description}</p>
			</EventContent>
		</Fragment>
	);
}

export default EventDetailPage;
