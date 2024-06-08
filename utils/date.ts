export const userLocalOffset = (new Date()).getTimezoneOffset() * 60 * 1000;

export function getDateWithoutTime(receivedDate: Date): Date {
  const dateStringWithoutTime = new Date(
    formatDateToInputDate(receivedDate) + "T00:00:00Z",
  );

  return new Date(dateStringWithoutTime);
}

export function getPastDate({ days }: { days: number }) {
  return new Date((new Date()).setDate((new Date()).getDate() - days));
}

export function setDateEndDayTime(receivedDate: Date) {
  return new Date(formatDateToInputDate(receivedDate) + "T23:59:59Z");
}

export function filterByDateBetween(
  { dateToFilter, endDate, startDate }: {
    dateToFilter: Date;
    startDate: Date;
    endDate: Date;
  },
) {
  const parsedStartDate = getDateWithoutTime(startDate);
  const parsedEndDate = setDateEndDayTime(endDate);

  return dateToFilter.getTime() >= parsedStartDate.getTime() &&
    dateToFilter.getTime() <= parsedEndDate.getTime();
}

export function formatDateToInputDate(receivedDate: Date) {
  return [
    receivedDate.getUTCFullYear(),
    String(receivedDate.getUTCMonth() + 1).padStart(2, "0"),
    String(receivedDate.getUTCDate()).padStart(2, "0"),
  ].join("-");
}
