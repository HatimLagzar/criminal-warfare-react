export function getPercentage(has, max) {
  let perc = Math.ceil((has / max) * 100);

  return `${perc}%`;
}
