const offerings = "https://acme-users-api-rev.herokuapp.com/api/offerings";
const companies = "https://acme-users-api-rev.herokuapp.com/api/companies";
const products = "https://acme-users-api-rev.herokuapp.com/api/products";
const rootId = document.getElementById("rootId");

const loadsData = () => {
	Promise.all([fetch(offerings), fetch(companies), fetch(products)]).then(
		(response) => {
			Promise.all(response.map((data) => data.json())).then((result) => {
				const offerings = result[0];
				const companies = result[1];
				const products = result[2];
				const output = renderOfferings(products, offerings);

				renderProducts(products, output);
				// console.log(products);
				// console.log(offerings);
				// console.log(companies);

				// getId();
			});
		}
	);
};

const renderOfferings = (productName, offerings) => {
	// console.log(productName.);
	// const productMatches = [];
	let productMatches = [];
	productName.forEach((product) => {
		productMatches = offerings.filter((id) => {
			if (id.productId === product.id) {
				return true;
			}
		});
	});
	return productMatches;
	// console.log(offerings);
};

const renderOfferingsHTML = (data, output) => {
	output.forEach((company) => {
		console.log(company.price);
	});
	let html = output
		.map((output) => {
			return `<li>
            
            </li>`;
		})
		.join("");
	return html;
};

const renderProducts = (data, output) => {
	console.log(output);
	let html = data
		.map((product) => {
			return `<li>
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p>$${product.suggestedPrice}.00</p>
                <ul>
                    ${renderOfferingsHTML(data, output)}
                </ul>
            </li>`;
		})
		.join("");
	rootId.innerHTML = html;
};
loadsData();
