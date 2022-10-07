export const multiply: any = (a: any, b: any) => {
	const product = Array(a.length + b.length).fill(0);
	for (let i = a.length; i--; null) {
		let carry = 0;
		for (let j = b.length; j--; null) {
			product[1 + i + j] += carry + a[i] * b[j];
			carry = Math.floor(product[1 + i + j] / 10);
			product[1 + i + j] = product[1 + i + j] % 10;
		}
		product[i] += carry;
	}
	return product.join('').replace(/^0*(\d)/, '$1');
};
