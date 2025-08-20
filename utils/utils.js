// utils/utils.js
function getFormattedDateTime() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const MM = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  return `${yyyy}${MM}${dd}_${hh}${mm}`; // e.g. 20240703_1545
}
function determineActualResult(responseStream) {
  try {
    const body = JSON.parse(responseStream);

    if (body.school_gradebooks && Array.isArray(body.school_gradebooks)) {
      return 'PASSED';
    }

    const msg =
      body.message?.toLowerCase() ||
      body.response?.message?.toLowerCase() ||
      '';

    if (
      msg.includes('no data found') ||
      msg.includes('not found') ||
      msg.includes('request failed') ||
      msg.includes('invalid') ||
      msg.includes('error')
    ) {
      return 'FAILED';
    }

    return 'PASSED'; // no known errors
  } catch {
    const raw = responseStream.toLowerCase();
    return raw.includes('request failed') ? 'FAILED' : 'PASSED';
  }
}

module.exports = {
  getFormattedDateTime,
  determineActualResult
};
