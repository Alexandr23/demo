import { MONTHS } from '../constants/date';

export const formatDate = (date: Date) => {
  return `${date.getDate()} ${MONTHS[date.getMonth()]}`;
}

export const formatTime = (date: Date) => {
  return `${duo(date.getHours())}:${duo(date.getMinutes())}:${duo(date.getSeconds())}`;
}

export const duo = (num: number) => num < 10 ? '0' + num : num;