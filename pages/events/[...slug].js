import { useRouter } from "next/router";
import { Fragment } from "react";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/UI/button";
import { getFilteredEvents } from "../../dummy-data";
import ErrorAlert from "../../components/UI/error-alert";

function FilteredEventsPage() {
	const router = useRouter();
	const filterData = router.query.slug;

	if (!filterData) {
		return <p className="center">Loading...</p>;
	}

	const filteredYear = filterData[0];
	const filteredMonth = filterData[1];

	const date = { year: +filteredYear, month: +filteredMonth };

	if (
		isNaN(date.year) ||
		isNaN(date.month) ||
		date.year > 2030 ||
		date.year < 2021 ||
		date.month < 1 ||
		date.month > 12
	) {
		return (
			<Fragment>
				<ErrorAlert>Invalid filter. Please adjust your values!</ErrorAlert>
				<div className="center">
					<Button link="/events">Show All Events</Button>
				</div>
			</Fragment>
		);
	}

	const events = getFilteredEvents(date);

	if (events.length == 0) {
		return (
			<Fragment>
				<ErrorAlert>There are no events for the choosen filter</ErrorAlert>
				<div className="center">
					<Button link="/events">Show All Events</Button>
				</div>
			</Fragment>
		);
	}

	const dateForResults = new Date(date.year, date.month - 1);

	return (
		<div>
			<ResultsTitle date={dateForResults} />
			<EventList items={events} />
		</div>
	);
}

export default FilteredEventsPage;
