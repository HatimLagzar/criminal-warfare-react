import {time as unixTime} from "./dates";

export function formatNumber(num) {
  return num.toLocaleString('en-US');
}

export function formatMoney(num) {
  return '$' + formatNumber(num);
}

export function formatTimeToETA(time) {
  let result = '';

  time = time - unixTime();
  let days = Math.floor(time / (24 * 3600));
  time = time - (days * (24 * 3600));

  let hours = Math.floor(time / (3600));
  time = time - (hours * (3600));

  let minutes = Math.floor(time / (60));
  time = time - (minutes * 60);

  let seconds = time;

  if (days !== 0) {
    result += days + ' day' + (days !== 1 ? 's' : '') + ', ';
  }

  if (hours !== 0) {
    result += hours + ' hour' + (hours !== 1 ? 's' : '') + ', ';
  }

  if (minutes !== 0) {
    result += minutes + ' minute' + (minutes !== 1 ? 's' : '') + ', ';
  }

  if (seconds !== 0) {
    result += seconds + ' second' + (seconds !== 1 ? 's' : '') + ', ';
  }

  result = result.slice(0, -2);
  if (result === "") {
    return 'NOW!';
  }

  return result;
}