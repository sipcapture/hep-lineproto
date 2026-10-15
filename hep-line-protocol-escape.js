/**
 * InfluxDB line protocol escaping helpers.
 * @see https://docs.influxdata.com/influxdb/v2/reference/syntax/line-protocol/
 */

export function escapeLineProtocolKeyOrTagValue(token) {
  return String(token)
    .replace(/\\/g, '\\\\')
    .replace(/[ ,=]/g, '\\$&');
}

export function escapeLineProtocolFieldValue(value) {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\r\n/g, '\\r\\n')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r');
}
