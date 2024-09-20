import holiday_jp from '@holiday-jp/holiday_jp';

export const isHoliday = (date: Date): boolean => {
  if (holiday_jp.isHoliday(date)) return true;

  const month = date.getMonth() + 1;
  const day = date.getDate();

  return (
    (month === 12 && day >= 23) ||
    (month === 1 && day <= 8) || // 冬休み判定
    (month === 3 && day >= 15) ||
    (month === 4 && day <= 5) || // 春休み判定
    (month === 7 && day >= 20) ||
    (month === 8 && day <= 20) // 夏休み判定
  );
};
