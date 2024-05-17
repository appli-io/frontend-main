import { DateTime } from 'luxon';

export const relativeTime = (date: number) => DateTime.fromMillis(date).toRelative();
