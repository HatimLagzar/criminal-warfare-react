export function formatNumber(num) {
  return num.toLocaleString('en-US');
}

export function formatMoney(num) {
  return '$' + formatNumber(num);
}
