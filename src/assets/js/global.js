export function get_perc(has, max) {
	let perc = Math.ceil((has / max) * 100);
	return `${perc}%`;
}
export function number_format(num) {
	return num.toLocaleString("en-US");
}
export function money_format(num) {
	return '$' + number_format(num);
}