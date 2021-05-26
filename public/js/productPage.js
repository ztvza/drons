function addToCart() {
	const productPrice = document.getElementById('productPrice').innerText;

	const newProduct = {
		name: document.getElementById('productName').innerText,
		defaultPrice: Number(productPrice.substr(0, productPrice.length - 2)),
		extraAccumulator: document.getElementById('extraAccumulator').checked,
		extraBlades: document.getElementById('extraBlades').checked
	}

	newProduct.finalPrice = newProduct.defaultPrice;

	if (newProduct.extraAccumulator) {
		newProduct.finalPrice += 500;
	}

	if (newProduct.extraBlades) {
		newProduct.finalPrice += 150;
	}

	console.log(newProduct);
}