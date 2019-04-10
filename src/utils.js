// eslint-disable-next-line import/prefer-default-export
export function getFormattedDistance(meters) {
  return `${Math.round(meters * 0.000621371192 * 100) / 100} mi`
}
