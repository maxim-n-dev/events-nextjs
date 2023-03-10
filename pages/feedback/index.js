import { Fragment, useState } from "react";

function FeedbackPage(props) {
	const [feedbackDetails, setFeedbackDetails] = useState({});

	function showDetailsHandler(id) {
		fetch(`http://localhost:5299/api/feedback/${id}`)
			.then((resp) => resp.json())
			.then((data) => setFeedbackDetails(data));
	}

	return (
		<Fragment>
    
      {feedbackDetails && <p>{feedbackDetails.email}</p>}
			<ul>
				{props.feedbackItems.map((fi) => (
					<li key={fi.id}>
						{fi.feedbackText}
						<button onClick={showDetailsHandler.bind(null, fi.id)}>Show Details</button>
					</li>
				))}
			</ul>
		</Fragment>
	);
}

export async function getStaticProps() {
	const feedbackItems = await fetch("http://localhost:5299/api/feedback")
		.then((res) => res.json())
		.then((data) => data.feedback);

	if (!feedbackItems) {
		return {
			notFound: true,
		};
	}
	return {
		props: {
			feedbackItems,
		},
	};
}

export default FeedbackPage;
