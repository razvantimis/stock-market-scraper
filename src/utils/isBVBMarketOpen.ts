function isBVBMarketOpen(): boolean {
  const currentDate = new Date();
  const dayOfWeek = currentDate.getUTCDay();
  const hour = currentDate.getUTCHours();

  // BVB is open Monday to Friday
  if (dayOfWeek >= 1 && dayOfWeek <= 5) {
    // BVB opens at 9:00 AM UTC and closes at 5:30 PM UTC
    if (hour >= 9 && hour < 17) {
      return true;
    }
  }

  return false;
}

export { isBVBMarketOpen }
