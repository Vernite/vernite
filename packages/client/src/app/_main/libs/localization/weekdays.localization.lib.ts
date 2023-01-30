import * as dayjs from 'dayjs';

export function weekdays() {
  const localeData = dayjs.localeData();

  const firstDayOfWeek = localeData.firstDayOfWeek();
  const weekdays = localeData.weekdays();

  for (let i = 0; i < firstDayOfWeek; i++) {
    weekdays.push(weekdays.shift()!);
  }

  return weekdays;
}

export function weekdaysShort() {
  const localeData = dayjs.localeData();

  const firstDayOfWeek = localeData.firstDayOfWeek();
  const weekdaysShort = [...localeData.weekdaysShort()];

  for (let i = 0; i < firstDayOfWeek; i++) {
    weekdaysShort.push(weekdaysShort.shift()!);
  }

  console.log(weekdaysShort);
  return weekdaysShort;
}
