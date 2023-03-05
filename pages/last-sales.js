import { useEffect, useState } from "react";
import useSWR from "swr";

function LastSalesPage(props) {
	const [sales, setSales] = useState(props.sales);
	// const [isLoading, setIsLoading] = useState(false);

	const { data, error } = useSWR(
		"https://nextjs-course-1b7c4-default-rtdb.europe-west1.firebasedatabase.app/sales.json",
		(url) => fetch(url).then((res) => res.json())
	);

	useEffect(() => {
		if (data) {
			const transformedData = [];
			for (var key in data) {
				transformedData.push({
					id: key,
					username: data[key].username,
					volume: data[key].volume,
				});
			}
			setSales(transformedData);
		}
	}, [data]);

	// useEffect(()=>{
	//   setIsLoading(true);
	//   fetch('https://nextjs-course-1b7c4-default-rtdb.europe-west1.firebasedatabase.app/sales.json')
	//   .then(response => response.json())
	//   .then(data => {
	//     const transformedSales = [];

	//     for(const key in data){
	//       transformedSales.push({
	//         id: key,
	//         username: data[key].username,
	//         volume: data[key].volume
	//       });
	//     }

	//     setSales(transformedSales);
	//     setIsLoading(false);

	//   });
	// },[])

	if (error) {
		return <p>Failed to load</p>;
	}

	if (!data && !sales) {
		return <p>Loading...</p>;
	}

	return (
		<ul>
			{sales.map((sale) => (
				<li key={sale.id}>
					{sale.username} - {sale.volume}$
				</li>
			))}
		</ul>
	);
}

export default LastSalesPage;

export async function getStaticProps() {
	const response = await fetch("https://nextjs-course-1b7c4-default-rtdb.europe-west1.firebasedatabase.app/sales.json");
	const data = await response.json();

	const transformedSales = [];

	for (const key in data) {
		transformedSales.push({
			id: key,
			username: data[key].username,
			volume: data[key].volume,
		});
	}

	return {
		props: { sales: transformedSales },
	};
}