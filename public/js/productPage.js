function addToCart() {
	const productPrice = document.getElementById('productPrice').innerText; 
	
	const newProduct = {
		name: document.getElementById('productName').innerText,
		defaultPrice: Number(productPrice.substr(0, productPrice.length -2)),
		extraAccumulator: document.getElementById('extraAccumulator').checked,
		extaraBlades: document.getElementById('extaraBlades').checked
	}
	newProduct.finalPrice = newProduct.defaultPrice;

	if (newProduct.extraAccumulator) {
		newProduct.finalPrice += 1000
	}

	if (newProduct.extaraBlades) {
		newProduct.finalPrice += 500
	}

	console.log(newProduct);
}