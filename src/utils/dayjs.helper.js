import dayjs from 'dayjs';

// plugins
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isBetween from 'dayjs/plugin/isBetween';
import isToday from 'dayjs/plugin/isToday';

export const dayjsSetup = () => {
  // extend from other plugins
  dayjs.extend(isSameOrBefore);
  dayjs.extend(isSameOrAfter);
  dayjs.extend(isBetween);
  dayjs.extend(isToday);
};
