import { useRef, useState } from "react";

function HomePage() {
	const [feedbackItems, setFeedbackItems] = useState([]);

	const emailInputRef = useRef();
	const feedbackInputRef = useRef();

	function submitForm(event) {
		event.preventDefault();

		const enteredEmail = emailInputRef.current.value;
		const enteredFeedback = feedbackInputRef.current.value;

		const reqBody = JSON.stringify({
			email: enteredEmail,
			feedbackText: enteredFeedback,
		});

		fetch("http://localhost:5299/api/feedback", {
			method: "POST",
			body: reqBody,
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => console.log(data));
	}

	function loadFeedbackHandler() {
		fetch("http://localhost:5299/api/feedback")
			.then((res) => res.json())
			.then((data) => setFeedbackItems(data.feedback));
	}

	return (
		<div>
			<h1>The Home Page</h1>
			<form onSubmit={submitForm}>
				<div>
					<label htmlFor="email">Your Email Address</label>
					<input type="email" id="email" ref={emailInputRef} />
				</div>
				<div>
					<label htmlFor="feedback">Your Feedback </label>
					<textarea id="feedback" rows={5} ref={feedbackInputRef}></textarea>
				</div>
				<button>Send feedback</button>
			</form>
			<button onClick={loadFeedbackHandler}>Load Feedbacks</button>
			<ul>
				{feedbackItems.map((item) => (
					<li key={item.id}>{item.feedbackText}</li>
				))}
			</ul>
		</div>
	);
}

export default HomePage;
