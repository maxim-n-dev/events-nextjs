import fs from "fs/promises";
import Link from "next/link";
import path from "path";

function HomePage(props) {
	const { products } = props;
	return (
		<ul>
			{products.map((product) => (
				<li key={product.id}>
					<Link href={`/products/${product.id}`}>{product.title}</Link>
				</li>
			))}
		</ul>
	);
}
// executes when project is build (SSG Static Site Generation)
// executes and regenerates on every request at most every X seconds (ISG- Icremental Site Generation)
// For ISG you have to add a revalidate param. (in seconds)
export async function getStaticProps(context) {
	const pathFile = path.join(process.cwd(), "data", "dummy-backend.json");
	const jsonData = await fs.readFile(pathFile);
	const data = JSON.parse(jsonData);

	if (!data) {
		return {
			redirect: {
				desination: "/no-data",
			},
		};
	}

	if (data.products.length === 0) {
		return { notFound: true };
	}

	return {
		props: {
			products: data.products,
		},
		revalidate: 60,
	};
}

export default HomePage;
