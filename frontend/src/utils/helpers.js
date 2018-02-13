// Convert timestamp to date and time
export function toDate (timestamp) {
  const ts = new Date(timestamp);
  return ts.toLocaleString()
}