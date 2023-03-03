import fs from "fs/promises";
import path from "path";
import { Fragment } from "react";

function ProductDetailPage(props) {
	const { loadedProduct } = props;

	return (
		<Fragment>
			<h1>{loadedProduct.title}</h1>
			<p>{loadedProduct.description}</p>
		</Fragment>
	);
}

async function getData() {
  const pathFile = path.join(process.cwd(), "data", "dummy-backend.json");
	const jsonData = await fs.readFile(pathFile);
	const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps(context) {
	const { params } = context;

	const productId = params.productId;

	const data = await getData();

	const product = data.products.find((product) => product.id === productId);

  if(!product)
  {
    return {
      notFound: true
    }
  }

	return {
		props: {
			loadedProduct: product,
		},
	};
}


export async function getStaticPaths() {

  const data = await getData();

  const ids = data.products.map(p => p.id);
  
  const pathsWithParams = ids.map(id => ({ params: { productId: id }}));

  return {
    paths: pathsWithParams,
    fallback: true
  };
}

export default ProductDetailPage;
