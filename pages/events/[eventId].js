import { useRouter } from "next/router";
import { Fragment } from "react";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";

import { getEventById } from "../../dummy-data";
import ErrorAlert from "../../components/UI/error-alert";
import Button from "../../components/UI/button";

function EventDetailPage() {
	const router = useRouter();

	const eventId = router.query.eventId;

	const event = getEventById(eventId);

	if (!event) {
		return (
			<Fragment>
				<ErrorAlert> No event found! </ErrorAlert>;
				<div className="center">
					<Button link="/events">Show All Events</Button>
				</div>
			</Fragment>
		);
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
