function isNYSEMarketOpen(): boolean {
  const currentDate = new Date();
  const utcHours = currentDate.getUTCHours();
  const utcDay = currentDate.getUTCDay();

  // NYSE is open from Monday to Friday
  if (utcDay >= 1 && utcDay <= 5) {
    // NYSE is open from 9:30 AM to 4 PM (16:00) Eastern Time (UTC - 5)
    if (utcHours >= 14 && utcHours < 21) {
      return true;
    }
  }
  return true;
}
export { isNYSEMarketOpen };
