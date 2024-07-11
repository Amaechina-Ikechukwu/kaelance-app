export function formatDateTime(isoDateTimeString: string) {
  const dateTime = new Date(isoDateTimeString);

  // Format the date-time as desired (e.g., YYYY-MM-DD HH:mm:ss)
  const formattedDateTime = `${dateTime.getFullYear()}-${padZero(
    dateTime.getMonth() + 1
  )}-${padZero(dateTime.getDate())} ${padZero(dateTime.getHours())}:${padZero(
    dateTime.getMinutes()
  )}:${padZero(dateTime.getSeconds())}`;

  return formattedDateTime;
}

function padZero(num: number) {
  return num.toString().padStart(2, "0");
}
